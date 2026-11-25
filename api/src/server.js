import express from "express";
import workoutRoutes from "./routes/workoutRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import wgerRoutes from "./routes/wgerRoutes.js";        //wger import
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

await connectDb();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Workout API", 
    });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/wger", wgerRoutes)    //external API route

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
