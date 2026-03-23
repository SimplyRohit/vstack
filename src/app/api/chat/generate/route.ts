import { auth } from "@/service/Auth/auth";
import { GetTokens } from "@/actions/GetUser";
import { UpdateChat } from "@/actions/GetChat";
import { headers } from "next/headers";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
});

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
        const formattedMessages = previousMessages.map((m: any) => ({
            role: m.role as "user" | "assistant",
            content: m.content
        }));

        formattedMessages.push({ role: "user", content: userPrompt });

        const result = streamText({
            model: google("gemini-3.1-flash-lite-preview"),
            messages: formattedMessages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Gateway Route Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
