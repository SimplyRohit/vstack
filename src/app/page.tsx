"use client";

import BottomBar from "@/components/BottomBar";
import MainBar from "@/components/MainBar";
import Navbar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const [UserSession, SetUserSession] = React.useState<any>();
  const session = useSession();
  React.useEffect(() => {
    const Handle = async () => {
      await SetUserSession(session.data?.user);
    };
    Handle();
  });

  return (
    <>
      <Navbar UserSession={UserSession} />
      <MainBar UserSession={UserSession} />
      <BottomBar />
    </>
  );
}
