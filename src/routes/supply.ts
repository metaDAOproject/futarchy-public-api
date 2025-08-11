import express from "express";
import SupplyController from "../controllers/supply";

const router = express.Router();
export default router;

const supplyController = new SupplyController();

// Test endpoint to verify CoinGecko detection
router.get("/test", (req, res) => {
  res.json({
    isCoinGecko: req.isCoinGecko || false,
    userAgent: req.get('User-Agent'),
    requestedWith: req.get('X-Requested-With'),
    timestamp: new Date().toISOString()
  });
});

// Get circulating supply
router.get("/circulating", supplyController.getCirculatingSupply);

// Get total supply
router.get("/total", supplyController.getTotalSupply);

// Get both circulating and total supply
router.get("/", supplyController.getSupplyInfo);
