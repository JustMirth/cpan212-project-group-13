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
    const errors =[];
    const allowedStatuses = ["planned", "completed", "cancelled"];
    const allowedSorts = [
        "date",
        "-date",
        "name",
        "-name",
        "createdAt",
        "-createdAt",
    ];
    const status = req.query.status;
    const sort = req.query.sort ?? "date";
    const page = req.query.page ?? "1";
    const limit = req.query.limit ?? "10";

    if (
        status !== undefined &&
        (typeof status !== "string" || !allowedStatuses.includes(status))
    ) {
        errors.push({
            field: "status",
            message: "Status must be planned, completed or cancelled",
        });
    }

    if (typeof sort !== "string" || !allowedSorts.includes(sort)) {
        errors.push({
            field: "sort",
            message: "Invalid sort option",
        });
    }

    if (typeof page !== "string" || !/^[1-9]\d*$/.test(page)) {
        errors.push({
            field: "page",
            message: "Page must be a positive integer",
        });
    }

    if (typeof limit !== "string" || !/^[1-9]\d*$/.test(limit)) {
        errors.push({
            field: "limit",
            message: "Limit must be a positive integer"
        });
    } else if (Number(limit) > 50 ) {
        errors.push({
            field: "limit",
            message: "Limit cannot exceed 50",
        });
    }

    if (errors.length > 0) {
        return sendValidationErrors(res, errors);
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const skip = (currentPage - 1) * pageLimit;

    const filter = {}

    if (status) {
        filter.status = status;
    }

    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    const sortDirection = sort.startsWith("-") ? -1 : 1;

    const sortOptions = {
        [sortField]: sortDirection,
    };

    const [workouts, total] = await Promise.all([
        Workout.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageLimit),
        Workout.countDocuments(filter),
    ])

    res.status(200).json({
        items: workouts,
        total,
        page: currentPage,
        limit: pageLimit,
        pages: Math.ceil(total / pageLimit),
    })
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