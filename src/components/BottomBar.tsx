import { Coffee } from "lucide-react";
import { DiscordLogo, GithubLogo, XLogo } from "./Svg";
import Link from "next/link";

export default function BottomBar() {
  return (
    <div className="flex h-14 w-full items-center justify-between border-t border-white/5 bg-[#050507]/80 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <Link
          href="https://buymeacoffee.com/WasATrueWarrior"
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-all hover:text-white"
        >
          <Coffee className="h-4 w-4 text-orange-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          <span>Support the project</span>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-5">
          <Link href="/" target="_blank" className="text-slate-500 hover:text-white transition-colors">
            <XLogo className="w-4 h-4" />
          </Link>
          <Link href="https://github.com/SimplyRohit" target="_blank" className="text-slate-500 hover:text-white transition-colors">
            <GithubLogo className="w-5 h-5" />
          </Link>
          <Link href="https://discord.com/users/1102825570137542688" target="_blank" className="text-slate-500 hover:text-white transition-colors">
            <DiscordLogo className="w-5 h-5" />
          </Link>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <Link
          href="#"
          className="font-syne text-lg font-bold tracking-tighter text-slate-400 hover:text-white transition-all"
        >
          Vstack <span className="text-blue-500 opacity-50">v1.2.4</span>
        </Link>
      </div>
    </div>
  );
}
