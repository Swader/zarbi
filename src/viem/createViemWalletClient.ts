import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from "viem/accounts";
import { polygonAmoy } from 'viem/chains'
 
export function createViemWalletClient() {
    if (!Deno.env.get("PRIVATE_KEY")) {
        throw new Error("PRIVATE_KEY is not set");
    }
    const account = privateKeyToAccount(Deno.env.get("PRIVATE_KEY") as `0x${string}`);
  return createWalletClient({
    account,
    chain: polygonAmoy,
    transport: http()
  })
}