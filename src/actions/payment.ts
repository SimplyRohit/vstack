"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Transaction, user as userTable } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
import { headers } from "next/headers";

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
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;
  try {
    if (!user) {
      return { status: 400, error: "User not authenticated" };
    }
    await db.transaction(async (tx) => {
      await tx.insert(Transaction).values({
        id: crypto.randomUUID(),
        orderid: orderId,
        paymentid: paymentId,
        payerid: payerId,
        tokenupdated: tokens,
        userid: user.id,
      });

      await tx
        .update(userTable)
        .set({
          tokens: sql`${userTable.tokens} + ${tokens}`,
        })
        .where(eq(userTable.id, user.id as string));
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
