"use server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Chats } from "@/service/Database/schema";
import { auth } from "@/service/Auth/auth";
import { error } from "console";

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
          files: {},
          messages: [],
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
        files: {},
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
        and(eq(Chats.userid, user.id as string), eq(Chats.chatid, chatid)),
      );
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllChats() {
  const currentUser = await auth();
  const user = currentUser?.user;
  if (!user) {
    return 400;
  }
  try {
    const data = await db
      .select({ chatid: Chats.chatid })
      .from(Chats)
      .where(eq(Chats.userid, user.id as string));

    return data;
  } catch (error) {
    console.log(error);
    return 400;
  }
}

export async function DeleteChat(chatid: string): Promise<number> {
  const currentUser = await auth();
  const user = currentUser?.user;
  if (!user) {
    return 400;
  }
  try {
    await db
      .delete(Chats)
      .where(
        and(eq(Chats.userid, user.id as string), eq(Chats.chatid, chatid)),
      );

    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  }
}
