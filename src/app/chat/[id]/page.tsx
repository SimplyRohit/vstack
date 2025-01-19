"use client";
import { GetAiMessage } from "@/actions/GetAi";
import ChatView from "@/components/ChatView";
import EditorView from "@/components/EditorView";
import { Message } from "@/lib/Types";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/MainNavBar";
import { Chat_Prompt } from "@/lib/Constant";

const Chat = {
  chatid: "1234",
  messages: [
    {
      role: "user",
      content: "make a todo app",
    },
  ],
};

export default function Workspace() {
  const [UserSession, SetUserSession] = React.useState<any>();
  const session = useSession();
  React.useEffect(() => {
    const Handle = async () => {
      await SetUserSession(session.data?.user);
    };
    Handle();
  });
  const [text, setText] = React.useState<string>("");
  const params = useParams();

  const [Message, setMessage] = React.useState<Message[]>([]);
  useEffect(() => {
    // const HandleMessage = async () => {
    //   await setMessage(Chat.messages);
    //   if (Chat.messages.length === 1) {
    //     const data = await GetAiMessage(Chat.messages[0].content + Chat_Prompt);
    //     setMessage((prev) => [
    //       ...prev,
    //       { role: "assistant", content: data.content as string },
    //     ]);
    //   }
    // };
    // HandleMessage();
  }, []);

  const HandleUpdate = async () => {
    // setMessage((prev) => [...prev, { role: "user", content: text }]);
    // const data = await GetAiMessage(text);
    // setMessage((prev) => [
    //   ...prev,
    //   { role: "assistant", content: data.content as string },
    // ]);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col">
      <Navbar UserSession={UserSession} />
      <div className="flex w-full h-full justify-center items-center flex-row">
        <ChatView
          Message={Message}
          HandleUpdate={HandleUpdate}
          text={text}
          setText={setText}
        />
        {/* codeView */}
        <EditorView Message={Message} />
      </div>
    </div>
  );
}
