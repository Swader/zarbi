# OpenAI Assistant Essentials

These files allow you to create an assistant which is a custom-runnable tool on
OpenAI's platform.

The file `createAssistant.ts` allows you to create an assistant who will listen
for a thread.

The file `createThread.ts` allows you to create a thread, which is a container for
messages.

The file `createRun.ts` allows you to create a run, which is an execution of an
assistant on a thread if identified as needed.

The file `performRun.ts` allows the assistant to perform a run if one was
identified as needed.

The file `handleRunFunctionCall.ts` allows the assistant to handle a tool call
if one was identified as needed during a run.

To learn more about the full flow, see the
[docs](https://platform.openai.com/docs/assistants/overview).
