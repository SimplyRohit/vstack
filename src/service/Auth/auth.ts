import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { GetUser } from "@/actions/GetUser";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET!,
  trustHost: true,

  callbacks: {
    async signIn({ account, user }) {
      const User = {
        email: user?.email as string,
        name: user?.name as string,
        image: user?.image as string,
        id: `user-${account?.providerAccountId}`,
      };
      const verify = await GetUser(User);
      if (verify === 400 || verify === 401) {
        return false;
      }
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
      return baseUrl;
    },
  },
});
