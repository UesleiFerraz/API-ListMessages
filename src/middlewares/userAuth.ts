import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.replace("Bearer", "").trim();
  if (!token) {
    return res.status(401).json({ error: "you must authenticate first" });
  }

  const secret = process.env.SECRET;
  if (secret) {
    try {
      jwt.verify(token, secret);
      return next();
    } catch {
      return res.status(403).json({ error: "you must authenticate first" });
    }
  }

  return res.sendStatus(500);
}
