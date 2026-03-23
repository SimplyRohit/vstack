import { useRef, useEffect } from "react";
import { Forward } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/Types";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/lib/auth-client";
import TypingAnimation from "@/components/ui/typing-animation";
import { motion, AnimatePresence } from "framer-motion";

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
  const user = authClient.useSession().data?.user;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });

    observer.observe(container, { childList: true, subtree: true, characterData: true });
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    return () => observer.disconnect();
  }, [Message.length]);

  return (
    <div className="relative flex h-full w-[450px] flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 shadow-2xl backdrop-blur-3xl">
      <div className="flex h-16 items-center justify-between border-b border-white/5 bg-white/5 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight">Vstack Assistant</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Connected & Ready</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 opacity-50">
          <div className="h-1 w-1 rounded-full bg-slate-500" />
          <div className="h-1 w-1 rounded-full bg-slate-600" />
          <div className="h-1 w-1 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide space-y-6"
        style={{ paddingBottom: "220px" }}
      >
        <AnimatePresence>
          {Message.map((item, index) => {
            const isLastMessage = index === Message.length - 1;
            const isUser = item.role === "user";

            return (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={index}
                className={cn(
                  "flex w-full gap-4",
                  isUser ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="h-8 w-8 shrink-0 border border-white/10 shadow-sm">
                  <AvatarImage
                    src={isUser ? (user?.image || "/default-avatar.png") : "/ai-avatar.png"}
                  />
                  <AvatarFallback className="bg-slate-800 text-[10px] font-bold text-white">
                    {isUser ? user?.name?.slice(0, 2).toUpperCase() : "AI"}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    "flex max-w-[85%] flex-col gap-2 rounded-2xl p-4 shadow-sm overflow-hidden",
                    isUser
                      ? "rounded-tr-none bg-blue-600/10 border border-blue-500/20"
                      : "rounded-tl-none bg-white/5 border border-white/10"
                  )}
                >
                  <div className={cn(
                    "prose prose-sm prose-invert max-w-none text-[13px] leading-relaxed break-words",
                    isUser ? "text-blue-50 font-medium" : "text-slate-200"
                  )}>
                    {item.role === "assistant" && animation && isLastMessage ? (
                      <TypingAnimation className="inline text-[13px]" duration={10}>
                        {item.content}
                      </TypingAnimation>
                    ) : (
                      <ReactMarkdown
                        components={{
                          pre: ({ ...props }) => (
                            <div className="overflow-x-auto w-full my-2 rounded-lg bg-black/30 p-2 scrollbar-thin scrollbar-thumb-white/10">
                              <pre {...props} className="!bg-transparent !p-0" />
                            </div>
                          ),
                          code: ({ ...props }) => (
                            <code {...props} className="!bg-white/5 !px-1 !rounded text-blue-300" />
                          )
                        }}
                      >
                        {item.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-[#0d0d12]/90 p-3 shadow-2xl backdrop-blur-2xl transition-all focus-within:border-blue-500/50"
        >
          <div className="relative min-h-[100px] w-full px-3 pt-2">
            <Textarea
              disabled={codeLoading}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How can I help you build today?"
              className="min-h-[100px] w-full resize-none border-none bg-transparent p-0 text-sm font-medium leading-relaxed placeholder:text-slate-600 focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-1.5 w-1.5 rounded-full",
                codeLoading ? "bg-orange-500 animate-pulse" : "bg-green-500"
              )} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {codeLoading ? "AI is Thinking..." : "Ready to code"}
              </span>
            </div>

            <button
              onClick={() => text.length > 0 && HandleUpdate()}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                text.length === 0
                  ? "cursor-not-allowed bg-white/5 text-slate-700"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-110 active:scale-95"
              )}
            >
              <Forward className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
