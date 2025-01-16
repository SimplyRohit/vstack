"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/database/index";
import { Users } from "@/service/database/schema";
import { auth } from "@/service/auth/auth";
export async function findUser() {
  const currentUser = await auth();
  const user = currentUser?.user;
  try {
    if (!user) {
      return "user and account not found";
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
      return newUser;
    }
    console.log("exitinguser");
    return exitinguser;
  } catch (error) {
    console.log("error");
    return error;
  }
}
