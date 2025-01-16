import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Bell,
  SquareActivity,
  Brain,
} from "lucide-react";
export const MainContentMenu = [
  {
    title: "Dashboard",
    url: "#",
    icon: SquareTerminal,
    pathname: "home",
  },
  {
    title: "My Library",
    url: "#",
    icon: Bot,
    pathname: "my-library",
  },
  {
    title: "Shared Library",
    url: "#",
    icon: BookOpen,
    pathname: "shared-library",
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
    pathname: "notifications",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    pathname: "setting",
  },
];

export const MainContentPro = [
  {
    title: "Discord",
    url: "#",
    icon: SquareActivity,
    pathname: "discord",
  },
  {
    title: "pro Ai",
    url: "#",
    icon: Brain,
    pathname: "ai",
  },
];

export const AdminContentMenu = [
  {
    title: "Admin Dashboard",
    url: "#",
    icon: SquareTerminal,
    pathname: "admin-dashboard",
  },
  {
    title: "Users",
    url: "#",
    icon: Bot,
    pathname: "users",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    pathname: "admin-setting",
  },
];
