import type { NextFunction, Request, Response } from "express";
import express from "express";
import { rateLimit } from 'express-rate-limit'
import { log } from "./logger/logger";

import organizationRouter from "./routes/organization";
import organizationsRouter from "./routes/organizations";
import proposalRouter from "./routes/proposals";
import healthRouter from "./routes/health";
import pricesRouter from "./routes/prices";
import twapRouter from "./routes/twap";
import tradesRouter from "./routes/trades";
import performanceRouter from "./routes/performance";
import { authMiddleware } from "./middleware/auth";
import authMiddlewareRouter from "./middleware/auth";

async function main() {
  log.info("Starting API Server");
  const app = express();
  const port = process.env.PORT || 3000;

  //trust cloudflare proxy
  app.set('trust proxy', 1);

  app.use(express.json());
  app.use(function (req, res, next) {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("Content-Type", "application/json");
    next();
  });

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 10 requests per minute
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  })

  app.use(limiter);
  app.use("/health", healthRouter);  
  
  app.use(authMiddleware);
  
  app.use("/auth", authMiddlewareRouter);
  app.use("/proposals", proposalRouter); 
  app.use("/organizations", organizationsRouter);
  app.use("/organization", organizationRouter);
  app.use("/prices", pricesRouter);
  app.use("/twap", twapRouter);
  app.use("/trades", tradesRouter);
  app.use("/performance", performanceRouter);
  
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      next(err);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
