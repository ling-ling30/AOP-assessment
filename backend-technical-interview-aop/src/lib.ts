import { Request, Response } from "express";

export const tryCatch =
  (fn: Function) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
