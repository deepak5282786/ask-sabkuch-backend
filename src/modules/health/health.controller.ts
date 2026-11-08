// Handle the Http request and response
import type { Request, Response } from "express";
const healthController = (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "Ask Sabkuch AI",
  });
};

export { healthController };
