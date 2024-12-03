import OpenAI from "npm:openai";
import { Run } from "npm:openai/resources/beta/runs/runs";
import { Thread } from "npm:openai/resources/beta/threads/threads";
import { tools } from "../tools/allTools.ts";

export async function handleRunToolCall(
  run: Run,
  client: OpenAI,
  thread: Thread,
): Promise<Run> {
  const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;
  if (!toolCalls) return run;
  const toolOutputs = await Promise.all(
    toolCalls.map(async (tool) => {
      const toolConfig = tools[tool.function.name];
      if (!toolConfig) {
        console.error(`Tool ${tool.function.name} not found`);
        return null;
      }

      console.log("Running tool: ", tool.function.name);
      try {
        const args = JSON.parse(tool.function.arguments);
        const output = await toolConfig.handler(args);
        console.log(`Tool ${tool.function.name} returned:`);
        console.log(output);
        return {
          tool_call_id: tool.id,
          output: String(output),
        };
      } catch (error) {
        throw new Error(`Error calling tool ${tool.function.name}: ${error}`);
      }
    })
  )

  const validOutputs = toolOutputs.filter(Boolean) as OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[];
  if (validOutputs.length === 0) return run;

  return client.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
    tool_outputs: validOutputs,
  });
}
