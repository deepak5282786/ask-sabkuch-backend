import express from "express";
import cors from "cors";
import helmet from "helmet";

import { corsOptions } from "./config/cors.js";
import { requestLogger } from "./middleware/request-logger.js";
import { healthRouter } from "./modules/health/health.routes.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();

// 1. Security headers
app.use(helmet());

// 2. Cross-origin browser policy
app.use(cors(corsOptions));

// 3. Request lifecycle logging
app.use(requestLogger);

// 4. Parse incoming JSON bodies
app.use(express.json({ limit: "1mb" }));

// 5. Register feature routers
app.use("/api/v1/health", healthRouter);

// 6. Catch unmatched routes
app.use(notFound);

// 7. Catch forwarded errors
app.use(errorHandler);
