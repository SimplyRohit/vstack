"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { UserMessageContext } from "@/lib/Context";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Forward, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suggestions } from "@/lib/Constant";
import { Cover } from "@/components/ui/cover";
import Stacks from "@/components/stacks";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Home() {
  const { SetUserMessage } = React.useContext(UserMessageContext);
  const router = useRouter();
  const session = authClient.useSession();
  const [text, setText] = React.useState<string>("");
  const user = session.data?.user;

  const handleSubmit = async () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    const chatid = Math.random().toString(36).slice(2);
    SetUserMessage(text);
    router.push(`/chat/${chatid}`);
  };

  const handleGenerate = async (suggestion: string) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    const chatid = Math.random().toString(36).slice(2);
    SetUserMessage(suggestion);
    router.push(`/chat/${chatid}`);
  };

  const handleStacks = async (template: string) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    toast("coming soon");
    console.log(template);
  };

  return (
    <div className="relative flex h-full w-full flex-grow flex-col items-center justify-center overflow-hidden px-4">

      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Generate your{" "}
            <Cover className="inline-block">
              <span className="bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                Own Website
              </span>
            </Cover>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-400/80">
            Design, preview, edit code and deploy with AI power.
            All in one isolated cloud environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex w-full max-w-[550px] flex-col rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20"
        >
          <div className="relative h-[160px] w-full px-2 pt-2">
            <Textarea
              inputMode="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you want to build today?"
              className="h-full w-full resize-none border-none bg-transparent text-lg font-medium leading-relaxed placeholder:text-slate-500 focus-visible:ring-0"
            />
          </div>
          <div className="flex h-12 w-full items-center justify-between px-4 pb-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60">AI Powered</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => text.length > 0 && handleSubmit()}
                className={cn(
                  "flex items-center justify-center rounded-xl p-2 transition-all duration-300",
                  text.length === 0
                    ? "cursor-not-allowed text-slate-700"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95"
                )}
              >
                <Forward className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex w-full max-w-[700px] flex-wrap items-center justify-center gap-2.5"
        >
          {Suggestions.map((suggestion, index) => (
            <button
              onClick={() => handleGenerate(suggestion)}
              key={index}
              className="group relative overflow-hidden rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-[11px] font-medium text-slate-400 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 w-full"
        >
          <Stacks handleStacks={handleStacks} />
        </motion.div>
      </div>
    </div>
  );
}
