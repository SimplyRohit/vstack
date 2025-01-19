import { TrendingUpDown } from "lucide-react";
import React from "react";

export const UserMessageContext = React.createContext<{
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  userMessage: "",
  setUserMessage: () => {},
});

export const IsLoginContext = React.createContext<{
  IsLogin: boolean;
  SetIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  IsLogin: false,
  SetIsLogin: () => {},
});
