"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Github, Chrome, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";



export default function SignIn() {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    setLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px]"
      >
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-white/5 bg-[#0d0d12]/40 p-8 py-12 backdrop-blur-xl">

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1 text-center mb-4">
              <h2 className="text-xl font-bold text-white">Welcome Back</h2>
              <p className="text-xs text-slate-500">Sign in to continue your projects</p>
            </div>

            <Button
              onClick={() => handleSignIn("google")}
              disabled={!!loading}
              variant="outline"
              className="group relative flex h-12 w-full items-center justify-start gap-3 rounded-xl border-white/5 bg-white/5 px-6 font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              {loading === "google" ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              ) : (
                <Chrome className="h-4 w-4 text-red-500 opacity-80" />
              )}
              <span className="text-sm">Continue with Google</span>
            </Button>

            <Button
              onClick={() => handleSignIn("github")}
              disabled={!!loading}
              variant="outline"
              className="group relative flex h-12 w-full items-center justify-start gap-3 rounded-xl border-white/5 bg-white/5 px-6 font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              {loading === "github" ? (
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              ) : (
                <Github className="h-4 w-4 text-white opacity-80" />
              )}
              <span className="text-sm">Continue with GitHub</span>
            </Button>
          </div>

          <div className="mt-2">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              Securely powered by Better Auth
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
