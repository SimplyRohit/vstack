"use client";

import React from "react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function SignInPage() {
  const handleSignIn = async (provider: "github" | "google") => {
    await signIn.social({
      provider,
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full flex-grow">
      <div className="flex w-[400px] flex-col rounded-xl border border-[#3a3a3a] bg-[#1a1a1a]/50 p-8 shadow-2xl backdrop-blur-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Sign in to <span className="font-syne">Vstack</span>
        </h1>

        <p className="mb-8 text-center text-sm text-gray-400">
          Choose your preferred provider to continue building.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-3 border-[#3a3a3a] bg-transparent py-6 text-white hover:bg-[#3a3a3a]"
            onClick={() => handleSignIn("github")}
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-3 border-[#3a3a3a] bg-transparent py-6 text-white hover:bg-[#3a3a3a]"
            onClick={() => handleSignIn("google")}
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Continue with Google
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
