"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { UserMessageContext } from "@/lib/Context";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Link2, WandSparkles, Forward, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suggestions } from "@/lib/Constant";
import { Cover } from "@/components/ui/cover";
import Stacks from "@/components/stacks";

export default function Home() {
  const { SetUserMessage } = React.useContext(UserMessageContext);
  const router = useRouter();
  const session = useSession();
  const [text, setText] = React.useState<string>("");
  const user = session.data?.user;
  const handleSubmit = async () => {
    if (!user) {
      signIn();
      return;
    }
    const chatid = Math.random().toString(36).slice(2);

    SetUserMessage(text);
    router.push(`/chat/${chatid}`);
  };

  const handleGenerate = async (suggestion: string) => {
    if (!user) {
      signIn();
      return;
    }
    const chatid = Math.random().toString(36).slice(2);
    SetUserMessage(suggestion);
    router.push(`/chat/${chatid}`);
  };

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center">
      <h1 className="align-middle text-3xl">
        Generate your <Cover className="cursor-none">Own Website</Cover>
      </h1>
      <p className="my-1 mb-4 font-bold opacity-50">
        Genrate , preview , edit code and deploy .
      </p>
      <div className="flex h-[200px] w-[450px] flex-col rounded-xl border border-[#3a3a3a] bg-transparent shadow-xl backdrop-blur-3xl">
        <Textarea
          inputMode="text"
          onChange={(e) => setText(e.target.value)}
          draggable="true"
          placeholder="See the magic ........"
          className="h-full w-full resize-none border-none font-bold focus-visible:ring-0"
        />
        <div className="flex h-[50px] w-full flex-grow items-center justify-between">
          <div className="flex items-center">
            <Link2 className="ml-3 -rotate-45 cursor-pointer opacity-80"></Link2>
            <WandSparkles
              className={cn(
                text.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-80",
                "ml-2 mr-3 w-5",
              )}
            ></WandSparkles>
          </div>
          <div className="flex flex-grow"></div>
          <div className="mr-3 flex items-center justify-center">
            <div
              onClick={() => handleSubmit()}
              className={cn(text.length === 0 && "hidden", "text-white")}
            >
              <Forward className="h-7 w-7 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-[600px] flex-wrap items-center justify-center gap-2">
        {Suggestions.map((suggestion, index) => (
          <p
            onClick={() => handleGenerate(suggestion)}
            key={index}
            className="group flex cursor-pointer gap-3 truncate rounded-xl border border-[#3a3a3a] p-1 px-2 text-[12px]"
          >
            {suggestion}
          </p>
        ))}
      </div>
      <Stacks />
    </div>
  );
}
