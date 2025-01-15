import { NextResponse } from "next/server";
import { razorpay } from "@/service/payment/razorpay";

export async function POST() {
  try {
    const order = await razorpay.orders.create({
      amount: 800,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json({
      order,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      status: 400,
    });
  }
}
