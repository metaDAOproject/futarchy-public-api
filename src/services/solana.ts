import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount, getMint } from '@solana/spl-token';
import { log } from '../logger/logger';

const logger = log.child({
  module: "solana service"
});

export class SolanaService {
  private connection: Connection;
  private readonly META_TOKEN_MINT = new PublicKey('METAwkXcqyXKy1AtsSgJ8JiUHwGCafnZL38n3vYmeta');

  constructor() {
    const rpcEndpoint = process.env.RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com';
    this.connection = new Connection(rpcEndpoint, 'confirmed');
    
    logger.info(`Initialized Solana connection with RPC endpoint: ${rpcEndpoint}`);
  }

  /**
   * Get the circulating supply of the META token
   * @returns Promise<number> - The circulating supply with proper decimals
   */
  async getCirculatingSupply(): Promise<number> {
    try {
      const mintInfo = await getMint(this.connection, this.META_TOKEN_MINT);
      const supply = Number(mintInfo.supply);
      const decimals = mintInfo.decimals;
      
      const circulatingSupply = supply / Math.pow(10, decimals);
      
      logger.info(`Circulating supply: ${circulatingSupply} META`);
      return circulatingSupply;
    } catch (error) {
      logger.error('Error fetching circulating supply:', error);
      throw new Error('Failed to fetch circulating supply');
    }
  }

  /**
   * Get the total supply of the META token
   * @returns Promise<number> - The total supply with proper decimals
   */
  async getTotalSupply(): Promise<number> {
    try {
      const mintInfo = await getMint(this.connection, this.META_TOKEN_MINT);
      const supply = Number(mintInfo.supply);
      const decimals = mintInfo.decimals;
      
      const totalSupply = supply / Math.pow(10, decimals);
      
      logger.info(`Total supply: ${totalSupply} META`);
      return totalSupply;
    } catch (error) {
      logger.error('Error fetching total supply:', error);
      throw new Error('Failed to fetch total supply');
    }
  }

  /**
   * Get both circulating and total supply in a single call
   * @returns Promise<{circulating: number, total: number}>
   */
  async getSupplyInfo(): Promise<{circulating: number, total: number}> {
    try {
      const mintInfo = await getMint(this.connection, this.META_TOKEN_MINT);
      const supply = Number(mintInfo.supply);
      const decimals = mintInfo.decimals;
      
      const supplyWithDecimals = supply / Math.pow(10, decimals);
      
      logger.info(`Supply info - Circulating: ${supplyWithDecimals}, Total: ${supplyWithDecimals} META`);
      
      return {
        circulating: supplyWithDecimals,
        total: supplyWithDecimals
      };
    } catch (error) {
      logger.error('Error fetching supply info:', error);
      throw new Error('Failed to fetch supply info');
    }
  }
}

export default SolanaService; 