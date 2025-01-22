"use client";
import { GetAiCode, GetAiMessage } from "@/actions/GetAi";
import ChatView from "@/components/ChatView";
import EditorView from "@/components/EditorView";
import { FileStructure, Message } from "@/lib/Types";
import { useParams } from "next/navigation";
import React from "react";
import { Chat_Prompt, Code_Gen_Prompt, Default_File } from "@/lib/Constant";
import { UserMessageContext } from "@/lib/Context";
import { GetChat, UpdateChat } from "@/actions/GetChat";
import { Loader } from "lucide-react";
import { GetTokens } from "@/actions/GetUser";
import toast from "react-hot-toast";

export default function Workspace() {
  const { UserMessage } = React.useContext(UserMessageContext);
  const [text, setText] = React.useState<string>("");
  const params = useParams();
  const chatid = params.id as string;
  const [Message, setMessage] = React.useState<Message[]>([]);
  const [files, setFiles] = React.useState<FileStructure>({
    ...Default_File,
  });
  const [codeLoading, setCodeLoading] = React.useState<boolean>(false);
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);
  const [animation, setAnimation] = React.useState<boolean>(false);
  const notify = () => toast("You have no tokens left");
  console.log(UserMessage);
  const CheckChat = async () => {
    const data = await GetChat({ chatid, UserMessage });
    if (data.status === 200) {
      setFiles({ ...Default_File, ...(data.files as FileStructure) });
      setMessage(data.messages as Message[]);
    }

    setPageLoading(false);
  };

  React.useEffect(() => {
    CheckChat();
  }, []);

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
      const data1 = await GetAiMessage(userChat + Chat_Prompt);
      const aiMessage = {
        role: "assistant",
        content: data1.content,
      };
      const newMessage = [...Message, aiMessage];
      if (data1.status === 200) {
        setMessage((prev) => [...prev, aiMessage]);

        const data2 = await GetAiCode(userChat + Code_Gen_Prompt);
        if (data2.status === 200) {
          const files = data2.content.files as FileStructure;
          const merge = {
            ...Default_File,
            ...files,
          };
          setFiles(merge);
          setCodeLoading(false);
          HandleUpdateChat(chatid, newMessage as [], files);
        }
      }
      setCodeLoading(false);
    }
  };

  React.useEffect(() => {
    if (Message.length > 0 && Message[Message.length - 1].role === "user") {
      HandleMessage();
      setAnimation(true);
    }
  }, [Message]);

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
          <EditorView files={files} codeLoading={codeLoading} />
        </>
      )}
    </div>
  );
}
