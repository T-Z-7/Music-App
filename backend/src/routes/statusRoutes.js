import { Router } from "express";
import { protectRoute,requireAdmin } from "../middleware/auth.middleware.js"
import { getStatus } from "../controllers/status.controller.js";

const router = Router();

router.get('/', protectRoute,requireAdmin,getStatus);

export default router;