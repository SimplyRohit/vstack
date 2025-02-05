"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Users } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
import { User } from "@/lib/Types";

///////////////////////////////////////////////////////////////////////////
export async function GetUser(User: User) {
  try {
    if (!User) {
      return 400;
    }
    const exitinguser = await db
      .select()
      .from(Users)
      .where(eq(Users.userid, User.id as string));
    if (exitinguser.length === 0) {
      await db.insert(Users).values({
        email: User.email as string,
        userid: User.id as string,
        name: User.name,
        image: User.image,
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
  const currentUser = await auth();
  const user = currentUser?.user;
  try {
    if (!user) {
      return { status: 400 };
    }

    const exitingtokens = await db
      .select({ tokens: Users.tokens })
      .from(Users)
      .where(eq(Users.userid, currentUser?.user?.id as string));

    return { tokens: exitingtokens[0].tokens, status: 200 };
  } catch (error) {
    return { error, status: 401 };
  }
}
