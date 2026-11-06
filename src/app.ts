import express from "express";
import { requestLogger } from "./middleware/request-logger.js";

const app = express();

app.use(requestLogger);

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "asksabkuch-api",
  });
});

export { app };
