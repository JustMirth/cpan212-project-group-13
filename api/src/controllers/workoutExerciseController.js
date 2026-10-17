import { randomUUID } from "node:crypto";
import { workouts } from "../data/workouts.js";
import { validateWorkoutExercise, validateWorkoutExerciseUpdate } from "../validators/workoutExercisesValidators.js";

function findWorkout(workoutID) {
    return workouts.find((workout) => workout.id === workoutID);
}

function findExercise(workoutID, exerciseID) {
    const workout = findWorkout(workoutID);

    if (!workout || !Array.isArray(workout.exercises)) {
        return undefined;
    }
    
    return workout.exercises.find((exercise) => exercise.id === exerciseID);
}

export function getWorkoutExercises(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { message: "Workout not found" },
        });
    }

    res.status(200).json(workout.exercises ?? []);
}

export function getWorkoutExerciseByID(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { message: "Workout not found" },
        });
    }

    const exercise = findExercise(req.params.workoutID, req.params.exerciseID)

    if (!exercise) {
        return res.status(404).json({
            error: { message: "Exercise not found in workout" },
        });
    }

    res.status(200).json(exercise);
}

export function addWorkoutExercise(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { message: "Workout not found" },
        });
    }

    const errors = validateWorkoutExercise(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            error: {
                message: "Invalid workout exercise",
                details: errors,
            },
        });
    }

    const { exerciseID, sets } = req.body;
    const masterExercise = exerciseLibrary.find(
        (exercise) => exercise.wgerID === exerciseID
    );

    if (!masterExercise) {
        return res.status(404).json({
            error: { message: "Exercise not found in master library" },
        });
    }

    if (!Array.isArray(workout.exercises)) {
        workout.exercises = [];
    }

    const alreadyAdded = workout.exercises.some(
        (exercise) => exercise.exerciseID === exerciseID
    );

    if (alreadyAdded) {
        return res.status(400).json({
            error: {
                message: "Exercise is already in workout",
            },
        });
    }

    const workoutExercise = {
        exerciseID: masterExercise.wgerID,
        exerciseName: masterExercise.name,
        sets,
    };

    workout.exercises.push(workoutExercise);
    workout.updatedAt = new Date()

    res.status(201).json(workoutExercise);
}

export function updateWorkoutExercise(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { message: "Workout not found" },
        });
    }

    const errors = validateWorkoutExerciseUpdate(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            error: {
                message: "Invalid workout exercise",
                details: errors,
            },
        });
    }

    const exercises = workout.exercises ?? [];
    const index = exercises.findIndex(
        (item) => item.id === req.params.exerciseID
    );

    if (index === -1) {
        return res.status(404).json({
            error: { message: "Exercise not found in workout" },
        });
    }

    exercises[index] = {
        ...exercises[index],
        ...req.body,
        id: exercises[index].id,
    };

    res.status(200).json(exercises[index]);
}

export function deleteWorkoutExercise(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { message: "Workout not found" },
        });
    }

    const exercises = workout.exercises ?? [];
    const index = exercises.findIndex(
        (item) => item.id === req.params.exerciseID
    );

    if (index === -1) {
        return res.status(404).json({
            error: { message: "Exercise not found in workout" },
        });
    }

    exercises.splice(index, 1);

    res.status(204).send();
}