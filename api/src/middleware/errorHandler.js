export function notFoundHandler(req, res, next) {
    res.status(404).json({
        error: {
            message: "Route not found",
            details: null,
        },
    });
}

export function errorHandler(err, req, res, next) {
    const status = err.status || err.statusCode || 500;

    if (status >= 500) {
        console.error(err.stack || err);
    }

    res.status(status).json({
        error: {
            message:
                status >= 500
                    ? "Internal server error"
                    : err.message || "Request failed",
            details: status >= 500 ? null : err.details ?? null,
        },
    });
}