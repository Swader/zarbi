import OpenAI from "npm:openai";
import { Assistant } from "npm:openai/resources/beta/assistants";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
  const assistant = await client.beta.assistants.create({
    name: "Zarbi",
    instructions: "You are an assistant for executing on-chain operations for the user.",
    model: "gpt-4o-mini",
    tools: [],
  });

  return assistant;
}
