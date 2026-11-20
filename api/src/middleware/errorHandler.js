export function notFoundHandler(req, res, next) {
    res.status(404).json({
        error: {
            message: "Route not found",
            details: null,
        },
    });
}

export function errorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            error: {
                message: "Validation failed",
                details,
            },
        });
    }

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
            error: {
                message: "Resource not found",
                details: null,
            },
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue ?? {})[0];
        return res.status(400).json({
            error: {
                message: `Duplicate value'`,
                details: [
                    {
                        field: field ?? "unknown",
                        message: `${field ?? "Field"} must be unique`,
                    }
                ]
            },
        });
    }

    const status = err.status || err.statusCode || 500;
    if (status >= 500) {
        console.error(err.stack || err);
    }

    res.status(status).json({
        error: {
            message:
                status >= 500
                    ? "Internal server error"
                    : err.message || "An error occurred",
            details: status >= 500 ? null : err.details ?? null,
        },
    });
}