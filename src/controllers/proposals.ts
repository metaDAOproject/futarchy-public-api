import type { Request, Response } from "express";
import { proposalsStore } from "../db/proposal";
import type { APIResponse } from "./api_response";


class ProposalsController {
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
  public getProposals = async (req: Request, res: Response) => {
    try {
      const p = await proposalsStore.findAll();
      if (!p) {
        res.status(404).json({ error: "Proposal not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { proposals: p }
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
  public getActiveProposals = async (req: Request, res: Response) => {
    try {
      const p = await proposalsStore.findAllActive();
      if (!p) {
        res.status(404).json({ error: "Proposal not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: { proposals: p }
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
 
}

export default ProposalsController;
