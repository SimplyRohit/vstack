"use client";
import ChatView from "@/components/ChatView";
import EditorView from "@/components/EditorView";
import { FileStructure, Message } from "@/lib/Types";
import { useParams } from "next/navigation";
import React from "react";
import {
  React_Chat_Prompt,
  React_Code_Prompt,
  React_Default_File,
} from "@/lib/Constant";
import { TemplateContext, UserMessageContext } from "@/lib/Context";
import { GetChat, UpdateChat } from "@/actions/GetChat";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { GetAiMessage } from "@/actions/GetAi";

export default function Workspace() {
  const { UserMessage } = React.useContext(UserMessageContext);
  const [text, setText] = React.useState<string>("");
  const params = useParams();
  const chatid = params.id as string;
  const [Message, setMessage] = React.useState<Message[]>([]);
  const [files, setFiles] = React.useState<FileStructure>({
    ...React_Default_File,
  });
  const { template, setTemplate } = React.useContext(TemplateContext);
  const [codeLoading, setCodeLoading] = React.useState<boolean>(false);
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);
  const [animation, setAnimation] = React.useState<boolean>(false);
  const notify = () => toast("You have no tokens left");

  const CheckChat = React.useCallback(async () => {
    const data = await GetChat({ chatid, UserMessage, template });
    if (data.status === 200) {
      setTemplate(data.template!);
      setFiles({ ...React_Default_File, ...(data.files as FileStructure) });
      setMessage(data.messages as Message[]);
    }

    setPageLoading(false);
  }, [chatid, UserMessage, template, setTemplate]);

  React.useEffect(() => {
    CheckChat();
  }, [CheckChat]);


  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  const HandleMessage = React.useCallback(async () => {
    if (Message.length === 0 || isGenerating) return;

    setIsGenerating(true);
    setCodeLoading(true);
    const lastUserMessage = Message[Message.length - 1].content;

    try {
      const fastReply = await GetAiMessage(lastUserMessage + "\n\n" + React_Chat_Prompt);
      const aiMessage = {
        role: "assistant",
        content: fastReply.status === 200 ? fastReply.content : "Understood! Generating code...",
      };

      const updatedMessages = [...Message, aiMessage];
      setMessage(updatedMessages);

      const codeContext = `\n\nCURRENT CODEBASE FILES:\n${JSON.stringify(files)}\n\nIMPORTANT: Use the above codebase as your starting point. Apply the user's requested changes, keep the rest of the code intact, and DO NOT wipe out existing features!`;
      const prompt = lastUserMessage + codeContext + "\n\n" + React_Code_Prompt;

      const response = await fetch("/api/chat/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: prompt,
          chatid,
          previousMessages: updatedMessages
        }),
      });

      if (!response.ok) {
        if (response.status === 402) {
          notify();
        } else {
          toast.error("Failed to start AI generation. Status: " + response.status);
        }
        setCodeLoading(false);
        setIsGenerating(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (!reader) throw new Error("No reader available");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
      }

      // Parse JSON explicitly once the stream ends
      try {
        let jsonStr = fullText;
        if (fullText.includes("```json")) {
          jsonStr = fullText.split("```json")[1].split("```")[0];
        }

        const result = JSON.parse(jsonStr);
        const generatedFiles = result.files || {};

        const merge = {
          ...React_Default_File,
          ...generatedFiles,
        };
        setFiles(merge);

        await UpdateChat(chatid, updatedMessages as [], generatedFiles);
      } catch (jsonErr) {
        console.error("AI SDK Parse Error:", jsonErr);
        toast.error("AI failed to output valid code format.");
      }
    } catch (error) {
      console.error("Vercel AI SDK Error:", error);
      toast.error("Network error during stream.");
    } finally {
      setCodeLoading(false);
      setIsGenerating(false);
    }
  }, [Message, chatid, notify, isGenerating]);

  React.useEffect(() => {
    if (Message.length > 0 && Message[Message.length - 1].role === "user" && !isGenerating) {
      HandleMessage();
      setAnimation(true);
    }
  }, [Message, HandleMessage, isGenerating]);

  const HandleUpdate = async () => {
    setMessage((prev) => [...prev, { role: "user", content: text }]);
    setText("");
  };

  return (
    <div className="relative flex h-full w-full flex-grow flex-row items-center justify-center gap-2 overflow-hidden px-1">
      {pageLoading ? (
        <div className="flex h-full w-full items-center justify-center relative z-10">
          <Loader className="animate-spin h-8 w-8 text-blue-500 opacity-50" />
        </div>
      ) : (
        <div className="relative z-10 flex h-full w-full gap-2 p-2">
          <ChatView
            codeLoading={codeLoading}
            Message={Message}
            HandleUpdate={HandleUpdate}
            text={text}
            setText={setText}
            animation={animation}
          />
          <EditorView
            files={files}
            codeLoading={codeLoading}
            template={template}
            Message={Message}
          />
        </div>
      )}
    </div>
  );
}
