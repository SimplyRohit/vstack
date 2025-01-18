"use server";
import { eq } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Chats } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
export async function GetChat(chatid: string) {
  const currentUser = await auth();
  const user = currentUser?.user;
  const date = new Date().toISOString();
  try {
    if (!user) {
      return { status: 401 };
    }

    const existingChat = await db.query.Chats.findFirst({
      where: eq(Chats.chatid, chatid as string),
    });

    if (!existingChat) {
      const newChat = await db.insert(Chats).values({
        chatid,
      });
      return {
        status: 201,
        Chat: null,
      };
    }
    return {
      status: 200,
      Chat: existingChat.messages,
    };
  } catch (error) {
    return { error, status: 401 };
  }
}
