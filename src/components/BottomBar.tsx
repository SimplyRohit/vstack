import { Coffee } from "lucide-react";
import { DiscordLogo, GithubLogo, XLogo } from "./Svg";
import Link from "next/link";

export default function BottomBar() {
  return (
    <div className="flex h-12 w-full items-center justify-between bg-transparent px-4">
      <div className="flex items-center">
        <Link
          href="https://buymeacoffee.com/WasATrueWarrior"
          className="group flex items-center gap-2.5 text-xs lowercase tracking-wide text-slate-500 transition-all hover:text-white"
        >
          <Coffee className="h-4 w-4 text-orange-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          <span>buy me a coffee</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5">
          <Link href="/" target="_blank" className="text-slate-500 hover:text-white transition-colors">
            <XLogo className="w-[22px] h-[22px]" />
          </Link>
          <Link href="https://github.com/SimplyRohit" target="_blank" className="text-slate-500 hover:text-white transition-colors">
            <GithubLogo className="w-5 h-5" />
          </Link>
          <Link href="https://discord.com/users/1102825570137542688" target="_blank" className="text-slate-500 hover:text-white transition-colors">
            <DiscordLogo className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-slate-700 text-lg">·</div>

        <Link
          href="#"
          className="font-syne text-sm font-bold tracking-tighter text-slate-500 hover:text-white transition-all"
        >
          Vbuilds
        </Link>
      </div>
    </div>
  );
}
