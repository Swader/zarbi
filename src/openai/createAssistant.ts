import OpenAI from "npm:openai";
import { Assistant } from "npm:openai/resources/beta/assistants";
import { tools } from "../tools/allTools.ts";
import { assistantPrompt } from "../const/prompts/default.ts";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
  const assistant = await client.beta.assistants.create({
    name: "Zarbi",
    instructions: assistantPrompt,
    model: "gpt-4o-mini",
    tools: Object.values(tools).map((tool) => tool.definition),
  });

  return assistant;
}
