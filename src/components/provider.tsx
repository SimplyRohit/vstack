"use client";
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
    activeTab: "code",
    loading: false,
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
              <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#09090b] md:hidden">
                <div className="flex flex-col items-center gap-4 text-center px-8">
                  <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <span className="text-3xl font-syne font-bold text-blue-500 tracking-tighter">V</span>
                  </div>
                  <h1 className="text-2xl font-bold text-white">Desktop Only Experience</h1>
                  <p className="text-slate-500 text-sm max-w-[280px]">
                    Vstack Cloud IDE is optimized for high-performance coding on desktop screens.
                  </p>
                </div>
              </div>

              <div className="relative hidden h-screen flex-col bg-[#050507] text-slate-200 md:flex selection:bg-blue-500/30">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] opacity-40 pointer-events-none" />

                <Toaster position="top-center" reverseOrder={false} />
                {accountBilling.is && <AccountBilling />}

                <MainNavBar />

                <div className="flex flex-1 overflow-hidden relative z-10">
                  {!pathname.startsWith("/tokens") && <MainSidebar />}
                  <main className="flex-1 overflow-auto bg-transparent relative">
                    {children}
                  </main>
                </div>

                {!pathname.startsWith("/chat") && !pathname.startsWith("/tokens") && <BottomBar />}
              </div>
            </AccountBillingContext.Provider>
          </SandBoxContext.Provider>
        </UserMessageContext.Provider>
      </TemplateContext.Provider>
    </PayPalScriptProvider>
  );
}
