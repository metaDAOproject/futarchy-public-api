import express from "express";

import ProposalsController from "../controllers/proposals";

const router = express.Router();
export default router;

const proposalController = new ProposalsController();

router.get("/", proposalController.getProposals);
router.get("/active", proposalController.getActiveProposals);
