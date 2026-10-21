import { Router } from "express";
import { searchWgerExercises } from "../lib/wger";


const router = Router();
router.get('/exercises', searchWgerExercises)

export default router;