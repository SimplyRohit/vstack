"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Transaction, Users } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";

export async function updateTokens({
  tokens,
  orderId,
  paymentId,
  payerId,
}: {
  tokens: number;
  orderId: string;
  paymentId: string;
  payerId: string;
}) {
  const currentUser = await auth();
  const user = currentUser?.user;
  try {
    if (!user) {
      return { status: 400, error: "User not authenticated" };
    }
    await db.transaction(async (tx) => {
      await tx.insert(Transaction).values({
        orderid: orderId,
        paymentid: paymentId,
        payerid: payerId,
        tokenupdated: tokens,
        createdAt: new Date().toISOString(),
        userid: user.id,
      });

      await tx
        .update(Users)
        .set({
          tokens: sql`${Users.tokens} + ${tokens}`,
        })
        .where(eq(Users.userid, user.id as string));
    });
    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return { error: "User not authenticated", status: 400 };
  }
}
