import React from "react";

export const UserMessageContext = React.createContext<{
  UserMessage: string;
  SetUserMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  UserMessage: "",
  SetUserMessage: () => {},
});

export const SandBoxContext = React.createContext<{
  sandBox: { sandBoxType: string; timeStamp: number };
  setsandBox: React.Dispatch<
    React.SetStateAction<{ sandBoxType: string; timeStamp: number }>
  >;
}>({
  sandBox: { sandBoxType: "", timeStamp: 0 },
  setsandBox: () => {},
});

export const AccountBillingContext = React.createContext<{
  accountBilling: { accountBillingType: string; is: boolean };
  setaccountBilling: React.Dispatch<
    React.SetStateAction<{ accountBillingType: string; is: boolean }>
  >;
}>({
  accountBilling: { accountBillingType: "", is: false },
  setaccountBilling: () => {},
});
