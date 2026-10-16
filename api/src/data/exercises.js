import {randomUUID} from "node:crypto";

export const exercises = [
    {
        id: randomUUID(),
        wgerID: 9,
        name: "Bench Press",
        description: "Compound chest exercise"
    },
    {
        id: randomUUID(),
        wgerID: 12,
        name: "Squat",
        description: "Compound lower-body exercise"
    },
    {
        id: randomUUID(),
        wgerID: 20,
        name: "Pull-Up",
        description: "Upper-body pulling exercise"
    }
];