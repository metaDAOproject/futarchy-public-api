import express from "express";

import UiController from "../controllers/ui";
import { uiAuthMiddleware } from "../middleware/auth";


const router = express.Router();
export default router;

const uiController = new UiController();

router.get("/login", uiController.login);
router.post("/login", uiController.doLogin);

router.get("/admin", uiAuthMiddleware, uiController.admin);
router.get("/user", uiAuthMiddleware, uiController.normalUser);
