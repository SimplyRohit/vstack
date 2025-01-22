import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { DeleteChat, getAllChats } from "@/actions/GetChat";
import { useRouter } from "next/navigation";
type Chats = {
  chatid: string;
}[];
export default function MainSidebar() {
  const [chats, setChats] = React.useState<Chats>([
    { chatid: "12121" },
    { chatid: "12121" },
    { chatid: "12121" },
    { chatid: "12121" },
  ]);
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
        setChats(data);
        setChatLoading(false);
      }
    };
    if (open) {
      handle();
    }
  }, [open]);

  const handleDelete = async (chatid: string) => {
    const data = await DeleteChat(chatid);
    if (data === 400) {
      return;
    } else {
      setChats(
        chats.filter((item) => {
          return item.chatid !== chatid;
        }),
      );
    }
  };

  const handlenewChat = () => {
    const chatid = Math.random().toString(36).slice(2);
    router.push(`/chat/${chatid}`);
  };
  return (
    user && (
      <div
        className={cn(
          "fixed left-0 top-[calc(50%-250px)] z-10 flex h-[400px] w-[300px] transform flex-col items-center justify-start rounded-2xl border p-3 opacity-80 backdrop-blur-xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-[300px]",
        )}
      >
        <div className="text-sm text-white opacity-50">Chat [last 8 chats]</div>
        <div className="mt-2 flex min-h-[300px] w-full flex-col overflow-y-auto">
          {chatLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            chats.slice(0, 8).map((item, index) => (
              <div
                key={index}
                className="my-1 flex items-center justify-between p-1 text-sm font-bold hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d] active:text-white"
              >
                <span>{item.chatid}</span>
                <Trash
                  onClick={() => handleDelete(item.chatid)}
                  className="mr-2 h-5 w-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </div>
            ))
          )}
        </div>

        <Button
          onClick={() => handlenewChat()}
          className="z-10 mt-5 h-[30px] w-full bg-transparent text-white hover:bg-[#3d3d3d]"
        >
          Make new Chat
        </Button>

        {open ? (
          <ChevronLeft
            onClick={() => setOpen(!open)}
            className="absolute -right-1 top-[calc(50%-20px)] z-10 h-10 w-10 cursor-pointer stroke-[4px] opacity-40"
          />
        ) : (
          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[-2.4rem] top-[calc(50%-30px)] z-10 cursor-pointer opacity-40"
            onClick={() => setOpen(!open)}
          >
            <ChevronRight className="h-10 w-10 stroke-[4px]" />
          </motion.div>
        )}
      </div>
    )
  );
}
