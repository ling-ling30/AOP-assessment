import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = "DomisiliMana";

export const generateToken = (id: number): string => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
};

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    (req as any).user = decoded;
    next();
  });
};
