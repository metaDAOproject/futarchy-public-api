import express from "express";

import OrganizationController from "../controllers/organization";

const router = express.Router();
export default router;

const organizationController = new OrganizationController();

router.get("/", organizationController.getOrganizations);
router.get("/:id", organizationController.getOrganization);