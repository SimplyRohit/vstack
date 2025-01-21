"use client";
import { GetAiCode, GetAiMessage } from "@/actions/GetAi";
import ChatView from "@/components/ChatView";
import EditorView from "@/components/EditorView";
import { Message } from "@/lib/Types";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Chat_Prompt, Code_Gen_Prompt, Default_File } from "@/lib/Constant";
import { IsLoginContext, UserMessageContext } from "@/lib/Context";
import MainNavBar from "@/components/MainNavBar";
import { GetChat, UpdateChat } from "@/actions/GetChat";

export default function Workspace() {
  const { UserMessage, SetUserMessage } = React.useContext(UserMessageContext);
  const [UserSession, SetUserSession] = React.useState<any>();
  const session = useSession();
  const [text, setText] = React.useState<string>("");
  const params = useParams();
  const chatid = params.id as string;
  const [Message, setMessage] = React.useState<Message[]>([]);
  const [files, setFiles] = React.useState<any>({ ...Default_File });
  const user = session.data?.user;
  useEffect(() => {
    const CheckChat = async () => {
      await SetUserSession(user);
      const data = await GetChat({ chatid, UserMessage });
      setFiles({ ...Default_File, ...(data.files as {}) });
      if (data.status === 200 || data.status === 201) {
        setMessage(data.messages as Message[]);
      }
      SetUserMessage("");
    };
    CheckChat();
  }, []);

  const HandleCode = async () => {
    const data2 = await GetAiCode(
      Message[Message.length - 1].content + Code_Gen_Prompt
    );
    const merge = {
      ...Default_File,
      ...data2.content.files,
    };
    setFiles(merge);
    await UpdateChat(chatid, Message as [], data2.content.files);
  };
  const HandleMessage = async () => {
    const data1 = await GetAiMessage(
      Message[Message.length - 1].content + Chat_Prompt
    );
    HandleCode();
    setTimeout(() => {
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: data1.content },
      ]);
    }, 1000);
  };

  useEffect(() => {
    if (Message.length > 0) {
      if (Message[Message.length - 1].role === "user") {
        HandleMessage();
      }
    }
  }, [Message]);

  const HandleUpdate = async () => {
    setMessage((prev) => [...prev, { role: "user", content: text }]);
    setText("");
  };

  return (
    <div className="flex w-full  h-full p-2 gap-3 flex-grow justify-center items-center flex-row">
      <ChatView
        Message={Message}
        HandleUpdate={HandleUpdate}
        text={text}
        setText={setText}
      />
      <EditorView files={files} />
    </div>
  );
}
