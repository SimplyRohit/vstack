"use client";
import { GetAiCode, GetAiMessage } from "@/actions/GetAi";
import ChatView from "@/components/ChatView";
import EditorView from "@/components/EditorView";
import { Message } from "@/lib/Types";
import { useParams } from "next/navigation";
import React from "react";
import { Chat_Prompt, Code_Gen_Prompt, Default_File } from "@/lib/Constant";
import { UserMessageContext } from "@/lib/Context";
import { GetChat, UpdateChat } from "@/actions/GetChat";
import { Loader } from "lucide-react";

export default function Workspace() {
  const { UserMessage, SetUserMessage } = React.useContext(UserMessageContext);
  const [text, setText] = React.useState<string>("");
  const params = useParams();
  const chatid = params.id as string;
  const [Message, setMessage] = React.useState<Message[]>([]);
  const [files, setFiles] = React.useState<any>({ ...Default_File });
  const [codeLoading, setCodeLoading] = React.useState<boolean>(false);
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);
  const [animation, setAnimation] = React.useState<boolean>(false);
  React.useEffect(() => {
    const CheckChat = async () => {
      const data = await GetChat({ chatid, UserMessage });
      if (data.status === 200 || data.status === 201) {
        setFiles({ ...Default_File, ...(data.files as {}) });
        setMessage(data.messages as Message[]);
      }
      SetUserMessage("");
      setPageLoading(false);
    };
    CheckChat();
  }, []);

  const HandleUpdateChat = async (
    chatid: string,
    Message: Message[],
    files: any,
  ) => {
    await UpdateChat(chatid, Message as [], files);
  };
  const HandleMessage = async () => {
    setCodeLoading(true);

    const userChat = Message[Message.length - 1].content;
    const data1 = await GetAiMessage(userChat + Chat_Prompt);
    if (data1.status === 200) {
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: data1.content },
      ]);

      const data2 = await GetAiCode(userChat + Code_Gen_Prompt);
      if (data2.status === 200) {
        const files = data2.content.files;
        const merge = {
          ...Default_File,
          ...files,
        };
        setFiles(merge);

        HandleUpdateChat(chatid, Message as [], files);
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
    console.log("updated");
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
