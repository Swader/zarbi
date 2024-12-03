import { createViemWalletClient } from "../viem/createViemWalletClient.ts";
import { ToolConfig } from "./allTools.ts";

export const getWalletAddressTool: ToolConfig<Record<string, never>> = {
  definition: {
    type: "function",
    function: {
      name: "get_wallet_address",
      description: "Get this bot's own wallet address",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  handler: async () => {
    const client = createViemWalletClient();
    return client.account?.address ?? "No wallet configured";
  },
}; 