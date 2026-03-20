import { Loader, Trash, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import React from "react";
import { AccountBillingContext } from "@/lib/Context";

export default function AccountBilling() {
  const { accountBilling, setaccountBilling } = React.useContext(
    AccountBillingContext,
  );
  const user = authClient.useSession().data?.user;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300">
      <div className="w-full max-w-[480px] rounded-[2.5rem] border border-white/10 bg-[#0d0d12]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="flex w-full items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {accountBilling.accountBillingType === "account"
                ? "Profile Settings"
                : "Billing Overview"}
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
              Manage your personal preferences
            </p>
          </div>
          <button
            onClick={() =>
              setaccountBilling({
                accountBillingType: "",
                is: false,
              })
            }
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {accountBilling.accountBillingType === "account" ? (
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between group">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</span>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{user?.name}</span>
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="flex items-center justify-between group">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</span>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{user?.email}</span>
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 py-6 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Terms of Use
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 py-6 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Privacy Policy
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between p-4 rounded-3xl bg-red-500/5 border border-red-500/10">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-red-400">Danger Zone</span>
                <span className="text-[10px] text-red-400/60 font-medium">Permanently delete your account</span>
              </div>
              <Button
                size="sm"
                className="rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all px-4"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Loader className="h-6 w-6 animate-spin text-blue-500 opacity-50" />
            </div>
            <h1 className="text-lg font-bold text-white">Billing Coming Soon</h1>
            <p className="text-slate-500 text-sm text-center">We are working on a seamless credit system for our users.</p>
          </div>
        )}
      </div>
    </div>
  );
}
