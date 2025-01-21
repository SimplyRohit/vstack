"use client";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import MainSidebar from "@/components/MainSidebar";
import React from "react";
import { IsLoginContext, UserMessageContext } from "@/lib/Context";
import MainNavBar from "@/components/MainNavBar";
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [IsLogin, SetIsLogin] = React.useState(false);
  const [UserMessage, SetUserMessage] = React.useState("");
  return (
    <SessionProvider>
      <UserMessageContext.Provider value={{ UserMessage, SetUserMessage }}>
        <IsLoginContext.Provider value={{ IsLogin, SetIsLogin }}>
          <html lang="en">
            <body className={cn(`${GeistMono.className} antialiased `)}>
              <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#141414] via-[#222222]  to-[#383737]   ">
                <MainNavBar />
                <MainSidebar />
                {children}
              </div>
            </body>
          </html>
        </IsLoginContext.Provider>
      </UserMessageContext.Provider>
    </SessionProvider>
  );
}
