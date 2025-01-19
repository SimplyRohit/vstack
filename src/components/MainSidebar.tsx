import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { time } from "console";

export default function MainSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "z-10 w-[300px] border-r flex items-center justify-center flex-col shadow-sm h-full fixed top-0 left-0 transform transition-transform duration-300 ease-in-out",
        open
          ? "translate-x-0 bg-[#171717]"
          : "-translate-x-[300px] bg-[#171717]"
      )}
    >
      {open ? (
        <ChevronLeft
          onClick={() => setOpen(!open)}
          className="w-10 z-10 h-10 absolute top-[calc(50%-20px)] -right-1 stroke-[4px] opacity-40 cursor-pointer"
        />
      ) : (
        <motion.div
          animate={{
            x: [40, 50, 40],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className=" z-10  absolute top-[calc(50%-30px)] -right-1  opacity-40 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <ChevronRight className="h-10 w-10 stroke-[4px]" />
        </motion.div>
      )}
    </div>
  );
}
