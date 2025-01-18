"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Users } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
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

    if (exitinguser.length === 0) {
      const newUser = await db.insert(Users).values({
        email: user.email as string,
        userid: currentUser?.user?.id as string,
        name: user.name,
        image: user.image,
      });
      return { status: 201 };
    }
    return { exitinguser, status: 200 };
  } catch (error) {
    return { error, status: 401 };
  }
}
