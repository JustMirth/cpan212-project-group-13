import { searchWgerExercises } from "../lib/wger";

export async function searchWgerExercises(req,res) {
    const exercises = await searchWgerExercises();

    res.status(200).json({data: exercises});
}