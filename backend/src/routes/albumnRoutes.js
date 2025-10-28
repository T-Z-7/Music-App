import { Router } from "express";
import { getAllAlbumns , getAllAlbumnsById } from "../controllers/albumn.controller.js";

const router = Router();

router.get('/',getAllAlbumns);
router.get('/:albumnId',getAllAlbumnsById)

export default router;