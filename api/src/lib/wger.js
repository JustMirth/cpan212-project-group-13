/*
External API. At least one of your endpoints calls the external API from the server with fetch

- caches responses in memory with an expiry time,
so repeated requests inside that time don't call the external API again, 
and logs a line to the terminal on a cache hit

*/

const URL = "https://wger.de/api/v2/exerciseinfo/" //or https://wger.de/api/v2 (?)

//cache
const cache = new Map()
const CACHE_TTL_SECONDS = 600

export async function getWgerExercises() {

    const saved = cache.get("exercises")

    if (saved && saved.expiresAt > Date.now()) {
        console.log("cache hit");
        return saved.value;
    }

    if (saved) {
        cache.delete("exercises");
    }


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
                muscles: (exercise.muscles ?? []).map(
                    (muscle) => muscle.name_en ?? muscle.name
                )
            }
        })

        cache.set("exercises", {
            value: exercises,
            expiresAt: Date.now() + CACHE_TTL_SECONDS * 1000
        })


         return exercises;



    }
    catch (error) {
        /*
        returns a 502 (external API error) or 504 (timeout) in your error shape instead of crashing
        */
    
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