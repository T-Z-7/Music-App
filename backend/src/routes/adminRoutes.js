import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbumn,
  deleteAlbumn,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

//Add to every routes
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albumns", createAlbumn);
router.delete("/albumns/:id", deleteAlbumn);

export default router;
