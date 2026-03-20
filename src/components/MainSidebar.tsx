import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader, Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { DeleteChat, getAllChats } from "@/actions/GetChat";
import { useRouter } from "next/navigation";
type Chats = {
  chatid: string;
  messages: any[];
}[];
export default function MainSidebar() {
  const [chats, setChats] = React.useState<Chats>([]);
  const [open, setOpen] = React.useState(false);
  const user = useSession().data?.user;
  const router = useRouter();
  const [chatLoading, setChatLoading] = React.useState(false);

  useEffect(() => {
    const handle = async () => {
      setChatLoading(true);
      const data = await getAllChats();

      if (data === 400) {
        setChatLoading(false);
        return null;
      } else {
        setChats(data as any);
        setChatLoading(false);
      }
    };
    if (open) {
      handle();
    }
  }, [open]);

  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [openingId, setOpeningId] = React.useState<string | null>(null);

  const handleDelete = async (chatid: string) => {
    setDeletingId(chatid);
    try {
      const data = await DeleteChat(chatid);
      if (data !== 400) {
        setChats(chats.filter((item) => item.chatid !== chatid));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handlenewChat = () => {
    const chatid = Math.random().toString(36).slice(2);
    router.push(`/chat/${chatid}`);
  };

  const handleOpenChat = (chatid: string) => {
    setOpeningId(chatid);
    router.push(`/chat/${chatid}`);
  };

  return (
    user && (
      <div
        className={cn(
          "fixed left-0 top-1/2 z-[60] flex h-[580px] w-80 -translate-y-1/2 transform flex-col rounded-r-[2rem] border border-white/10 bg-[#0d0d12]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open ? "translate-x-0" : "-translate-x-[318px]",
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500/80 mb-1">Navigation</span>
            <h2 className="text-xl font-bold tracking-tight text-white/90">History</h2>
          </div>
          <div className="flex h-6 px-2.5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
            {chats.length} active
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
          {chatLoading ? (
            <div className="flex h-40 w-full flex-col items-center justify-center gap-4">
              <div className="h-1 tracking-tighter w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-[loading_1.5s_infinite_linear]" style={{ width: "30%" }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Syncing...</span>
            </div>
          ) : (
            chats.slice(0, 15).map((item, index) => {
              const chatTitle = (item.messages && item.messages.length > 0)
                ? item.messages[0].content
                : item.chatid;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  key={index}
                  className={cn(
                    "group relative flex cursor-pointer items-center gap-4 rounded-2xl p-3.5 transition-all duration-300",
                    openingId === item.chatid
                      ? "bg-white/5 ring-1 ring-white/10"
                      : "hover:bg-white/[0.03] active:scale-[0.98]"
                  )}
                  onClick={() => handleOpenChat(item.chatid)}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 transition-all group-hover:border-white/10 group-hover:bg-white/10">
                    <span className="text-xs font-bold text-slate-500 group-hover:text-blue-400">
                      {index + 1}
                    </span>
                    {openingId === item.chatid && (
                      <div className="absolute -inset-1 rounded-xl border border-blue-500/30 animate-pulse" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col overflow-hidden">
                    <span className={cn(
                      "truncate text-sm font-bold tracking-tight transition-colors",
                      openingId === item.chatid ? "text-blue-400" : "text-white/80 group-hover:text-white"
                    )}>
                      {chatTitle}
                    </span>
                    <span className="text-[10px] font-medium text-slate-600 truncate uppercase tracking-widest mt-0.5">
                      {item.chatid.slice(0, 15)}
                    </span>
                  </div>

                  {deletingId === item.chatid ? (
                    <Loader className="h-4 w-4 animate-spin text-red-500/50" />
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.chatid);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-xl opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        <div className="pt-6 mt-4 border-t border-white/10">
          <Button
            onClick={() => handlenewChat()}
            className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-xs font-bold text-white transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              <span className="tracking-widest uppercase">Start Building</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className={cn(
            "absolute -right-12 top-1/2 flex h-32 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-3xl border border-l-0 border-white/10 bg-[#0d0d12]/90 shadow-2xl backdrop-blur-3xl transition-all hover:bg-white/5 group",
          )}
        >
          <div className="flex flex-col items-center gap-4">
            {open ? (
              <ChevronLeft className="h-6 w-6 text-slate-500 group-hover:text-white transition-all" />
            ) : (
              <>
                <ChevronRight className="h-6 w-6 text-slate-500 group-hover:text-white transition-all" />
                <div className="flex flex-col gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <div className="w-1 h-1 rounded-full bg-slate-800" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}
