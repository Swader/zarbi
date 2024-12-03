import { getBalanceTool } from "./getBalance.ts";
import { getWalletAddressTool } from "./getWalletAddress.ts";
import { sendTransactionTool } from "./sendTransaction.ts";
import { deployErc20Tool } from "./deployErc20.ts";
export interface ToolConfig<T = any> {
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };
  handler: (args: T) => Promise<any>;
}
export const tools: Record<string, ToolConfig> = {
  // Add more tools here
  // Up to 128 tools per assistant
  get_balance: getBalanceTool,
  get_wallet_address: getWalletAddressTool,
  send_transaction: sendTransactionTool,
  deploy_erc20: deployErc20Tool,
};
