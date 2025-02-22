import type { Request, Response } from "express";

import { type Organization, organizationStore } from "../db/organization";
import type { APIResponse } from "./api_response";

class OrganizationController {


  /**
   * Retrieves an organization by ID
   *
   * @param req Express request with organization ID in params
   * @param res Express response
   *
   * Returns:
   * - 400 if ID invalid
   * - 404 if organization not found
   * - 200 with organization data if successful
   */
  public getOrganization = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      const organization = await organizationStore.findById(id);
      if (!organization) {
        res.status(404).json({ error: "Organization not found" });
        return;
      }

      const response: APIResponse = {
        success: true,
        data: organization
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Retrieves all organizations
   *
   * @param req Express request
   * @param res Express response
   *
   * Returns:
   * - 200 with organizations data if successful
   * - 500 if error
   */
  public getOrganizations = async (req: Request, res: Response) => {
    try {
      const organizations = await organizationStore.findAll();
      const response: APIResponse = {
        success: true,
        data: organizations
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default OrganizationController;
