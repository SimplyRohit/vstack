"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { user as userTable } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
import { User } from "@/lib/Types";
import { headers } from "next/headers";

export async function GetUser(User: User) {
  try {
    if (!User) {
      return 400;
    }
    const exitinguser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, User.id as string));
    if (exitinguser.length === 0) {
      await db.insert(userTable).values({
        id: User.id as string,
        email: User.email as string,
        name: User.name,
        image: User.image,
        emailVerified: true,
      });
      return 201;
    }
    return 200;
  } catch (error) {
    console.log(error);
    return 401;
  }
}

///////////////////////////////////////////////////////////////////////////

export async function GetTokens() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  try {
    if (!user) {
      return { status: 400 };
    }

    const exitingtokens = await db
      .select({ tokens: userTable.tokens })
      .from(userTable)
      .where(eq(userTable.id, user.id as string));

    return { tokens: exitingtokens[0].tokens, status: 200 };
  } catch (error) {
    return { error, status: 401 };
  }
}

export async function GetUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user?.id) {
    return { status: 400, userId: null };
  }
  return { status: 200, userId: user.id };
}
