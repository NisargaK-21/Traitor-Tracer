import { Router } from "express";
import {
  overview,
  leaderboard,
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/overview", overview);
router.get("/leaderboard", leaderboard);

export default router;