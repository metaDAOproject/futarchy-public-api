import express from "express";

import TwapController from "../controllers/twap";

const router = express.Router();
export default router;

const twapController = new TwapController();

router.get("/:marketAcct",twapController.getTwap);
router.get("/:marketAcct/latest", twapController.getLatestTwap);