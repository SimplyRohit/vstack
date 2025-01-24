import { Coffee } from "lucide-react";
import { DiscordLogo, GithubLogo, XLogo } from "./Svg";
import Link from "next/link";

export default function BottomBar() {
  return (
    <div className="sticky flex h-[45px] w-full items-center justify-between">
      <div className="flex h-full w-full items-center font-bold">
        <Link
          href={"https://buymeacoffee.com/WasATrueWarrior"}
          className="flex cursor-pointer items-center truncate opacity-50 hover:opacity-100"
        >
          <Coffee className="mb-[4px] ml-6 mr-2" /> Buy Me a Coffee
        </Link>
      </div>
      <div className="flex h-full w-full items-center justify-end gap-4 text-sm font-bold">
        <div className="flex items-center justify-center gap-1">
          <Link href={"/"}>
            <XLogo className="w-10 cursor-pointer opacity-50 hover:opacity-100" />
          </Link>
          <Link href={"https://github.com/SimplyRohit"}>
            <GithubLogo className="w-5 cursor-pointer opacity-50 hover:opacity-100" />
          </Link>
          <Link href={"https://discord.com/users/1102825570137542688"}>
            <DiscordLogo className="ml-2 mt-1 w-6 cursor-pointer opacity-50 hover:opacity-100" />
          </Link>
        </div>

        <div className="h-[4px] w-[4px] rounded bg-white"></div>
        <Link
          href="#"
          className="mr-6 mt-1 cursor-pointer truncate font-GeistSans text-xl"
        >
          Vbuilds
        </Link>
      </div>
    </div>
  );
}
