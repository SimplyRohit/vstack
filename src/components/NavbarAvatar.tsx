import { BadgeCheck, CreditCard, LogOut, Sparkles, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { AccountBillingContext } from "@/lib/Context";
import React from "react";

import UserTokens from "./UserTokens";

import { usePathname, useRouter } from "next/navigation";

export default function NavbarAvatar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setaccountBilling } = React.useContext(AccountBillingContext);
  const session = authClient.useSession();
  const user = session.data?.user;
  const isPending = session.isPending;
  const isSignInPage = pathname === "/signin";

  if (isPending) {
    return (
      <div className="flex items-center justify-end gap-6 px-2 py-1">
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-3 px-2 py-1">
      <UserTokens />

      {!user ? (
        !isSignInPage && (
          <Button
            onClick={() => router.push("/signin")}
            size="sm"
            variant="secondary"
            className="h-8 rounded-full bg-blue-600 px-4 text-xs font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Sign In
          </Button>
        )
      ) : (
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="group cursor-pointer">
                <Avatar className="h-9 w-9 border border-white/10 ring-2 ring-transparent transition-all group-hover:border-blue-500/50 group-hover:ring-blue-500/20">
                  <AvatarImage src={user?.image as string} alt={user?.name || "User Avatar"} />
                  <AvatarFallback className="bg-slate-800 text-xs font-bold text-white uppercase">
                    {user?.name?.slice(0, 2) || "VS"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="mt-2 min-w-[240px] rounded-2xl border border-white/10 bg-[#0d0d12]/80 p-2 shadow-2xl backdrop-blur-2xl"
              side="bottom"
              align="end"
              sideOffset={8}
            >
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-10 w-10 border border-white/5">
                  <AvatarImage src={user?.image as string} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{user?.name}</span>
                  <span className="text-[10px] text-slate-500 truncate max-w-[140px]">{user?.email}</span>
                </div>
              </div>

              <DropdownMenuSeparator className="bg-white/5" />

              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => (window.location.href = "/tokens")}
                >
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span>Buy Premium Tokens</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-white/5" />

              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() =>
                    setaccountBilling({
                      accountBillingType: "account",
                      is: true,
                    })
                  }
                >
                  <BadgeCheck className="h-4 w-4 text-slate-400" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() =>
                    setaccountBilling({
                      accountBillingType: "billing",
                      is: true,
                    })
                  }
                >
                  <CreditCard className="h-4 w-4 text-slate-400" />
                  <span>Billing & Subscription</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-white/5" />

              <div className="p-1">
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                  onClick={() => authClient.signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out session</span>
                </DropdownMenuItem>
              </div>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
