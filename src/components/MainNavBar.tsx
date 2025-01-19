"use client";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function MainNavBar({
  UserSession,
  SetIsLogin,
}: {
  UserSession: User | undefined;
  SetIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="sticky z-20 w-full  flex top-0 h-[50px] transparent justify-between items-center ">
      <div className="flex mt-2 w-full h-full items-center  ">
        <h1
          className="cursor-pointer "
          onClick={() => (window.location.href = "/")}
        >
          <span className="ml-10  font-syne  text-5xl ">V</span>
          <span className="mt-2   text-2xl">stack</span>
        </h1>
      </div>
      <div className="flex w-full "></div>
      <div
        className={cn(
          "flex w-full h-full items-center mr-5  mt-2 justify-end "
        )}
      >
        {!UserSession ? (
          <Button
            onClick={() => SetIsLogin(true)}
            variant="ghost"
            className={cn(" rounded-[3px] ")}
          >
            Sign-In
          </Button>
        ) : (
          <Avatar>
            <AvatarImage src={UserSession?.image!} alt={"Avatar"} />
          </Avatar>
        )}
      </div>
    </div>
  );
}
