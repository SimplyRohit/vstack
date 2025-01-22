import { NextResponse } from "next/server";
import { razorpay } from "@/service/Payment/razorpay";

export async function POST(request: Request) {
  const { price } = await request.json();
  const amount = price * 100;
  try {
    const order = await razorpay.orders.create({
      amount: amount,
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
