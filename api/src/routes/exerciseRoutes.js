import { Router } from "express";
import {
    getExercises,
    getExerciseByID,
    createExercise,
    updateExercise,
    deleteExercise,
} from "../controllers/exerciseController.js";

const router = Router();

router.get("/", getExercises);
router.get("/:id", getExerciseByID);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;