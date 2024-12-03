import { createViemWalletClient } from "../viem/createViemWalletClient.ts";
import { createViemPublicClient } from "../viem/createViemPublicClient.ts";
import { ToolConfig } from "./allTools.ts";
import { ERC20_ABI, ERC20_BYTECODE } from "../const/erc20details.ts";

interface DeployErc20Args {
  name: string;
  symbol: string;
  initialSupply?: string;
}

export const deployErc20Tool: ToolConfig<DeployErc20Args> = {
  definition: {
    type: "function",
    function: {
      name: "deploy_erc20",
      description: "Deploy a new ERC20 token contract",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the token (e.g., 'My Token')",
          },
          symbol: {
            type: "string",
            description: "The symbol of the token (e.g., 'MTK')",
          },
          initialSupply: {
            type: "string",
            description: "Initial supply of tokens (default: 1 billion)",
            optional: true,
          },
        },
        required: ["name", "symbol"],
      },
    },
  },
  handler: async ({ name, symbol, initialSupply }: DeployErc20Args) => {
    try {
      const client = createViemWalletClient();
      const publicClient = createViemPublicClient();
      const bytecode = ERC20_BYTECODE;
      const abi = ERC20_ABI;
      const supply = BigInt(initialSupply || 1000000000);

      const hash = await client.deployContract({
        account: client.account,
        abi,
        bytecode,
        args: [name, symbol, supply],
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log(
        "Deployed ERC20 contract at address:",
        receipt.contractAddress,
      );
      return `${name} (${symbol}) token deployed successfully 
      at: ${receipt.contractAddress} with initial supply of ${supply}`;
    } catch (error) {
      throw new Error(`Error deploying ERC20: ${error}`);
    }
  },
};
