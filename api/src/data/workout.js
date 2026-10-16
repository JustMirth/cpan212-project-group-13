import { randomUUID } from "node: crypto";

export const workouts = [
    {
        id: randomUUID(),
        name: "Upper Body",
        description: "Workout focusing on upper body strength",
        date: "2026-10-23",
        status: "planned",
        exercises: [],
        notes: "Have sore shoulders, doing less this week",
    },
    {
        id: randomUUID(),
        name: "Lower Body",
        description: "Workout focusing on lower body strength",
        date: "2026-10-24",
        status: "planned",
        exercises: [],
        notes: "Feeling good, going to push hard",
    },
    {
        id: randomUUID(),
        name: "Cardio",
        description: "Cardio workout to improve endurance",
        date: "2026-10-25",
        status: "planned",
        exercises: [],
        notes: "Need to build up stamina, will start slow",
    }
]