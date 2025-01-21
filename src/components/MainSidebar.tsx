import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import { useSession } from "next-auth/react";
import { DeleteChat, getAllChats } from "@/actions/GetChat";
import { useRouter } from "next/navigation";
type Chats = {
  chatid: string;
}[];
export default function MainSidebar() {
  const [chats, setChats] = React.useState<Chats>([]);
  const [open, setOpen] = React.useState(false);
  const user = useSession().data?.user;
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      const data = await getAllChats();
      console.log(data);
      if (data === 400) {
        return null;
      } else {
        setChats(data);
      }
    };
    handle();
  }, []);

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
          "fixed left-0 top-[calc(50%-250px)] z-10 flex h-[400px] w-[300px] transform flex-col items-center justify-start rounded-2xl border px-2 py-2 opacity-80 backdrop-blur-xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-[300px]",
        )}
      >
        <SidebarProvider className="min-h-[300px]">
          <SidebarGroup className="min-h-[300px]">
            <SidebarGroupLabel className="text-white opacity-50">
              Chat [last 8 chats]
            </SidebarGroupLabel>
            <SidebarMenu className="mt-2 flex min-h-[300px] w-full overflow-y-auto">
              {chats.slice(0, 8).map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="text-white hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d] active:text-white">
                    <span>{item.chatid}</span>
                    <Trash
                      onClick={() => handleDelete(item.chatid)}
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarProvider>

        <Button
          onClick={() => handlenewChat()}
          className="z-10 h-[30px] w-full bg-transparent text-white hover:bg-[#3d3d3d]"
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
