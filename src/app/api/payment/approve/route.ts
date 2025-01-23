import { NextResponse } from "next/server";
import { ordersController, paymentsController } from "@/service/paypal/paypal"; // Reusable PayPal controller

export async function POST(request: Request) {
  try {
    const orderID = await request.json();
    console.log(orderID);

    if (!orderID) {
      return NextResponse.json({ error: "Missing order ID." }, { status: 400 });
    }

    // Capture PayPal order
    const data = await ordersController.ordersCapture(orderID);

    // if (!dataid || status !== "COMPLETED") {
    //   throw new Error("Order capture failed.");
    // }

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.error("Error capturing order:", error);
    return NextResponse.json(
      { error: "Order capture failed." },
      { status: 500 },
    );
  }
}
