import { createPublicClient, http } from 'viem'
import { polygonAmoy } from 'viem/chains'

export function createViemPublicClient() {  
  return createPublicClient({ 
    chain: polygonAmoy,
    transport: http()
  })
}