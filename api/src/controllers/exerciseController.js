import { randomUUID } from "node:crypto";
import { exercises } from "../data/exercises.js";

export function getExercises(req, res) {
    res.status(200).json(exercises);
}

export function getExerciseByID(req, res) {
    const exercise = exercises.find((item) => item.id === req.params.id);
    
    if (!exercise) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found",
                details: null
            },
        });
    }

    res.status(200).json(exercise)
}

export function createExercise(req, res) {
    const exercise = {
        ...req.body,
        id: randomUUID(),
    };

    exercises.push(exercise);

    res.status(201).json(exercise);
}

export function updateExercise(req, res) {
    const index = exercises.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found", 
                details: null
            },
        });
    }

    exercises[index] = {
        ...exercises[index],
        ...req.body,
        id: exercises[index].id,
    };

    res.status(200).json(exercises[index]);
}

export function deleteExercise(req, res) {
    const index = exercises.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found",
                details: null
            },
        });
    }

    exercises.splice(index, 1);

    res.status(204).send();
}