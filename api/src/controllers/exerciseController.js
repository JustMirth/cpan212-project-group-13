import Exercise from "../models/exerciseModel.js";

export async function getExercises(req, res) {
    const exercises = await Exercise.find();

    res.status(200).json(exercises);
}

export async function getExerciseByID(req, res) {
    const exercise = await Exercise.findById(req.params.id);
    
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

export async function createExercise(req, res) {
    const exercise = await Exercise.create(req.body);

    res.status(201).json(exercise);
}

export async function updateExercise(req, res) {
    const exercise = await Exercise.findByIdAndUpdate(
        req.params.id,
        req.body,
        { 
            returnDocument: 'after',
            runValidators: true
        }
    );

    if (!exercise) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found", 
                details: null
            },
        });
    }

    res.status(200).json(exercises[index]);
}

export async function deleteExercise(req, res) {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
        return res.status(404).json({
            error: { 
                message: "Exercise not found", 
                details: null
            },
        });
    }

    res.status(204).send();
}