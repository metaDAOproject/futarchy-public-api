import express from "express";

import HealthController from "../controllers/health";


const router = express.Router();
export default router;

const healthController = new HealthController();

router.get("/", healthController.getHealth);
