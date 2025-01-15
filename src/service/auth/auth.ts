import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "../database";
import { Users } from "../database/schema";
import { eq } from "drizzle-orm";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account || !account.access_token) {
        console.error("Missing access_token or user/account information");
        return false;
      }
      const existingUser = await db
        .select()
        .from(Users)
        .where(eq(Users.userid, `user-${account.providerAccountId}`));

      if (existingUser.length === 0) {
        await db.insert(Users).values({
          email: user.email as string,
          userid: `user-${account.providerAccountId}`,
          name: user.name,
          image: user.image,
        });
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = `user-${account?.providerAccountId}`;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
