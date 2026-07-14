import { Router } from "express";

import authenticate from "../middleware/authenticate.js";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", authenticate, login);

export default router;