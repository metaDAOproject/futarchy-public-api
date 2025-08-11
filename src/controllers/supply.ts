import type { Request, Response } from "express";
import { log } from "../logger/logger";
import SolanaService from "../services/solana";

const logger = log.child({
  module: "supply controller"
});

class SupplyController {
  private solanaService: SolanaService;

  constructor() {
    this.solanaService = new SolanaService();
  }

  /**
   * Get the circulating supply of the META token
   *
   * Returns:
   * - 200 with circulating supply data if successful
   * - 500 if there's an error fetching the supply
   */
  public getCirculatingSupply = async (req: Request, res: Response) => {
    try {
      if (req.isCoinGecko) {
        logger.info('CoinGecko request for circulating supply');
      }
      
      const circulatingSupply = await this.solanaService.getCirculatingSupply();
      
      res.status(200).json({
        result: circulatingSupply.toString()
      });
    } catch (error) {
      logger.error('Error in getCirculatingSupply:', error);
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch circulating supply",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  /**
   * Get the total supply of the META token
   *
   * Returns:
   * - 200 with total supply data if successful
   * - 500 if there's an error fetching the supply
   */
  public getTotalSupply = async (req: Request, res: Response) => {
    try {
      if (req.isCoinGecko) {
        logger.info('CoinGecko request for total supply');
      }
      
      const totalSupply = await this.solanaService.getTotalSupply();
      
      res.status(200).json({
        result: totalSupply.toString()
      });
    } catch (error) {
      logger.error('Error in getTotalSupply:', error);
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch total supply",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  /**
   * Get both circulating and total supply
   *
   * Returns:
   * - 200 with both supply data if successful
   * - 500 if there's an error fetching the supply
   */
  public getSupplyInfo = async (req: Request, res: Response) => {
    try {
      if (req.isCoinGecko) {
        logger.info('CoinGecko request for supply info');
      }
      
      const supplyInfo = await this.solanaService.getSupplyInfo();
      
      res.status(200).json({
        result: supplyInfo.total.toString()
      });
    } catch (error) {
      logger.error('Error in getSupplyInfo:', error);
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch supply info",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };
}

export default SupplyController;
