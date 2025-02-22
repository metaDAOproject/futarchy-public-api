import type { Request, Response } from "express";
import { tradesStore } from "../db/trades";
import type { APIResponse } from "./api_response";

class TradesController {
  public getTrades = async (req: Request, res: Response) => {
    const marketAcct = req.params.marketAcct;
    const limit = Math.min(req.query.limit ? parseInt(req.query.limit as string) : 100, 5000);
    const cursor = req.query.cursor ? new Date(req.query.cursor as string) : undefined;

    const trades = await tradesStore.findByMarketAcct(marketAcct, limit, cursor);
    const response: APIResponse = {
      success: true,
      data: { trades: trades }
    };
    res.json(response);
  };
}

export default TradesController;
