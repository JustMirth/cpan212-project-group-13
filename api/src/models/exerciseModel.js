import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
    {
        wgerID: {
            type: Number,
            required: [true, 'Wger ID is required'],
            unique: true,
            min: [1, 'Wger ID must be a positive integer'],
            validate: {
                validator: Number.isInteger,
                message: 'Wger ID must be an integer',
            },
        },
        name: {
            type: String,
            required: [true, 'Exercise name is required'],
            trim: true,
            minlength: [1, 'Exercise name must be at least 1 character long'],
            maxlength: [100, 'Exercise name must be at most 100 characters long'],
        },
        description: {
            type: String,
            required: [true, 'Exercise description is required'],
            trim: true,
            minlength: [1, 'Exercise description must be at least 1 character long'],
            maxlength: [500, 'Exercise description must be at most 500 characters long'],
        },
    },
    {
        timestamps: true,
    }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;