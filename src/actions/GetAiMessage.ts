"use server";
import { chatSession } from "@/service/Ai";

export async function GetAiMessage(Message: string) {
  try {
    const data = await chatSession.sendMessage(Message);
    if (
      data.response?.candidates &&
      data.response.candidates.length > 0 &&
      data.response.candidates[0].content?.parts &&
      data.response.candidates[0].content.parts.length > 0
    ) {
      return {
        status: 200,
        content: data.response.candidates[0].content.parts[0].text,
      };
    } else {
      throw new Error("Invalid response structure or missing candidates");
    }
  } catch (error) {
    return error;
  }
}
