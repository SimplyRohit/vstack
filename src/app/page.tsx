"use client";

import BottomBar from "@/components/main/bottom";
import Main from "@/components/main/main";
import Navbar from "@/components/main/navbar";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const [UserSession, SetUserSession] = React.useState<any>();
  const session = useSession();
  React.useEffect(() => {
    const Handle = async () => {
      await SetUserSession(session.data?.user);
      console.log(UserSession);
    };
    Handle();
  });

  return (
    <>
      <Navbar UserSession={UserSession} />
      <Main UserSession={UserSession} />
      <BottomBar />
    </>
  );
}
