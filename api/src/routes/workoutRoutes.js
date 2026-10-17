import { Router } from "express";
import {
    getWorkouts,
    getWorkoutByID,
    createWorkout,
    updateWorkout,
    deleteWorkout,
} from "../controllers/workoutController.js";
import {
    getWorkoutExercises,
    getWorkoutExerciseByID,
    addWorkoutExercise,
    updateWorkoutExercise,
    deleteWorkoutExercise,
} from "../controllers/workoutExerciseController.js";

const router = Router();

router.get("/", getWorkouts);
router.get("/:id", getWorkoutByID);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

router.get("/:workoutID/exercises", getWorkoutExercises);
router.get("/:workoutID/exercises/:workoutExerciseID", getWorkoutExerciseByID);
router.post("/:workoutID/exercises", addWorkoutExercise);
router.put("/:workoutID/exercises/:workoutExerciseID", updateWorkoutExercise);
router.delete("/:workoutID/exercises/:workoutExerciseID", deleteWorkoutExercise);

export default router;