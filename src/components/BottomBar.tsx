import { DiscordLogo, GithubLogo, XLogo } from "./Svg";

export default function BottomBar() {
  return (
    <div className="flex gap-4 sticky  w-full h-[45px]   items-center font-bold text-sm  justify-end ">
      <div className="flex  gap-1 items-center justify-center">
        <XLogo className="w-10  opacity-50 cursor-pointer    hover:opacity-100 " />
        <GithubLogo className="w-5 opacity-50 cursor-pointer   hover:opacity-100 " />
        <DiscordLogo className="w-6 opacity-50 mt-1 ml-2 cursor-pointer   hover:opacity-100 " />
      </div>
      <div className="bg-white rounded  w-[4px] h-[4px]"></div>
      <h1 className="opacity-50   hover:opacity-100 cursor-pointer   truncate">
        Help Center
      </h1>
      <div className="bg-white rounded w-[4px] h-[4px]"></div>
      <h1 className="opacity-50   hover:opacity-100 cursor-pointer  truncate">
        Terms Privacy
      </h1>
      <div className="bg-white rounded w-[4px] h-[4px]"></div>
      <h1 className="font-GeistSans text-xl mt-1  cursor-pointer  mr-3 truncate">
        Vbuilds
      </h1>
    </div>
  );
}
