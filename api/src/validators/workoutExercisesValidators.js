function isObject(value) {
    return value !== null &&
        typeof value === "object" &&
        !Array.isArray(value);
}

function validateSets(sets) {
    const errors = [];

    if (!Array.isArray(sets)) {
        return [{
            field: "sets",
            message: "Sets must be an array",
        }];
    }

    sets.forEach((set, index) => {
        if (!isObject(set)) {
            errors.push({
                field: `sets[${index}]`,
                message: "Each set must be an object",
            });
            return;
        }

        if (!Number.isInteger(set.reps) || set.reps <= 0) {
            errors.push({
                field: `sets[${index}].reps`,
                message: "Reps must be a positive integer",
            });
        }

        if (
            typeof set.weight !== "number" ||
            !Number.isFinite(set.weight) ||
            set.weight < 0
        ) {
            errors.push({
                field: `sets[${index}].weight`,
                message: "Weight must be a positive number",
            });
        }

        for (const field of Object.keys(set)) {
            if (!["reps", "weight"].includes(field)) {
                errors.push({
                    field: `sets[${index}].${field}`,
                    message: "Unknown field",
                });
            }
        }
    });

    return errors;
}

export function validateWorkoutExercise(body) {
    if (!isObject(body)) {
        return [{
            field: "body",
            message: "Request body must be a JSON object",
        }];
    }

    const errors = [];

    if (!Number.isInteger(body.wgerID) || body.wgerID <= 0) {
        errors.push({
            field: "wgerID",
            message: "Wger ID must be a positive integer",
        });
    }

    errors.push(...validateSets(body.sets));

    for (const field of Object.keys(body)) {
        if (!["wgerID", "sets"].includes(field)) {
            errors.push({
                field,
                message: "Unknown field",
            });
        }
    }

    return errors;
}

export function validateWorkoutExerciseUpdate(body) {
    if (!isObject(body)) {
        return [{
            field: "body",
            message: "Request body must be a JSON object",
        }];
    }

    const errors = [];

    if (!Object.hasOwn(body, "sets")) {
        errors.push({
            field: "sets",
            message: "Sets are required when updating an exercise",
        });
    } else {
        errors.push(...validateSets(body.sets));
    }

    for (const field of Object.keys(body)) {
        if (field !== "sets") {
            errors.push({
                field,
                message: "Only sets can be updated",
            });
        }
    }

    return errors;
}