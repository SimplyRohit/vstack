import { Trash, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import React from "react";
import { AccountBillingContext } from "@/lib/Context";

export default function AccountBilling() {
  const { accountBilling, setaccountBilling } = React.useContext(
    AccountBillingContext,
  );
  const user = useSession().data?.user;
  return (
    <div className="absolute z-30 flex h-full w-full items-center justify-center backdrop-blur-sm">
      <div className="w-[480px] rounded-xl border border-[#3a3a3a] bg-[#262626] p-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg opacity-50">
            {accountBilling.accountBillingType === "account"
              ? "Account"
              : "Billing"}
          </h1>
          <X
            onClick={() =>
              setaccountBilling({
                accountBillingType: "",
                is: false,
              })
            }
            className="cursor-pointer opacity-50"
          />
        </div>
        {accountBilling.accountBillingType === "account" ? (
          <div className="mt-6 flex w-full flex-col">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-base font-bold opacity-70">Name</h1>
              <h1 className="truncate text-sm">{user?.name}</h1>
            </div>
            <Separator className="my-3 bg-white opacity-20" />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-base font-bold opacity-70">Email</h1>
              <h1 className="truncate text-sm">{user?.email}</h1>
            </div>
            <Separator className="my-3 bg-white opacity-20" />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-base font-bold opacity-70">Phone number</h1>
              <h1 className="text-sm">-</h1>
            </div>
            <Separator className="my-3 bg-white opacity-20" />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-base font-bold opacity-70">Terms of Use</h1>
              <Button
                size={"sm"}
                variant={"secondary"}
                className="rounded-xl text-sm hover:bg-[#3a3a3a]"
              >
                view
              </Button>
            </div>
            <Separator className="my-3 bg-white opacity-20" />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-base font-bold opacity-70">Privacy Policy</h1>
              <Button
                size={"sm"}
                variant={"secondary"}
                className="rounded-xl text-sm hover:bg-[#3a3a3a]"
              >
                view
              </Button>
            </div>
            <Separator className="my-3 bg-white opacity-20" />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-base font-bold opacity-70">Delete account</h1>
              <Button
                size={"sm"}
                variant={"secondary"}
                className="mr-2 rounded-xl bg-[#b84e4e] text-sm hover:bg-[#c24848]"
              >
                <Trash />
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="my-6">Coming soooon</h1>
        )}
      </div>
    </div>
  );
}
