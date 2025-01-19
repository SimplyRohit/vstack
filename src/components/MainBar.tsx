import { Textarea } from "@/components/ui/textarea";
import { Link2, WandSparkles, MoveRight, Forward } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Suggestions } from "@/lib/Constant";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MakeChat } from "@/actions/GetChat";
import { Cover } from "./ui/cover";
import Image from "next/image";
import {
  AngularLogo,
  AstroLogo,
  NativeLogo,
  NextLogo,
  NuxtLogo,
  ReactLogo,
  SveletLogo,
  TypeScriptLogo,
  ViteLogo,
  VueLogo,
} from "./Svg";

export default function MainBar({
  UserSession,
  SetIsLogin,
}: {
  UserSession: any;
  SetIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [IsDialogOpen, setIsDialogOpen] = React.useState(false);
  const [text, setText] = React.useState<string>("");
  const router = useRouter();
  const handleSubmit = async () => {
    if (!UserSession) {
      SetIsLogin(true);
      return;
    }
    const chatid = Math.random().toString(36).slice(2);
    const data = await MakeChat({
      chatid,
      message: {
        role: "user",
        content: text,
      },
    });
    if (data.status === 400 || data.status === 401) {
      alert("some error");
      return;
    }

    router.push(`/chat/${chatid}`);
  };

  return (
    <div className="flex w-full h-full items-center  justify-center flex-grow flex-col mb-5">
      <h1 className="text-3xl align-middle">
        Generate your <Cover className="cursor-none ">Own Website</Cover>
      </h1>
      <p className="font-bold opacity-50 my-1 mb-4">
        Genrate , preview , edit code and deploy .
      </p>
      <div className="flex bg-transparent shadow-xl flex-col w-[450px] h-[200px] rounded-xl  border border-[#3a3a3a] backdrop-blur-3xl ">
        <Textarea
          inputMode="text"
          onChange={(e) => setText(e.target.value)}
          draggable="true"
          placeholder="See the magic ........"
          className=" font-bold  focus-visible:ring-0 w-full h-full border-none resize-none"
        />
        <div className="flex w-full h-[50px] items-center flex-grow justify-between">
          <div className="items-center flex">
            <Link2 className="-rotate-45 cursor-pointer  ml-3 opacity-80"></Link2>
            <WandSparkles
              className={cn(
                text.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-80 cursor-pointer",
                "mr-3   w-5 ml-2"
              )}
            ></WandSparkles>
          </div>
          <div className="flex flex-grow"></div>
          <div className="flex items-center justify-center mr-3 ">
            <div
              onClick={() => handleSubmit()}
              className={cn(text.length === 0 && "hidden", "     text-white ")}
            >
              <Forward className="w-7 h-7 " />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-[600px] gap-2 mt-5  items-center">
        {Suggestions.map((suggestion, index) => (
          <p
            key={index}
            className="group flex cursor-pointer  gap-3 rounded-xl text-[12px] border border-[#3a3a3a] p-1 px-2   truncate"
          >
            {suggestion}
          </p>
        ))}
      </div>
      <div className="flex w-[500px] items-center justify-center flex-col h-full mt-20">
        <p className="opacity-50 font-bold">
          start a blank app with your favorite stack
        </p>
        <div className="flex w-[600px] gap-5 mt-3 items-center justify-center">
          <AngularLogo className="w-11 h-11  cursor-not-allowed opacity-50 hover:opacity-100  " />
          <AstroLogo className="w-14 h-14 cursor-not-allowed opacity-50 hover:opacity-100  " />
          <NativeLogo className="w-14 h-14  cursor-not-allowed opacity-50 hover:opacity-100" />
          <NextLogo className="w-12 h-12  cursor-not-allowed opacity-50 hover:opacity-100" />
          <NuxtLogo className="w-14 h-14  cursor-not-allowed opacity-50 hover:opacity-100" />
        </div>
        <div className="flex w-[600px]  gap-5 mt-3 items-center justify-center">
          <TypeScriptLogo className="w-14  cursor-not-allowed h-14 mb-3 opacity-50 hover:opacity-100" />
          <ReactLogo className="w-12 h-12  cursor-not-allowed opacity-50 hover:opacity-100" />
          <SveletLogo className="w-14 h-14  cursor-not-allowed opacity-50 hover:opacity-100" />
          <ViteLogo className="w-12 h-12  cursor-not-allowed opacity-50 hover:opacity-100" />
          <VueLogo className="w-12 h-12 cursor-not-allowed opacity-50 hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}
