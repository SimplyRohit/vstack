"use server";
import { chatSession, codeSession } from "@/service/Ai";

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
      content: "Failed to generate AI response",
    };
  }
}

export async function GetAiCode(Message: string) {
  try {
    const data = await codeSession.sendMessage(Message);
    const content = data.response.text();

    return {
      status: 200,
      content: content,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      content: "Failed to generate AI code",
    };
  }
}
