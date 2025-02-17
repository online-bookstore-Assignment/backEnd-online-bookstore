import express, { NextFunction, Request, Response } from "express";

let router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("안녕! /api/book");
});

export default router;
