import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface PayLoad {
  userIdToken: string;
  iat: number;
  exp: number;
}

export default function userHasSameId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.replace("Bearer", "").trim();
  const { userId } = req.params;

  if (!token || !userId) {
    return res.status(401).json({ error: "you must authenticate first" });
  }

  const secret = process.env.SECRET;

  if (secret) {
    try {
      const data = jwt.verify(token, secret);
      const { userIdToken } = data as PayLoad;

      if (userIdToken === userId) {
        return next();
      }
      return res.status(403).json({ error: "you are not authorized" });
    } catch {
      return res.status(401).json({ error: "you must authenticate first" });
    }
  }
}
