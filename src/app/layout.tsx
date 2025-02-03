import "./globals.css";
import { SessionProvider } from "next-auth/react";
import React from "react";
import "./globals.css";
import Provider from "@/components/provider";
import { Metadata } from "next";

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
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
