import "./globals.css";
import React from "react";
import Provider from "@/components/provider";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="en">
      <body className={cn(`${geist.className} antialiased`)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
