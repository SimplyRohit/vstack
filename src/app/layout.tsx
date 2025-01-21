"use client";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import MainSidebar from "@/components/MainSidebar";
import React from "react";
import { SandBoxContext, UserMessageContext } from "@/lib/Context";
import MainNavBar from "@/components/MainNavBar";
import BottomBar from "@/components/BottomBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sandBox, setsandBox] = React.useState({
    sandBoxType: "",
    timeStamp: 0,
  });
  const pathname = usePathname();
  const [UserMessage, SetUserMessage] = React.useState("");

  return (
    <SessionProvider>
      <UserMessageContext.Provider value={{ UserMessage, SetUserMessage }}>
        <SandBoxContext.Provider value={{ sandBox, setsandBox }}>
          <html lang="en">
            <body className={cn(`${GeistMono.className} antialiased`)}>
              <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#141414] via-[#222222] to-[#383737]">
                <MainNavBar />
                <MainSidebar />
                {children}
                {!pathname.startsWith("/chat") && <BottomBar />}
              </div>
            </body>
          </html>
        </SandBoxContext.Provider>
      </UserMessageContext.Provider>
    </SessionProvider>
  );
}
