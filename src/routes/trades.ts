import express from "express";

import TradesController  from "../controllers/trades";

const router = express.Router();
export default router;

const tradesController = new TradesController();

router.get("/:marketAcct",tradesController.getTrades);
