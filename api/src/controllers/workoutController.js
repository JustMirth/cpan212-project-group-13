import { randomUUID } from "node:crypto";
import { workouts } from "../data/workouts.js";

export function getWorkouts (req, res) {
    res.status(200).json(workouts);
}

export function getWorkoutByID (req, res) {
    const workout = workouts.find((item) => item.id === req.params.id);

    if (!workout) {
        return res.status(404).json({
            error: { message: "Workout not found "},
        });
    }

    res.status(200).json(workout);
}

export function createWorkout(req, res) {
    const workout = {
        ...req.body,
        id: randomUUID(),
    };

    workout.push(workout);

    res.status(201).json(workout);
}

export function updateWorkout(req, res) {
    const index = workouts.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json9({
            error: { message: "Workout not found "},
        });
    }

    workouts[index] = {
        ...workouts[index],
        ...req.body,
        id: workouts[index].id,
    }

    res.status(200).json(workouts[index]);
}

export function deleteWorkout(req, res) {
    const index = workouts.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: { message: "Workout not found" },
        });
    }

    workouts.splice(index, 1);

    res.status(204).send();
}