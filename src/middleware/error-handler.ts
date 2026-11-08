import type { ErrorRequestHandler } from "express";
import AppError from "../utils/app-error.js";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  if (isInvalidJsonError(err)) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_JSON",
        message: "Invalid JSON request body",
      },
    });
    return;
  }

  console.error("Unhandled server error:", err);

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  });
};

function isInvalidJsonError(err: unknown): boolean {
  return (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "type" in err &&
    err.type === "entity.parse.failed"
  );
}
