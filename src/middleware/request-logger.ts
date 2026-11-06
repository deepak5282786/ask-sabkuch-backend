import type { NextFunction, Request, Response } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = performance.now();
  console.log(`[START]: ${req.method} ${req.path}`);
  res.once("finish", () => {
    const duration = performance.now() - start;
    console.log(
      `[END]: ${req.method} ${req.path}` +
        ` (${res.statusCode}) ` +
        `${duration.toFixed(2)}ms`,
    );
  });
  next();
};
