import { Coffee } from "lucide-react";
import { DiscordLogo, GithubLogo, XLogo } from "./Svg";

export default function BottomBar() {
  return (
    <div className="sticky flex h-[45px] w-full items-center justify-between">
      <div className="flex h-full w-full items-center font-bold">
        <h1 className="flex cursor-pointer items-center truncate opacity-50 hover:opacity-100">
          <Coffee className="mb-[4px] ml-6 mr-2" /> Buy Me a Coffee
        </h1>
      </div>
      <div className="flex h-full w-full items-center justify-end gap-4 text-sm font-bold">
        <div className="flex items-center justify-center gap-1">
          <XLogo className="w-10 cursor-pointer opacity-50 hover:opacity-100" />
          <GithubLogo className="w-5 cursor-pointer opacity-50 hover:opacity-100" />
          <DiscordLogo className="ml-2 mt-1 w-6 cursor-pointer opacity-50 hover:opacity-100" />
        </div>
        <div className="h-[4px] w-[4px] rounded bg-white"></div>
        <h1 className="cursor-pointer truncate opacity-50 hover:opacity-100">
          Help Center
        </h1>
        <div className="h-[4px] w-[4px] rounded bg-white"></div>
        <h1 className="cursor-pointer truncate opacity-50 hover:opacity-100">
          Terms Privacy
        </h1>
        <div className="h-[4px] w-[4px] rounded bg-white"></div>
        <h1 className="mr-6 mt-1 cursor-pointer truncate font-GeistSans text-xl">
          Vbuilds
        </h1>
      </div>
    </div>
  );
}
