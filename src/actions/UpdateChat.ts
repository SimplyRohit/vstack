"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Chats } from "@/service/Database/schema";

export async function UpdateChat(chatid: string) {
  try {
    const data = await db
      .update(Chats)
      .set({ messages: { role: "user", content: "test" } })
      .where(eq(Chats.chatid, chatid))
      .returning();
  } catch (error) {
    return { error, status: 401 };
  }
}
