import "./globals.css";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Provider from "@/components/provider";
import { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "vstack",
  icons: "/icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(GeistMono.className, "antialiased bg-[#141414] text-white")}>
        <SessionProvider>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
