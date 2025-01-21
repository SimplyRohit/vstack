"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import NavbarAvatar from "./NavbarAvatar";

export default function MainNavBar({}: {}) {
  const session = useSession();
  const [UserSession, SetUserSession] = React.useState<any>();
  React.useEffect(() => {
    const Handle = async () => {
      await SetUserSession(session.data?.user);
    };
    Handle();
  });
  return (
    <div className="sticky z-20 w-full   flex top-0 h-[50px] transparent justify-between items-center ">
      <div className="flex  w-full h-full  items-center  ">
        <h1
          className="cursor-pointer "
          onClick={() => (window.location.href = "/")}
        >
          <span className="ml-10  font-syne  text-4xl ">V</span>
          <span className="   text-2xl">stack</span>
        </h1>
      </div>
      <div className="flex w-full "></div>
      <div
        className={cn("flex w-full h-full gap-3 items-center  justify-end ")}
      >
        {UserSession && (
          <>
            <Button
              size={"default"}
              variant="secondary"
              className={cn(" rounded-[3px] 0 ")}
            >
              Deploy
            </Button>

            <Button
              size={"default"}
              variant="secondary"
              className={cn(" rounded-[3px]  ")}
            >
              Export
            </Button>
          </>
        )}
        <NavbarAvatar UserSession={UserSession} />
      </div>
    </div>
  );
}
