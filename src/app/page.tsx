"use client";

import BottomBar from "@/components/BottomBar";
import MainBar from "@/components/MainBar";
import Navbar from "@/components/MainNavBar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { IsLoginContext } from "@/lib/Context";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { SetIsLogin } = React.useContext(IsLoginContext);
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
      <Navbar SetIsLogin={SetIsLogin} UserSession={UserSession} />
      <MainBar SetIsLogin={SetIsLogin} UserSession={UserSession} />
      <BottomBar />
    </>
  );
}
