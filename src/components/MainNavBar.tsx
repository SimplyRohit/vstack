"use client";
import React from "react";
import NavbarAvatar from "./NavbarAvatar";
import { usePathname } from "next/navigation";
import { SandBoxContext } from "@/lib/Context";
import { Rocket, Share2, Loader } from "lucide-react";

export default function MainNavBar() {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/chat");
  const { sandBox, setsandBox } = React.useContext(SandBoxContext);

  const handleAction = (type: string) => {
    setsandBox((prev) => ({
      ...prev,
      sandBoxType: type,
      timeStamp: Date.now(),
      activeTab: "preview",
    }));
  };

  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-transparent px-4 transition-all duration-300">
      <div className="flex items-center gap-2">
        <h1
          className="group flex cursor-pointer items-baseline transition-all"
          onClick={() => (window.location.href = "/")}
        >
          <span className="ml-8 font-syne text-3xl">V</span>
          <span className="text-2xl">stack</span>
          <div className="ml-4 h-4 w-px bg-white/10" />
          <span className="ml-4 hidden text-base font-bold md:block">
            Cloud IDE
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {isChatPage && (
          <div className="hidden md:flex items-center gap-3 mr-4">
            <button
              onClick={() => handleAction("export")}
              disabled={sandBox.loading}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              {sandBox.loading && sandBox.sandBoxType === "export" ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              Export
            </button>
            <button
              onClick={() => handleAction("deploy")}
              disabled={sandBox.loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-50"
            >
              {sandBox.loading && sandBox.sandBoxType === "deploy" ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Rocket className="h-4 w-4" />
              )}
              Deploy
            </button>
          </div>
        )}
        <NavbarAvatar />
      </div>
    </nav>
  );
}
