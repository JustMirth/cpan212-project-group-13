import { getWgerExercises } from "../lib/wger.js";

export async function searchWgerExercises(req,res) {


    const exercises = await getWgerExercises();

    res.status(200).json({data: exercises});
}