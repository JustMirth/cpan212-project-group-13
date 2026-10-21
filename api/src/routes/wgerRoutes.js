import { Router } from "express";
import { getWgerExercises } from "../lib/wger.js";
import { searchWgerExercises } from "../controllers/wgerController.js";


const router = Router();
router.get('/exercises', searchWgerExercises)

export default router;