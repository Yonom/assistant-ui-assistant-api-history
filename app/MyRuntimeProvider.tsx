"use client";

import { useAssistant } from "@ai-sdk/react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useVercelUseAssistantRuntime } from "@assistant-ui/react-ai-sdk";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const getMessagesFromStorage = async (threadId: string) => {
	const res = await fetch("/api/history", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			threadId,
		}),
	});
	const messages = await res.json();
	return messages;
};

export function MyRuntimeProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const params = useSearchParams();
	const threadId = params.get("threadId") ?? undefined;

	const assistant = useAssistant({
		api: "/api/assistant",
		threadId,
	});

	useEffect(() => {
		if (!threadId) return;

		// load messages from server
		getMessagesFromStorage(threadId ?? "").then((messages) => {
			console.log("messages", messages);
			// set messages
			assistant.setMessages(messages);
		});
	}, [threadId, assistant.setMessages]);

	const runtime = useVercelUseAssistantRuntime(assistant);

	return (
		<AssistantRuntimeProvider runtime={runtime}>
			{children}
		</AssistantRuntimeProvider>
	);
}
