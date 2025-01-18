import { User } from "next-auth";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function NavBar({
  UserSession,
}: {
  UserSession: User | undefined;
}) {
  return (
    <div className="sticky z-20 w-full flex top-0 h-[50px] transparent justify-between items-center ">
      <div className="flex mt-2 w-full h-full items-center  ">
        <h1 className="ml-10  font-syne  text-5xl ">V</h1>
        <h1 className="mt-2   text-2xl">stack</h1>
      </div>
      <div className="flex w-full "></div>
      <div className={cn("flex w-full h-full items-center  mt-2 justify-end ")}>
        <Button
          onClick={() => signIn()}
          variant="secondary"
          className={cn(UserSession && "hidden", "mr-10  rounded-[3px] ")}
        >
          login
        </Button>
      </div>
    </div>
  );
}
