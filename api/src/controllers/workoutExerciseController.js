import Workout from "../models/workoutModel.js";
import Exercise from "../models/exerciseModel.js";
import {validateWorkoutExercise, validateWorkoutExerciseUpdate} from "../validators/workoutExerciseValidators.js";

function sendValidationErrors(res, errors) {
    return res.status(400).json({
        error: {
            message: "Validation failed",
            details: errors,
        },
    });
}

async function findWorkout(workoutID) {
    return await Workout.findById(workoutID);
}

function findExercise(workout, workoutExerciseID) {
    return workout.exercises.id(workoutExerciseID);
}

export async function getWorkoutExercises(req, res) {
    const workout = await Workout.findById(req.params.workoutID).populate('exercises.exercise');

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

export async function getWorkoutExerciseByID(req, res) {
    const workout = await Workout.findById(req.params.workoutID).populate('exercises.exercise');

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const workoutExercise = findExercise(workout, req.params.workoutExerciseID);

    if (!workoutExercise) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found in workout",
                details: null
            },
        });
    }

    res.status(200).json(workoutExercise);
}

export async function addWorkoutExercise(req, res) {
    const errors = validateWorkoutExercise(req.body);

    if (errors.length > 0) {
        return sendValidationErrors(res, errors);
    }

    const workout = await findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const {wgerID, sets }= req.body;
    const masterExercise = await Exercise.findOne({ wgerID });

    if (!masterExercise) {
        return res.status(404).json({
            error: {
                message: "Exercise not found in master list",
                details: null
            },
        });
    }

    const alreadyExists = workout.exercises.some(
        (item) => item.exercise.toString() === masterExercise._id.toString()
    );

    if (alreadyExists) {
        return res.status(400).json({
            error: {
                message: "Exercise already exists in workout",
                details: null
            },
        });
    }

    workout.exercises.push({ exercise: masterExercise._id, sets });
    await workout.save();

    const addedExercise = workout.exercises[workout.exercises.length - 1];

    res.status(201).json(addedExercise);
}

export async function updateWorkoutExercise(req, res) {
    const errors = validateWorkoutExerciseUpdate(req.body);

    if (errors.length > 0) {
        return sendValidationErrors(res, errors);
    }
    
    const workout = await findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const workoutExercise = findExercise(workout, req.params.workoutExerciseID);

    if (!workoutExercise) {
        return res.status(404).json({
            error: {
                message: "Exercise not found in workout",
                details: null
            },
        });
    }
    
    workoutExercise.sets = req.body.sets;
    await workout.save();

    res.status(200).json(workoutExercise);
}

export async function deleteWorkoutExercise(req, res) {
    const workout = await findWorkout(req.params.workoutID);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found",
                details: null
            },
        });
    }

    const workoutExercise = findExercise(workout, req.params.workoutExerciseID);

    if (!workoutExercise) {
        return res.status(404).json({
            error: {
                message: "Exercise not found in workout",
                details: null
            },
        });
    }
    
    workoutExercise.deleteOne();
    await workout.save();

    res.status(204).send();
}