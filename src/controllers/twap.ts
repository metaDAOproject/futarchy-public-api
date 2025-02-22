import type { Request, Response } from "express";
import { twapStore } from "../db/twap";
import type { APIResponse } from "./api_response";


class TwapController {
  /**
   * Retrieves a twap by market account
   *
   * @param req Express request with market account in params
   * @param res Express response
   *
   * Returns:
   * - 404 if twap not found
   * - 200 with twap data if successful
   */
  public getTwap = async (req: Request, res: Response) => {
    try {
      const limit = Math.min(req.query.limit ? parseInt(req.query.limit as string) : 100, 5000);
      const cursor = req.query.cursor ? new Date(req.query.cursor as string) : undefined;
      const marketAcct = req.params.marketAcct;

      const twap = await twapStore.findByMarketAcct(marketAcct, limit, cursor);
      if (!twap) {
        res.status(404).json({ error: "Prices not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { twap: twap }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Retrieves the latest twap by market account
   *
   * @param req Express request with market account in params
   * @param res Express response
   *
   * Returns: 
   * - 404 if twap not found
   * - 200 with twap data if successful
   */
  public getLatestTwap = async (req: Request, res: Response) => {
    try {
      const marketAcct = req.params.marketAcct;
      const limit = Math.min(req.query.limit ? parseInt(req.query.limit as string) : 100, 5000);
      const twap = await twapStore.findLatestTwap(marketAcct, limit);
      if (!twap) {
        res.status(404).json({ error: "Prices not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { twap: twap }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
 
}

export default TwapController;
