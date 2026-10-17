import { randomUUID } from "node:crypto";
import { workouts } from "../data/workouts.js";
import { validateWorkout, validateWorkoutUpdate } from "../validators/workoutValidators.js";

export function getWorkouts (req, res) {
    res.status(200).json(workouts);
}

export function getWorkoutByID (req, res) {
    const workout = workouts.find((item) => item.id === req.params.id);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    res.status(200).json(workout);
}

export function createWorkout(req, res) {
    const errors = validateWorkout(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            error: {
                message: "Invalid workout",
                details: errors,
            },
        });
    }
    
    const now = new Date();

    const workout = {
        ...req.body,
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
    };

    workouts.push(workout);

    res.status(201).json(workout);
}

export function updateWorkout(req, res) {
    const index = workouts.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const errors = validateWorkoutUpdate(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            error: {
                message: "Invalid workout",
                details: errors,
            },
        });
    }

    workouts[index] = {
        ...workouts[index],
        ...req.body,
        id: workouts[index].id,
        userID: workouts[index].userID,
        createdAt: workouts[index].createdAt,
        updatedAt: new Date(),
    }

    res.status(200).json(workouts[index]);
}

export function deleteWorkout(req, res) {
    const index = workouts.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    workouts.splice(index, 1);

    res.status(204).send();
}