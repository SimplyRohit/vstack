"use client";
import { GetUser } from "@/actions/GetUser";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function Verify() {
  const [state, setState] = useState("loading");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const handle = async () => {
      const data = await GetUser();
      if (data.status === 400 || data.status === 401) {
        // signOut();
        setState("failed");
        return;
      }
      if (data.status === 200 || data.status === 201) {
        window.location.href = "/";
      }
    };
    handle();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (state === "failed") {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            window.location.href = "/";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state]);

  return (
    <div className="flex w-full h-full flex-grow items-center justify-center">
      <h1 className="text-center">
        {state === "failed"
          ? `Failed to login.
           Redirecting to home page in ${countdown}.`
          : "Loading......"}
      </h1>
    </div>
  );
}
