"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { user as userTable } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
import { User } from "@/lib/Types";
import { headers } from "next/headers";



export async function GetTokens() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;
  try {
    if (!user) {
      return { status: 400 };
    }

    const exitingtokens = await db
      .select({ tokens: userTable.tokens })
      .from(userTable)
      .where(eq(userTable.id, user.id as string));

    if (exitingtokens.length === 0) {
      return { tokens: 0, status: 200 };
    }

    return { tokens: exitingtokens[0].tokens, status: 200 };
  } catch (error) {
    return { error, status: 401 };
  }
}
