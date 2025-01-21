import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import React from "react";
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
const items = [{ name: "Chat 1" }, { name: "Chat 2" }, { name: "Chat 3" }];
export default function MainSidebar() {
  const [open, setOpen] = React.useState(false);
  const user = useSession().data?.user;
  return (
    user && (
      <div
        className={cn(
          "z-10 w-[300px]     backdrop-blur-xl opacity-80 flex px-2 py-2 border  items-center rounded-2xl justify-start flex-col  h-[400px] fixed top-[calc(50%-250px)] left-0 transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0 " : "-translate-x-[300px] "
        )}
      >
        <SidebarProvider className="min-h-[300px]">
          <SidebarGroup className="min-h-[300px]">
            <SidebarGroupLabel className="text-white opacity-50">
              Chat [last 8 chats]
            </SidebarGroupLabel>
            <SidebarMenu className="flex w-full mt-2 min-h-[300px]  overflow-y-auto  ">
              {items.slice(0, 8).map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="hover:bg-[#3d3d3d] text-white hover:text-white active:text-white active:bg-[#3d3d3d]">
                    <span>{item.name}</span>
                    <Trash
                      onClick={() => console.log("clicked")}
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarProvider>

        <Button
          onClick={() => console.log("clicked")}
          className="w-full  z-10  h-[30px] text-white bg-transparent hover:bg-[#3d3d3d]"
        >
          Make new Chat
        </Button>

        {open ? (
          <ChevronLeft
            onClick={() => setOpen(!open)}
            className="w-10 z-10 h-10 absolute top-[calc(50%-20px)] -right-1 stroke-[4px] opacity-40 cursor-pointer"
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
            className=" z-10  absolute top-[calc(50%-30px)] right-[-2.4rem] opacity-40 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <ChevronRight className="h-10 w-10 stroke-[4px]" />
          </motion.div>
        )}
      </div>
    )
  );
}
