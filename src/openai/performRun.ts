import OpenAI from "npm:openai";
import { Run } from "npm:openai/resources/beta/runs/runs";
import { Thread } from "npm:openai/resources/beta/threads/threads";
import { handleRunToolCall } from "./handleRunToolCall.ts";

export async function performRun(
  run: Run,
  client: OpenAI,
  thread: Thread,
): Promise<Run> {
  while (run.status === "requires_action") {
    run = await handleRunToolCall(run, client, thread);
    // Sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (run.status === "failed") {
    const errorMessage = `I encountered an error: ${
      run.last_error?.message || "Unknown error"
    }`;
    console.error(errorMessage);
    await client.beta.threads.messages.create(thread.id, {
      role: "assistant",
      content: errorMessage,
    });
    return {
      type: "text",
      text: {
        value: errorMessage,
        annotations: [],
      },
    };
  }

  const messages = await client.beta.threads.messages.list(thread.id);
  const assistantMessage = messages.data.find(
    (message) => message.role === "assistant",
  );
  return assistantMessage?.content[0] ||
    {
      type: "text",
      text: { value: "No message from assistant", annotations: [] },
    };
}
