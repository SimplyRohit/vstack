import { codeSession } from "@/service/Ai";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const data = await codeSession.sendMessage(message);
    return NextResponse.json({
      status: 200,
      content: data.response.text(),
    });
  } catch (error) {
    console.error("Error in AI code generation:", error);
    return NextResponse.json(
      {
        status: 400,
        content: "Failed to generate AI code",
      },
      { status: 400 },
    );
  }
}
