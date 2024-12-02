import OpenAI from "npm:openai";
import { createThread } from "./openai/createThread.ts";
import { createRun } from "./openai/createRun.ts";
import { performRun } from "./openai/performRun.ts";
import { createAssistant } from "./openai/createAssistant.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const client = new OpenAI();
  const message = "Hello, how are you?";
  const assistant = await createAssistant(client);
  const thread = await createThread(client, message);
  const run = await createRun(client, thread, assistant.id);
  const result = await performRun(run, client, thread);
  console.log(result);
}
