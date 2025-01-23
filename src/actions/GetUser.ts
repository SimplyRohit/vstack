"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Users } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";

///////////////////////////////////////////////////////////////////////////
export async function GetUser() {
  const currentUser = await auth();
  const user = currentUser?.user;
  try {
    if (!user) {
      return { status: 400 };
    }

    const exitinguser = await db
      .select()
      .from(Users)
      .where(eq(Users.userid, currentUser?.user?.id as string));
    console.log(exitinguser);
    if (exitinguser.length === 0) {
      await db.insert(Users).values({
        email: user.email as string,
        userid: currentUser?.user?.id as string,
        name: user.name,
        image: user.image,
      });
      return { status: 201 };
    }
    return { exitinguser, status: 200 };
  } catch (error) {
    console.log(error);
    return { error, status: 401 };
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
