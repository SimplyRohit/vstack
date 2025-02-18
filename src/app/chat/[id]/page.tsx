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
import { codeSession } from "@/service/Ai";
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

  //one time run
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

  //update chat files and messages
  const HandleUpdateChat = async (
    chatid: string,
    newMessage: Message[],
    files: FileStructure,
  ) => {
    await UpdateChat(chatid, newMessage as [], files as FileStructure);
  };
  const HandleMessage = async () => {
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

        //doing this bcz of vercel function time out error
        try {
          const data2 = await codeSession.sendMessage(message);
          const newdata = data2.response.text();
          const parsedfile = JSON.parse(newdata);
          const files = parsedfile.files as FileStructure;
          const merge = {
            ...React_Default_File,
            ...files,
          };
          setFiles(merge);
          setCodeLoading(false);
          HandleUpdateChat(chatid, newMessage as [], files);
        } catch (error) {
          console.log(error);
          return setCodeLoading(false);
        }
      }
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
