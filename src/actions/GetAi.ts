"use server";
import { chatSession, codeSession } from "@/service/Ai";
import { GetTokens } from "./GetUser";
import { UpdateChat } from "./GetChat";
import { auth } from "@/service/Auth/auth";
import { headers } from "next/headers";
import { React_Chat_Prompt, React_Code_Prompt } from "@/lib/Constant";
import { FileStructure, Message } from "@/lib/Types";

export async function GetAiMessage(Message: string) {
  try {
    const data = await chatSession.sendMessage(Message);
    return {
      status: 200,
      content: data.response.text(),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      content: "Failed to generate AI code",
    };
  }
}

export async function ProcessChat({
  chatid,
  messages,
}: {
  chatid: string;
  messages: Message[];
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    return { status: 400, error: "User not authenticated" };
  }

  try {
    const tokenStatus = await GetTokens();
    if (tokenStatus.status !== 200 || (tokenStatus.tokens ?? 0) <= 0) {
      return { status: 403, error: "No tokens left" };
    }

    const userChat = messages[messages.length - 1].content;

    const aiResponse = await GetAiMessage(userChat + React_Chat_Prompt);
    if (aiResponse.status !== 200) {
      return { status: 400, error: "Failed to generate AI response" };
    }

    const aiMessage: Message = {
      role: "assistant",
      content: aiResponse.content,
    };
    const updatedMessages = [...messages, aiMessage];

    const codePrompt = userChat + "" + React_Code_Prompt;
    const codeResult = await codeSession.sendMessage(codePrompt);
    const codeText = codeResult.response.text();
    const parsedData = JSON.parse(codeText);
    const newFiles = parsedData.files as FileStructure;

    await UpdateChat(chatid, updatedMessages as [], newFiles);

    return {
      status: 200,
      messages: updatedMessages,
      files: newFiles,
    };
  } catch (error) {
    console.error("Error in ProcessChat:", error);
    return { status: 500, error: "Internal server error" };
  }
}
