"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import React from "react";
import "./globals.css";
import Provider from "@/components/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metadata = {
    title: "Your App Title",
    description: "Description of your app.",
  };

  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
