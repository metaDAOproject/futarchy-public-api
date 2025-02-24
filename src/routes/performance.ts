import express from "express";

import PerformanceController from "../controllers/performance";

const router = express.Router();
export default router;

const performanceController = new PerformanceController();

router.get("/", performanceController.getAllPerformance);
router.get("/:userAcct", performanceController.getPerformanceByUser);
