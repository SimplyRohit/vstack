"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/database/index";
import { Users } from "@/service/database/schema";
import { auth } from "@/service/auth/auth";
export async function checkUser() {
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
      console.log("newUser");
      return { newUser, status: 201 };
    }
    console.log("exitinguser");
    return { exitinguser, status: 200 };
  } catch (error) {
    console.log("error");
    return { error, status: 401 };
  }
}
