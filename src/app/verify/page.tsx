"use client";
import { checkUser } from "@/actions/checkUser";
import { useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
export default function Verify() {
  useEffect(() => {
    const Handle = async () => {
      const data = await checkUser();
      console.log(data);
      if (data.status === 400 || data.status === 401) {
        signOut();
        signIn();
      }
      if (data.status === 200 || data.status === 201) {
        window.location.href = "/";
      }
    };
    Handle();
  }, []);
  return (
    <div className="flex w-full h-full flex-grow items-center justify-center">
      <h1> Verifying.....</h1>
    </div>
  );
}
