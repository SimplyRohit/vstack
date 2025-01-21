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
