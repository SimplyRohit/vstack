import { NextResponse } from "next/server";
import { ordersController } from "@/service/paypal/paypal";

export async function POST(request: Request) {
  try {
    const item = await request.json();
    if (!item) {
      return NextResponse.json(
        { error: "Invalid order details provided." },
        { status: 400 },
      );
    }
    const data = await createOrder(item);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Order creation failed." },
      { status: 500 },
    );
  }
}

const createOrder = async (item: {
  tokens: number;
  price: string;
  description: string;
}) => {
  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: "5",
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const data = await ordersController.ordersCreate(collect as any);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      error: "Order creation failed.",
    };
  }
};
