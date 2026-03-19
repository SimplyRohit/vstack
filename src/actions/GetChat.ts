"use server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/service/Database/index";
import { Chats, user as userTable } from "@/service/Database/schema";
import { FileStructure } from "@/lib/Types";
import { auth } from "@/service/Auth/auth";
import { headers } from "next/headers"

export async function GetChat({
  chatid,
  UserMessage,
  template,
}: {
  chatid: string;
  UserMessage: string;
  template: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;
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
          template,
        });
        return {
          status: 200,
          messages: [],
          files: {},
          template,
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
        template,
      });
      return {
        status: 200,
        messages: [
          {
            role: "user",
            content: UserMessage,
          },
        ],
        files: {},
        template,
      };
    }
    return {
      status: 200,
      messages: existingChat.messages,
      files: existingChat.files,
      template: existingChat.template,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not authenticated", status: 400 };
  }
}

export async function UpdateChat(
  chatid: string,
  message: [],
  file: FileStructure,
) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;
  if (!user) {
    return { status: 400, error: "User not authenticated" };
  }
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(Chats)
        .set({ messages: message, files: file })
        .where(
          and(eq(Chats.userid, user.id as string), eq(Chats.chatid, chatid)),
        );
      await tx
        .update(userTable)
        .set({ tokens: sql`${userTable.tokens} - 1` })
        .where(eq(userTable.id, user.id as string));

      return {
        status: 200,
        message: "Chat updated and tokens subtracted successfully",
      };
    });
  } catch (error) {
    console.log(error);
    return { status: 400, error: "Internal server error" };
  }
}

export async function getAllChats() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;
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

export async function DeleteChat(chatid: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;
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
