import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID_TEST,
      clientSecret: process.env.GITHUB_SECRET_TEST,
    }),
    Google({
      clientId: process.env.GOOGLE_ID_TEST,
      clientSecret: process.env.GOOGLE_SECRET_TEST,
    }),
  ],
} satisfies NextAuthConfig;
