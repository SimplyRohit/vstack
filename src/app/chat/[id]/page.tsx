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
import { GetTokens } from "@/actions/GetUser";
import toast from "react-hot-toast";
import { GetAiMessage, GetAiCode } from "@/actions/GetAi";

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

  const HandleUpdateChat = async (
    chatid: string,
    newMessage: Message[],
    files: FileStructure,
  ) => {
    await UpdateChat(chatid, newMessage as [], files as FileStructure);
  };
  const HandleMessage = React.useCallback(async () => {
    setCodeLoading(true);
    const status = await GetTokens();
    if (status.status === 200) {
      if (status.tokens! <= 0 || status.tokens === undefined) {
        notify();
        setCodeLoading(false);
        return;
      }
      const userChat = Message[Message.length - 1].content;
      const data1 = await GetAiMessage(userChat + React_Chat_Prompt);
      const aiMessage = {
        role: "assistant",
        content: data1.content,
      };
      const newMessage = [...Message, aiMessage];
      if (data1.status === 200) {
        setMessage((prev) => [...prev, aiMessage]);
        const message = userChat + "" + React_Code_Prompt;

        try {
          const data2 = await GetAiCode(message);
          if (data2.status === 200) {
            const newdata = data2.content;
            const parsedfile = JSON.parse(newdata);
            const files = parsedfile.files as FileStructure;
            const merge = {
              ...React_Default_File,
              ...files,
            };
            setFiles(merge);
            setCodeLoading(false);
            HandleUpdateChat(chatid, newMessage as [], files);
          } else {
            setCodeLoading(false);
          }
        } catch (error) {
          console.log(error);
          return setCodeLoading(false);
        }
      }
      setCodeLoading(false);
    }
  }, [Message, chatid]);

  React.useEffect(() => {
    if (Message.length > 0 && Message[Message.length - 1].role === "user") {
      HandleMessage();
      setAnimation(true);
    }
  }, [Message, HandleMessage]);

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
