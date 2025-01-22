"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Transaction, Users } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
import crypto from "crypto";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET as string;
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function payment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const Session = await auth();
  const user = Session?.user;
  try {
    if (!user) {
      return {
        message: "user not found ",
        status: 400,
      };
    }
    const signature = generatedSignature(razorpayOrderId, razorpayPaymentId);
    console.log(signature);
    if (signature !== razorpaySignature) {
      return { message: "Invalid request", status: 400 };
    }

    return {
      status: 200,
      OrderId: razorpayOrderId as string,
      PaymentId: razorpayPaymentId as string,
      Signature: razorpaySignature as string,
    };
  } catch (error) {
    console.error(error);
    return { status: 400 };
  }
}

export async function updateTokens({
  tokens,
  OrderId,
  PaymentId,
  Signature,
}: {
  tokens: number;
  OrderId: string;
  PaymentId: string;
  Signature: string;
}) {
  const currentUser = await auth();
  const user = currentUser?.user;
  try {
    if (!user) {
      return { status: 400, error: "User not authenticated" };
    }
    await db.transaction(async (tx) => {
      await tx.insert(Transaction).values({
        orderid: OrderId,
        paymentid: PaymentId,
        signature: Signature,
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
