import { randomUUID } from "node:crypto";
import { workouts } from "../data/workouts.js";
import { exercises } from "../data/exercises.js";
import { validateWorkoutExercise, validateWorkoutExerciseUpdate } from "../validators/workoutExercisesValidators.js";

function findWorkout(workoutID) {
    return workouts.find((workout) => workout.id === workoutID);
}

function findExercise(workoutID, workoutExerciseID) {
    const workout = findWorkout(workoutID);

    if (!workout || !Array.isArray(workout.exercises)) {
        return undefined;
    }
    
    return workout.exercises.find((exercise) => exercise.id === workoutExerciseID);
}

export function getWorkoutExercises(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    res.status(200).json(workout.exercises ?? []);
}

export function getWorkoutExerciseByID(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const exercise = findExercise(req.params.workoutID, req.params.workoutExerciseID)

    if (!exercise) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found in workout",
                details: null
            },
        });
    }

    res.status(200).json(exercise);
}

export function addWorkoutExercise(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
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

    const { wgerID, sets } = req.body;
    const masterExercise = exercises.find(
        (exercise) => exercise.wgerID === wgerID
    );

    if (!masterExercise) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found in master library",
                details: null
            },
        });
    }

    if (!Array.isArray(workout.exercises)) {
        workout.exercises = [];
    }

    const alreadyAdded = workout.exercises.some(
        (exercise) => exercise.wgerID === wgerID);

    if (alreadyAdded) {
        return res.status(400).json({
            error: {
                message: "Exercise is already in workout",
                details: null
            },
        });
    }

    const workoutExercise = {
        id: randomUUID(),
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
            error: { 
                message: "Workout not found",
                details: null
            },
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
        (item) => item.id === req.params.workoutExerciseID
    );

    if (index === -1) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found in workout",
                details: null
            },
        });
    }

    exercises[index] = {
        ...exercises[index],
        ...req.body,
        id: exercises[index].id,
    };

    workout.updatedAt = new Date();
    res.status(200).json(exercises[index]);
}

export function deleteWorkoutExercise(req, res) {
    const workout = findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const exercises = workout.exercises ?? [];
    const index = exercises.findIndex(
        (item) => item.id === req.params.workoutExerciseID
    );

    if (index === -1) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found in workout",
                details: null
            },
        });
    }

    exercises.splice(index, 1);
    workout.updatedAt = new Date();

    res.status(204).send();
}