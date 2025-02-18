"use client";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import MainSidebar from "@/components/MainSidebar";
import React from "react";
import {
  AccountBillingContext,
  SandBoxContext,
  TemplateContext,
  UserMessageContext,
} from "@/lib/Context";
import MainNavBar from "@/components/MainNavBar";
import BottomBar from "@/components/BottomBar";
import { usePathname } from "next/navigation";
import AccountBilling from "@/components/account-billing";
import { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [sandBox, setsandBox] = React.useState({
    sandBoxType: "",
    timeStamp: 0,
  });
  const pathname = usePathname();
  const [UserMessage, SetUserMessage] = React.useState("");
  const [accountBilling, setaccountBilling] = React.useState({
    accountBillingType: "",
    is: false,
  });
  const [template, setTemplate] = React.useState<string>("react");
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_KEY_ID! }}
    >
      <TemplateContext.Provider value={{ template, setTemplate }}>
        <UserMessageContext.Provider value={{ UserMessage, SetUserMessage }}>
          <SandBoxContext.Provider value={{ sandBox, setsandBox }}>
            <AccountBillingContext.Provider
              value={{ accountBilling, setaccountBilling }}
            >
              <html lang="en">
                <body className={cn(`${GeistMono.className} antialiased`)}>
                  <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#141414] via-[#222222] to-[#383737] md:hidden">
                    <h1>Not available for mobile devices</h1>
                  </div>
                  <div className="relative hidden min-h-screen flex-col bg-gradient-to-br from-[#141414] via-[#222222] to-[#383737] md:flex">
                    <Toaster position="top-center" reverseOrder={false} />
                    {accountBilling.is && <AccountBilling />}
                    <MainNavBar />
                    {!pathname.startsWith("/tokens") && <MainSidebar />}
                    {children}
                    {!pathname.startsWith("/chat") && <BottomBar />}
                  </div>
                </body>
              </html>
            </AccountBillingContext.Provider>
          </SandBoxContext.Provider>
        </UserMessageContext.Provider>
      </TemplateContext.Provider>
    </PayPalScriptProvider>
  );
}
