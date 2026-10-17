import { randomUUID } from "node:crypto";
const sampleUserID = "001"

export const workouts = [
    {
        userID: sampleUserID,
        id: randomUUID(),
        name: "Upper Body",
        description: "Workout focusing on upper body strength",
        date: new Date("2026-10-23"),
        status: "planned",
        exercises: [],
        notes: "Have sore shoulders, doing less this week",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        userID: sampleUserID,
        id: randomUUID(),
        name: "Lower Body",
        description: "Workout focusing on lower body strength",
        date: new Date("2026-10-24"),
        status: "planned",
        exercises: [],
        notes: "Feeling good, going to push hard",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        userID: sampleUserID,
        id: randomUUID(),
        name: "Cardio",
        description: "Cardio workout to improve endurance",
        date: new Date("2026-10-25"),
        status: "planned",
        exercises: [],
        notes: "Need to build up stamina, will start slow",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]