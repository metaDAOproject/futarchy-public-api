import express from "express";

import PricesController from "../controllers/prices";

const router = express.Router();
export default router;

const pricesController = new PricesController();

router.get("/:marketAcct", pricesController.getPrices);
router.get("/:marketAcct/latest", pricesController.getLatestPrices);