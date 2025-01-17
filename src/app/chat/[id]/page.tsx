"use client";
import { CheckChat } from "@/actions/checkChat";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Workspace() {
  const params = useParams();

  useEffect(() => {
    const Handle = async () => {
      const chatid = params.id;
      console.log(chatid);
      const data = await CheckChat(chatid as string);
      console.log(data);
    };
    Handle();
  }, []);
  return <div className="flex h-screen justify-center items-center"></div>;
}
