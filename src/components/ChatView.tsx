import { useRef, useEffect } from "react";
import { Forward, Link2, WandSparkles } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/Types";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import TypingAnimation from "@/components/ui/typing-animation";

export default function ChatView({
  codeLoading,
  animation,
  Message,
  HandleUpdate,
  text,
  setText,
}: {
  codeLoading: boolean;
  animation: boolean;
  Message: Message[];
  HandleUpdate: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const user = useSession().data?.user;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [Message]);

  return (
    <div className="flex h-[calc(100vh-100px)] w-[450px] flex-grow flex-col items-center overflow-hidden rounded-xl">
      <div
        ref={chatContainerRef}
        className="mb-[200px] flex w-full flex-col items-center overflow-y-scroll scrollbar-hide"
      >
        {Message.map((item, index) => {
          const isLastMessage = index === Message.length - 1;
          return (
            <div
              className={cn(
                item.role === "user" ? "font-bold" : "text-base",
                "my-2 flex w-[400px] flex-shrink rounded-xl border",
              )}
              key={index}
            >
              {item.role === "user" ? (
                <>
                  <Avatar className="m-2 border border-[#3a3a3a]">
                    <AvatarImage
                      src={user?.image || "/default-avatar.png"}
                      alt={"Avatar"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <ReactMarkdown className="p-3 text-[1.1]">
                    {item.content}
                  </ReactMarkdown>
                </>
              ) : item.role === "assistant" && animation && isLastMessage ? (
                <TypingAnimation className="p-3 text-base" duration={10}>
                  {item.content}
                </TypingAnimation>
              ) : (
                <ReactMarkdown className="p-3 text-base">
                  {item.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-1 left-0 z-10 mb-2 ml-[10px] flex h-[200px] w-[450px] flex-col rounded-xl border border-[#3a3a3a] bg-transparent backdrop-blur-3xl">
        <Textarea
          disabled={codeLoading}
          value={text}
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
              onClick={() => HandleUpdate()}
              className={cn(text.length === 0 && "hidden", "text-white")}
            >
              <Forward className="h-7 w-7 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
