// Handle the routes of health

import { Router } from "express";
import { healthController } from "./health.controller.js";

const router = Router();

router.get("/", healthController);

export { router as healthRouter };
