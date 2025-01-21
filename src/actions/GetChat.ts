"use server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Chats } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";

/////////////////////////////////////////////////////////////////////////////////

export async function GetChat({
  chatid,
  UserMessage,
}: {
  chatid: string;
  UserMessage: string;
}) {
  const currentUser = await auth();
  const user = currentUser?.user;
  const date = new Date().toISOString();
  try {
    if (!user) {
      return { status: 400, error: "User not authenticated" };
    }

    const existingChat = await db.query.Chats.findFirst({
      where:
        eq(Chats.userid, user.id as string) &&
        eq(Chats.chatid, chatid as string),
    });

    if (!existingChat) {
      if (UserMessage === "") {
        await db.insert(Chats).values({
          chatid,
          userid: user.id as string,
        });
        return {
          status: 201,
          messages: [],
          files: {},
        };
      }
      await db.insert(Chats).values({
        chatid,
        userid: user.id as string,
        messages: [
          {
            role: "user",
            content: UserMessage,
          },
        ],
      });
      return {
        status: 201,
        messages: [
          {
            role: "user",
            content: UserMessage,
          },
        ],
        files: {},
      };
    }
    return {
      status: 200,
      messages: existingChat.messages,
      files: existingChat.files,
    };
  } catch (error) {
    return { error, status: 401 };
  }
}

export async function UpdateChat(chatid: string, message: [], file: {}) {
  const currentUser = await auth();
  const user = currentUser?.user;
  if (!user) {
    return { status: 400, error: "User not authenticated" };
  }

  try {
    await db
      .update(Chats)
      .set({ messages: message, files: file })
      .where(
        and(eq(Chats.userid, user.id as string), eq(Chats.chatid, chatid))
      );
  } catch (error) {
    console.log(error);
    return error;
  }
}
