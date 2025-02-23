import type { Request, Response, NextFunction } from "express"
import express from "express";
import { ApiTokensStore, type ApiToken } from "../db/token";

const apiTokensStore = new ApiTokensStore();

let authTokens: Map<string, ApiToken> = new Map();
let lastRefresh = 0;
const refreshAuthTokens = async () => {
  const tokens = await apiTokensStore.findAll();
  authTokens = new Map(tokens.map(token => [token.token, token]));
  lastRefresh = Date.now();
}

refreshAuthTokens();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  //if the tokens are older than 5 minutes, refresh them
  if (Date.now() - lastRefresh > 1000 * 60 * 5) {
    refreshAuthTokens();
  }
  
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

  if (!authTokens.has(token)) {
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

function getAuthToken(req: Request) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  return token;
}

const getNewAuthToken = async (req: Request, res: Response) => {
  const newToken = crypto.randomUUID();
  const url = req.body.url;
  try {
    await apiTokensStore.create(newToken, url);
    res.json({ token: newToken });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Failed to create token" });
  }
}

const router = express.Router();
router.get("/", adminMiddleware,getNewAuthToken);
export default router;
