import { RequestHandler } from "express";
import AppError from "../utils/app-error.js";

export const notFound: RequestHandler = (req, res, next) => {
  next(new AppError(404, "NOT_FOUND", `Cannot ${req.method} ${req.path}`));
};
