"use server";
import { db } from "@/service/Database/index";
import { Chats } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";

export async function MakeChat({
  chatid,
  message,
}: {
  chatid: string;
  message: {
    role: string;
    content: string;
  };
}) {
  const currentUser = await auth();
  const user = currentUser?.user;
  const date = new Date().toISOString();

  try {
    if (!user) {
      return { status: 400, error: "User not authenticated" };
    }

    await db.insert(Chats).values({
      chatid,
      userid: user.id,
      messages: message,
    });

    return { status: 200, message: "Chat saved successfully." };
  } catch (error) {
    console.error("Error saving chat:", error);
    return { status: 500, error: "Failed to save chat." };
  }
}
