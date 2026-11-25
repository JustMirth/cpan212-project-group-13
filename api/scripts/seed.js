import mongoose from 'mongoose';
import { connectDb } from '../src/db.js';
import Exercise from '../src/models/exerciseModel.js';
import Workout from '../src/models/workoutModel.js';


const seedExercises = [

    {
        wgerID: 9,
        name: 'Bench Press',
        description: 'Compound chest exercise',
    },
    {
        wgerID: 12,
        name: 'Squat',
        description: 'Compound lower-body exercise',
    },
    {
        wgerID: 20,
        name: 'Pull-Up',
        description: 'Upper-body pulling exercise',
    },
    

]

//made up splits
const workoutNames = [
    'Upper Body',
    'Lower Body',
    'Full Body',
    'Push Day',
    'Pull Day',
]

const statuses = ['planned', 'completed', 'cancelled']
await connectDb();

try {
    //start from clean collections to avoid duplicates
    await Workout.deleteMany({});
    await Exercise.deleteMany({});

    // create exercises first
    const exercises = await Exercise.insertMany(seedExercises);

    const seedWorkouts = [];

    // 25 workouts for the paginated collection
    for (let index = 0; index < 25; index++) {
        const exercise = exercises[index % exercises.length];

        seedWorkouts.push({

            userID: '001',
            name: `${workoutNames[index % workoutNames.length]} Workout ${index + 1}`,
            description: 'sample workout added by seed script',
            date: new Date(Date.UTC(2026, 0, index + 1)),
            status: statuses[index % statuses.length],
            exercises: [
                {
                    exercise: exercise._id,
                    sets: [
                        { reps: 10, weight: 20 },
                        { reps: 8, weight: 25 },
                    ],
                },
            ],
            notes: `sample workout number ${index + 1}.`,
        })

    }

    const workouts = await Workout.insertMany(seedWorkouts)
    console.log(`Inserted ${exercises.length} exercises`);
    console.log(`inserted ${workouts.length} workouts`);

}
catch (error) {
    console.error('could not seed database:', error.message);
    process.exitCode = 1;
}
finally {
    await mongoose.disconnect();    //to finish script
}