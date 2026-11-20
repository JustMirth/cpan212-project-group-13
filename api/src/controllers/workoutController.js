import Workout from "../models/workoutModel.js";
import {validateWorkout, validateWorkoutUpdate} from "../validators/workoutValidators.js";

function sendValidationErrors(res, errors) {
    return res.status(400).json({
        error: {
            message: "Validation failed",
            details: errors,
        },
    });
}

export async function getWorkouts(req, res) {
    const workouts = await Workout.find();
    
    res.status(200).json(workouts);
}

export async function getWorkoutByID(req, res) {
    const workout = await Workout.findById(req.params.id).populate('exercises.exercise');

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

export async function createWorkout(req, res) {
    const errors = validateWorkout(req.body);

    if (errors.length > 0) {
        return sendValidationErrors(res, errors);
    }

    const workout = await Workout.create(req.body);

    res.status(201).json(workout);
}

export async function updateWorkout(req, res) {
    const errors = validateWorkoutUpdate(req.body);

    if (errors.length > 0) {
        return sendValidationErrors(res, errors);
    }
    
    const workout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        { 
            returnDocument: 'after',
            runValidators: true
        }
    );

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

export async function deleteWorkout(req, res) {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
        return res.status(404).json({
            error: { 
                message: "Workout not found", 
                details: null
            },
        });
    }

    res.status(204).send();
}