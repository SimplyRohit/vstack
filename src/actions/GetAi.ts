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
      content: "Failed to generate AI code",
    };
  }
}

export async function GetAiCode(Message: string) {
  try {
    const data = await codeSession.sendMessage(Message);
    return {
      status: 200,
      content: JSON.parse(data.response.text()),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      content: "Failed to generate AI code",
    };
  }
}
