import { AssistantResponse, type Message } from "ai";
import OpenAI from "openai";

const openai = new OpenAI();

export const maxDuration = 30;

export async function POST(req: Request) {
	// Parse the request body
	const input: {
		threadId: string | null;
	} = await req.json();

	// TODO get messages from openai and convert them to Vercel AI SDK's Message format

	const messages: Message[] = [
		{
			id: "1",
			role: "user",
			content: "Hello world",
		},
		{
			id: "2",
			role: "assistant",
			content: "Hello!",
		},
	];

	return Response.json(messages);
}
