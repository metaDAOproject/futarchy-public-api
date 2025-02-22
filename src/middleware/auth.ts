import type { Request, Response, NextFunction } from "express"
import express from "express";
import cache from "persistent-cache"

const authCache = cache();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getAuthToken(req)
  if (!token) {
    res.status(401).json({ message: "Unauthorized" })
    return;
  }

  if (token === process.env.ADMIN_AUTH_TOKEN) {
    req.isAdmin = true;
    next();
    return;
  }

  const cachedToken = authCache.getSync(token);
  if (!cachedToken) {
    res.status(401).json({ message: "Unauthorized" })
    return;
  }

  next();
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    res.status(401).json({ message: "Unauthorized" })
    return;
  }
  next();
}

function getAuthToken(req: Request) {const authHeader = req.headers.authorization
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  return token;
}

const getNewAuthToken = async (req: Request, res: Response) => {
  const newToken = crypto.randomUUID();
  authCache.putSync(newToken, "true");
  res.json({token: newToken});
}

const router = express.Router();
router.get("/", adminMiddleware,getNewAuthToken);
export default router;
