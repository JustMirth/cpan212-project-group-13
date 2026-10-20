/*
External API. At least one of your endpoints calls the external API from the server with fetch
*/

const URL = "https://wger.de/api/v2/exerciseinfo/" //or https://wger.de/api/v2 (?)

export async function searchWgerExercises() {

    try {
        const response = await fetch(URL, {
            signal: AbortSignal.timeout(5000)
        })

        if (!response.ok) {
            const error = new Error("WGER API request has failed")

            error.status = 502
            throw error;
        }

        const data = await response.json();
        // return data;
        if (!Array.isArray(data.results)) {
            throw new Error("Invalid WGER response")
        }
        //makes it so instead of raw response; returns wanted JSON values
        const exercises = data.results.map((exercise) => {
            //to find and use english translation rather than default russian
            const translate = exercise.translations?.find((translation) => translation.language === 2)

            return {
                wgerID: exercise.id,
                name: translate?.name ?? "Unknown exercise",
                description: translate?.description ?? "n/a",
                category: exercise.category?.name ?? null,
                muscles: (exercise.muscles ?? {}).map(
                    (muscle) => muscle.name_en ?? muscle.name
                )
            }
        })

        return exercises;


    }
    catch (error) {
        if (error.name === "TimeoutError") {
            const timeoutError = new Error("WGER API has timed out")
            timeoutError.status = 504;
            throw timeoutError
        }

        const apiError = new Error("WGER API request failed")
        apiError.status = 502;
        throw apiError;
    }

}