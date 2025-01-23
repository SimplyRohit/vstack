import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET!,
  trustHost: true,

  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = `user-${account?.providerAccountId}`;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl + "/verify";
    },
  },
});
