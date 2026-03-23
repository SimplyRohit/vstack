import { auth } from "@/service/Auth/auth";
import { GetTokens } from "@/actions/GetUser";
import { UpdateChat } from "@/actions/GetChat";
import { headers } from "next/headers";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userPrompt, chatid, previousMessages } = await req.json();

    const tokenStatus = await GetTokens();
    if (tokenStatus.status !== 200 || !tokenStatus.tokens || tokenStatus.tokens <= 0) {
      return new Response("Insufficient tokens", { status: 402 });
    }

    // Convert previous messages to ai sdk format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedMessages = previousMessages.map((m: any) => ({
      role: m.role as "user" | "assistant",
      content: m.content
    }));

    // Add the current prompt
    formattedMessages.push({ role: "user", content: userPrompt });

    // Stream text using Vercel AI SDK! This handles the 10s timeout gracefully.
    const result = streamText({
      model: google("gemini-3.1-flash-lite-preview"),
      messages: formattedMessages,
      async onFinish({ text }) {
        try {
          // Once the stream finishes completely, parse the output JSON to update the DB
          const parsedData = JSON.parse(text);
          const aiContent = parsedData.explanation || "Project generated successfully!";
          const files = parsedData.files || {};

          const aiMessage = {
            role: "assistant",
            content: aiContent,
          };

          const updatedMessages = [...previousMessages, aiMessage];
          await UpdateChat(chatid, updatedMessages as [], files);
        } catch (e) {
          console.error("Failed to parse AI JSON for DB update:", e);
        }
      }
    });

    // Return a standard text stream readable by the client
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI Gateway Route Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
