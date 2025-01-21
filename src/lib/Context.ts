import React from "react";

export const UserMessageContext = React.createContext<{
  UserMessage: string;
  SetUserMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  UserMessage: "",
  SetUserMessage: () => {},
});

export const IsLoginContext = React.createContext<{
  IsLogin: boolean;
  SetIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  IsLogin: false,
  SetIsLogin: () => {},
});
