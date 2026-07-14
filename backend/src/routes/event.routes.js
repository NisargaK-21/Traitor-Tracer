import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;