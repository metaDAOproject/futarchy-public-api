import type { Request, Response, NextFunction } from "express";

/**
 * Middleware to identify CoinGecko requests
 * Checks for CoinGecko-specific headers and adds a flag to the request
 */
export const coingeckoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get('User-Agent') || '';
  const requestedWith = req.get('X-Requested-With') || '';
  
  // Check if request is from CoinGecko
  const isCoinGecko = userAgent.includes('CoinGecko') || requestedWith === 'com.coingecko';
  
  // Add flag to request object for other middleware to use
  req.isCoinGecko = isCoinGecko;
  
  if (isCoinGecko) {
    console.log('CoinGecko request detected:', {
      userAgent,
      requestedWith,
      ip: req.ip,
      path: req.path
    });
  }
  
  next();
}; 