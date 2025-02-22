import type { Request, Response } from "express";

import { log } from "../logger/logger";
import { db } from "../db/db";



const logger = log.child({
  module: "proposal controller"
});


class HealthController {
  /**
   * Checks if the server is healthy
   *
   * Returns:
   * - 400 if ID invalid
   * - 404 if proposal not found
   * - 200 with proposal data if successful
   */
  public getHealth = async (req: Request, res: Response) => {
    try {
      const result = await db.selectFrom("proposal_details").selectAll().executeTakeFirst();
      if (!result) {
        res.status(500).json({ message: "Database connection failed" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Database connection failed" });
      return;
    }
    res.status(200).json({ message: "ok" });
  };

 
}

export default HealthController;
