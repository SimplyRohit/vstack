import { Textarea } from "@/components/ui/textarea";
import { Link2, WandSparkles, MoveRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Suggestions } from "@/lib/constant";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Main({ UserSession }: { UserSession: any }) {
  const [text, setText] = React.useState<string>("");
  const router = useRouter();
  const handleSubmit = (text: string) => {
    router.push(`/chat/1234`);
  };

  return (
    <div className="flex w-full h-full items-center justify-center flex-grow flex-col mb-32">
      <div className="absolute bottom-0 left-0  ml-5 mb-5">
        <Avatar>
          <AvatarImage src={UserSession?.image!} alt={UserSession?.name!} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-3xl">Genrate Your Own COde </h1>
      <p>run etc etc etc etc etc etc etc etc </p>
      <div className="flex flex-col w-[450px] h-[200px] rounded-xl mt-5 border ">
        <Textarea
          onChange={(e) => setText(e.target.value)}
          draggable="true"
          placeholder="See the magic"
          className="  focus-visible:ring-0 w-full h-full border-none resize-none"
        />
        <div className="flex w-full h-[50px] items-center flex-grow justify-between">
          <div className="items-center flex">
            <Link2 className="-rotate-45 ml-3 opacity-80"></Link2>
            <WandSparkles
              className={cn(
                text.length === 0 ? "opacity-50" : "opacity-80",
                "mr-3  w-5 ml-2"
              )}
            ></WandSparkles>
          </div>
          <div>
            <AlertDialog>
              <AlertDialogTrigger
                onClick={() => handleSubmit(text)}
                className={cn(
                  text.length === 0 && "hidden",
                  " rounded-[5px] mr-2 mb-1 p-1 text-white opacity-80 bg-blue-400 hover:bg-blue-500"
                )}
              >
                <MoveRight />
              </AlertDialogTrigger>
              {!UserSession && (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => signIn()}>
                      SignIn
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-[600px] gap-1 mt-10 ml-10 items-center">
        {Suggestions.map((suggestion, index) => (
          <p
            key={index}
            className="group flex  gap-3 rounded-xl text-[10px] border p-1 px-2   truncate"
          >
            {suggestion}
          </p>
        ))}
      </div>
      <div className="flex w-[500px] items-center justify-center flex-col h-full mt-10">
        <p>heelo asdkjasdku sadkjsakljdhiokas ouisdhikjs</p>
      </div>
    </div>
  );
}
