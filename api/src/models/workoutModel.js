import mongoose from 'mongoose';

const setSchema = new mongoose.Schema(
    {
        reps: {
            type: Number,
            required: [true, 'Reps are required'],
            min: [1, 'Reps must be a positive integer'],
            validate: {
                validator: Number.isInteger,
                message: 'Reps must be an integer',
            },
        },
        weight: {
            type: Number,
            required: [true, 'Weight is required'],
            min: [0, 'Weight must be a non-negative number'],
        },
    },
    {
        _id: false,
    }
);

const workoutExerciseSchema = new mongoose.Schema(
    {
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
            required: [true, 'Exercise is required'],
        },
        sets: {
            type: [setSchema],
            required: [true, 'Sets are required'],
            validate: {
                validator: (sets) => sets.length > 0,
                message: 'At least one set is required',
            },
        },
    }
);

const workoutSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: [true, 'User ID is required'],
            trim: true,
            immutable: true,
        },
        name: {
            type: String,
            required: [true, 'Workout name is required'],
            trim: true,
            minlength: [1, 'Workout name must be at least 1 character long'],
            maxlength: [100, 'Workout name must be at most 100 characters long'],
        },
        description: {
            type: String,
            required: [true, 'Workout description is required'],
            trim: true,
            minlength: [1, 'Workout description must be at least 1 character long'],
            maxlength: [500, 'Workout description must be at most 500 characters long'],
        },
        date: {
            type: Date,
            required: [true, 'Workout date is required'],
        },
        status: {
            type: String,
            required: [true, 'Workout status is required'],
            enum: {
                values: ['planned', 'completed', 'cancelled'],
                message: 'Status must be either planned, completed, or skipped',
            },
        },
        exercises: {
            type: [workoutExerciseSchema],
            default: [],
        },
        notes: {
            type: String,
            maxlength: [1000, 'Notes must be at most 1000 characters long'],
        },
    },
    {
        timestamps: true,
    }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
