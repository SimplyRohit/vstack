"use server";
import * as schema from "@/service/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/service/database/index";
import { Users } from "@/service/database/schema";

export async function findUser(user: any, account: any) {
  if (!user && !account) {
    return "user and account not found";
  }

  const exitinguser = await db
    .select()
    .from(Users)
    .where(eq(Users.id as any, `user-${account?.providerAccountId}`));

  if (exitinguser.length > 1) {
    return exitinguser;
  }

  const newUser = await db.insert(schema.Users).values({
    email: user.email,
    userid: `user-${account?.providerAccountId}`,
    name: user.name,
    image: user.image,
  });

  return newUser;
}
