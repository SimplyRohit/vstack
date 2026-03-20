"use client";
import React, { useEffect, useState } from "react";
import { GetTokens } from "@/actions/GetUser";
import { Sparkles, Coins } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function UserTokens() {
  const [tokens, setTokens] = useState<number | null>(null);
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    if (user) {
      GetTokens().then((res) => {
        if (res.status === 200) {
          setTokens(res.tokens ?? 0);
        }
      });
    }
  }, [user]);

  if (!user || tokens === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-slate-300 shadow-sm backdrop-blur-md transition-all hover:bg-white/10"
    >
      <div className="flex items-center justify-center rounded-full bg-blue-500/20 p-1">
        <Coins className="h-3 w-3 text-blue-400" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-white">{tokens}</span>
        <span className="text-[9px] uppercase tracking-wider opacity-50">Tokens</span>
      </div>
    </motion.div>
  );
}
