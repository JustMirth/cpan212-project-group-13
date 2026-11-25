const allowedFields = ["wgerID", "name", "description"];

export function validateExercise(body, isUpdate = false) {
    const errors = [];

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return [
            {
                field: "body",
                message: "Request body must be a JSON object",
            }
        ];
    }

    for (const field of Object.keys(body)) {
        if (!allowedFields.includes(field)) {
            errors.push({
                field,
                message: "Field is not supported",
            });
        }
    }

    if (!isUpdate && Object.keys(body).length === 0) {
        errors.push({
            field: "body",
            message: "Request body cannot be empty",
        });
    }

    if (!isUpdate || body.wgerID !== undefined) {
        if (
            !Number.isInteger(body.wgerID) ||
            body.wgerID < 1
        ) {
            errors.push({
                field: "wgerID",
                message: "Wger ID must be a positive integer",
            });
        }
    }

    if (!isUpdate || body.name !== undefined) {
        if (
            typeof body.name !== "string" ||
            body.name.trim() === ""
        ) {
            errors.push({
                field: "name",
                message: "Exercise name must not be empty",
            });
        }
    }

    if (!isUpdate || body.description !== undefined) {
        if (
            typeof body.description !== "string" ||
            body.description.trim() === ""
        ) {
            errors.push({
                field: "description",
                message: "Exercise description must not be empty",
            });
        }
    }

    return errors;
}