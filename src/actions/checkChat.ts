"use server";
import { and, eq } from "drizzle-orm";
import { db } from "@/service/database/index";
import { Users, Chats } from "@/service/database/schema";
import { auth } from "@/service/auth/auth";
export async function CheckChat(chatid: string) {
  const currentUser = await auth();
  const user = currentUser?.user;
  const date = new Date().toISOString();
  try {
    if (!user) {
      return { status: 401 };
    }

    const existingChat = await db
      .select()
      .from(Chats)
      .where(
        and(eq(Chats.userid, user.id as string), eq(Chats.chatid, chatid))
      );

    console.log(existingChat);

    if (existingChat.length === 0) {
      const newChat = await db.insert(Chats).values({
        chatid,
        userid: currentUser?.user?.id as string,
        messages: [],
      });
      return {
        status: 201,
        newChat: {
          chatid,
          userid: user.id,
          message: "",
          date: new Date().toISOString(),
        },
      };
    }
    return {
      status: 200,
      existingChat,
    };
  } catch (error) {
    console.log("error");
    return { error, status: 401 };
  }
}

export async function MakeChat({
  chatid,
  chatmessage,
  role,
}: {
  chatid: string;
  chatmessage: string;
  role: string;
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
      messages: [{ role, chatmessage, date }],
    });

    return { status: 200, message: "Chat saved successfully." };
  } catch (error) {
    console.error("Error saving chat:", error);
    return { status: 500, error: "Failed to save chat." };
  }
}
