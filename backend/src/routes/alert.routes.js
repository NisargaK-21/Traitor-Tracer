import { Router } from "express";
import {
  getAlerts,
  acknowledgeAlert,
  resolveAlert,
} from "../controllers/alert.controller.js";

const router = Router();

router.get("/", getAlerts);
router.patch("/:id/acknowledge", acknowledgeAlert);
router.patch("/:id/resolve", resolveAlert);

export default router;