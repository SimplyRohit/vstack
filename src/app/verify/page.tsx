"use server";
import { GetUser } from "@/actions/GetUser";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Loader } from "lucide-react";

export default function Verify() {
  useEffect(() => {
    const handle = async () => {
      const data = await GetUser();
      if (data.status === 400 || data.status === 401) {
        signOut();
        return;
      }
      if (data.status === 200 || data.status === 201) {
        window.location.href = "/";
      }
    };
    handle();
  }, []);

  return (
    <div className="flex h-full w-full flex-grow items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
