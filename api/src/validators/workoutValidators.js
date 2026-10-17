const allowedFields = [
    "userID",
    "name",
    "description",
    "date",
    "status",
    "exercises",
    "notes",
];

export function validateWorkout(body) {
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

    if (
        body.userID !== undefined &&
        (typeof body.userID !== "string" || body.userID.trim() === "")
    ) {
        errors.push({
            field: "userID",
            message: "User ID is required and must not be empty",
        });
    }

    if (
        typeof body.name !== "string" ||
        body.name.trim().length === 0
    ) {
        errors.push({
            field: "name",
            message: "Name is required and must not be empty",
        });
    }

    if (
        typeof body.description !== "string" ||
        body.description.trim().length === 0
    ) {
        errors.push({
            field: "description",
            message: "Description is required and must not be empty",
        })
    }

    if (
        body.date === undefined ||
        Number.isNaN(Date.parse(body.date))
    ) {
        errors.push({
            field: "date",
            message: "A valid date is required",
        });
    }

    if (
        typeof body.status !== "string" ||
        !["planned", "completed", "cancelled"].includes(body.status)
    ) {
        errors.push({
            field: "status",
            message: "Status must be planned, completed, or cancelled",
        });
    }

    if (
        body.exercises !== undefined &&
        !Array.isArray(body.exercises)
    ) {
        errors.push({
            field: "exercises",
            message: "Exercises must be an array",
        });
    }

    if (
        body.notes !== undefined &&
        typeof body.notes !== "string"
    ) {
        errors.push({
            field: "notes",
            message: "Notes must be a string",
        });
    }

    return errors;
}


export function validateWorkoutUpdate(body) {
    const errors = [];

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return [
            {
                field: "body",
                message: "Request body must be a JSON object",
            },
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

    if (Object.keys(body).length === 0) {
        errors.push({
            field: "body",
            message: "At least one field must be provided",
        });
    }

    if (
        body.userID !== undefined &&
        (typeof body.userID !== "string" || body.userID.trim() === "")
    ) {
        errors.push({
            field: "userID",
            message: "User ID must not be empty",
        });
    }

    if (
        body.name !== undefined &&
        (typeof body.name !== "string" || body.name.trim() === "")
    ) {
        errors.push({
            field: "name",
            message: "Name must not be empty",
        });
    }

    if (
        body.description !== undefined &&
        (typeof body.description !== "string" ||
            body.description.trim() === "")
    ) {
        errors.push({
            field: "description",
            message: "Description must not be empty",
        });
    }

    if (
        body.date !== undefined &&
        (typeof body.date !== "string" ||
            Number.isNaN(Date.parse(body.date)))
    ) {
        errors.push({
            field: "date",
            message: "A valid date is required",
        });
    }

    if (
        body.status !== undefined &&
        (typeof body.status !== "string" ||
            !["planned", "completed", "cancelled"].includes(body.status))
    ) {
        errors.push({
            field: "status",
            message: "Status must be planned, completed, or cancelled",
        });
    }

    if (
        body.exercises !== undefined &&
        !Array.isArray(body.exercises)
    ) {
        errors.push({
            field: "exercises",
            message: "Exercises must be an array",
        });
    }

    if (
        body.notes !== undefined &&
        typeof body.notes !== "string"
    ) {
        errors.push({
            field: "notes",
            message: "Notes must be a string",
        });
    }

    return errors;
}