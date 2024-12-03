import { Address, parseEther } from "npm:viem";
import { createViemWalletClient } from "../viem/createViemWalletClient.ts";
import { ToolConfig } from "./allTools.ts";

interface SendTransactionArgs {
  to: Address;
  value?: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "send_transaction",
      description: "Send Eth or native chain token to a wallet",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "The address to send the transaction to",
            pattern: "^0x[a-fA-F0-9]{40}$",
          },
          value: {
            type: "string",
            description:
              "The amount of ether to send, in human readable format, not Wei",
            optional: true,
          },
        },
        required: ["to"],
      },
    },
  },
  handler: async ({ to, value }: SendTransactionArgs) => {
    try {
      const client = createViemWalletClient();
      const tx = await client.sendTransaction({
        to: to,
        value: value ? parseEther(value) : undefined,
      });
      return tx;
    } catch (error) {
      throw new Error(`Error sending transaction: ${error}`);
    }
  },
};
