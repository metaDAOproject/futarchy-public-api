import type { Request, Response } from "express";
import { performanceStore } from "../db/performance";
import type { APIResponse } from "./api_response";

class PerformanceController {
  /**
   * Retrieves a proposal by ID
   *
   * @param req Express request with proposal ID in params
   * @param res Express response
   *
   * Returns:
   * - 404 if proposal not found
   * - 200 with proposal data if successful
   */
  public getPerformanceByUser = async (req: Request, res: Response) => {
    try {
      const userAcct = req.params.userAcct;
      if (!userAcct || typeof userAcct !== "string") {
        res.status(400).json({ error: "Invalid user account" });
        return;
      }
      const p = await performanceStore.findByUser(userAcct);
      if (!p) {
        res.status(404).json({ error: "User performance not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { performance: p }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Retrieves all active proposals
   *
   * @param req Express request
   * @param res Express response
   *
   * Returns:
   * - 404 if proposal not found
   * - 200 with proposal data if successful
   */
  public getAllPerformance = async (req: Request, res: Response) => {
    try {
      const p = await performanceStore.findAll();
      if (!p) {
        res.status(404).json({ error: "Performances not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { performance: p }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
 
}

export default PerformanceController;
