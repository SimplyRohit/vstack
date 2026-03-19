import { BadgeCheck, CreditCard, LogOut, Sparkles } from "lucide-react";
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
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { AccountBillingContext, SandBoxContext } from "@/lib/Context";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavbarAvatar() {
  const { setaccountBilling } = React.useContext(AccountBillingContext);
  const router = useRouter();

  const { setsandBox } = React.useContext(SandBoxContext);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSandbox = (sandBox: string) => {
    setsandBox({
      sandBoxType: sandBox,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className={cn("flex h-full w-full items-center justify-end gap-3")}>
      {pathname.startsWith("/chat") && (
        <>
          <Button
            onClick={() => handleSandbox("deploy")}
            size={"default"}
            variant="secondary"
            className={cn("0 rounded-[3px]")}
          >
            Deploy
          </Button>

          <Button
            onClick={() => handleSandbox("export")}
            size={"default"}
            variant="secondary"
            className={cn("rounded-[3px]")}
          >
            Export
          </Button>
        </>
      )}
      {!user ? (
        <Button
          onClick={() => router.push("/sign-in")}
          size={"default"}
          variant="secondary"
          className={cn("mr-6 mt-2 rounded-[3px]")}
        >
          Sign-In
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="mr-6 mt-2 border border-[#3a3a3a]">
              <AvatarImage src={user?.image as string} alt={"Avatar"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-xl border border-[#3a3a3a] bg-transparent backdrop-blur-3xl"
            side={"left"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => (window.location.href = "/tokens")}
              >
                <Sparkles />
                Buy Tokens
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  setaccountBilling({
                    accountBillingType: "account",
                    is: true,
                  })
                }
              >
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setaccountBilling({
                    accountBillingType: "billing",
                    is: true,
                  })
                }
              >
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
