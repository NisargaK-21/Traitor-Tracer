import { Router } from "express";

import authRoutes from "./auth.routes.js";
//import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import alertRoutes from "./alert.routes.js";
//import sessionRoutes from "./session.routes.js";

const router = Router();

router.use("/auth", authRoutes);
//router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/alerts", alertRoutes);
//router.use("/sessions", sessionRoutes);

export default router;