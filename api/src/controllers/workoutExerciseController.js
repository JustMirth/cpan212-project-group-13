import { randomUUID } from "node:crypto";
import { workouts } from "../data/workouts.js";

function findWorkout(workoutID) {
    return workouts.find((workout) => workout.id === workoutID);
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

    if (!exercise) {
        return res.status(404).json({
            error: { message: "Excercise not found in workout" },
        })
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

    if (!Array.isArray(workout.exercises)) {
        workout.exercises = [];
    }

    const exercise = {
        ...req.body,
        id: randomUUID(),
    };

    workout.exercises.push(exercise);

    res.status(201).json(exercise);
}

export function updateWorkoutExercise(req, res) {
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