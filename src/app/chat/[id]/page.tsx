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
import { GetChat } from "@/actions/GetChat";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { ProcessChat } from "@/actions/GetAi";

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
  const notify = (msg: string) => toast(msg);

  const CheckChat = async () => {
    const data = await GetChat({ chatid, UserMessage, template });
    if (data.status === 200) {
      setTemplate(data.template!);
      setFiles({ ...React_Default_File, ...(data.files as FileStructure) });
      setMessage(data.messages as Message[]);
    }

    setPageLoading(false);
  };

  React.useEffect(() => {
    CheckChat();
  }, []);

  const HandleMessage = async () => {
    setCodeLoading(true);
    try {
      const response = await ProcessChat({
        chatid,
        messages: Message,
      });

      if (response.status === 200) {
        setMessage(response.messages!);
        setFiles({ ...React_Default_File, ...response.files });
      } else {
        notify(response.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error in HandleMessage:", error);
      notify("Failed to process chat");
    } finally {
      setCodeLoading(false);
    }
  };

  //if last message roel is user then call handle message
  React.useEffect(() => {
    if (Message.length > 0 && Message[Message.length - 1].role === "user") {
      HandleMessage();
      setAnimation(true);
    }
  }, [Message]);

  // will update message state
  const HandleUpdate = async () => {
    setMessage((prev) => [...prev, { role: "user", content: text }]);
    setText("");
  };

  return (
    <div className="flex h-full w-full flex-grow flex-row items-center justify-center gap-3 p-2">
      {pageLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
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
          />
        </>
      )}
    </div>
  );
}
