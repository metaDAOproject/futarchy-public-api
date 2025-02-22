import type { Request, Response } from "express";
import { pricesStore } from "../db/prices";
import type { APIResponse } from "./api_response";


class PricesController {
  /**
   * Retrieves prices by market account
   *
   * @param req Express request with market account in params
   * @param res Express response
   *
   * Returns:
   * - 404 if prices not found
   * - 200 with prices data if successful
   */
  public getPrices = async (req: Request, res: Response) => {
    try {
      const limit = Math.min(req.query.limit ? parseInt(req.query.limit as string) : 100, 5000);
      const cursor = req.query.cursor ? new Date(req.query.cursor as string) : undefined;
      const marketAcct = req.params.marketAcct;

      const prices = await pricesStore.findByMarketAcct(marketAcct, limit, cursor);
      if (!prices) {
        res.status(404).json({ error: "Prices not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { prices: prices }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Retrieves the latest prices by market account
   *
   * @param req Express request with market account in params
   * @param res Express response
   *
   * Returns:
   * - 404 if prices not found
   * - 200 with prices data if successful
   */
  public getLatestPrices = async (req: Request, res: Response) => {
    try {
      const marketAcct = req.params.marketAcct;
      const limit = Math.min(req.query.limit ? parseInt(req.query.limit as string) : 100, 5000);
      const prices = await pricesStore.findLatestPrices(marketAcct, limit);
      if (!prices) {
        res.status(404).json({ error: "Prices not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { prices: prices }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
 
}

export default PricesController;
