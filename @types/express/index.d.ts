import "express";

declare module "express" {
  interface Request {
    auth?: {
      publicKey: string;
      name: string;
      created_at: number;
      exp: number;
      iat: number;
    };
  }
}
