import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteWorkoutButton from "@/components/DeleteWorkoutButton";
import NotificationMessage from "@/components/NotificationMessage";

export default async function WorkoutDetailPage({ params }){
    const { id } = await params;

    let response;

    try {
        response = await fetch(
            `${process.env.API_URL}/api/workouts/${id}`,
            { cache: "no-store" }
        );
    } catch (error) {
        throw new Error("Unable to connect to the API. Please try again later");
    }

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error("Unable to load this workout. Please try again later");
        
    }

    const workout = await response.json();

    return (
        <main>
            <NotificationMessage />
            <h1>{workout.name}</h1>
            <p>{workout.description}</p>
            <p>Date: {workout.date}</p>
            <p>Status: {workout.status}</p>
            <h2>Exercises</h2>
            {workout.exercises.length === 0 ? (
                <p>No exercises have been added to this workout.</p>
            ) : (
                <ul>
                    {workout.exercises.map((exercise) => (
                        <li key={exercise.id}>{exercise.exerciseName}</li>
                    ))}
                </ul>
            )}

            <h2>Notes</h2>
            <p>{workout.notes || "No notes available"}</p>
            <Link href={`/workouts/${workout.id}/edit`}>Edit Workout</Link>
            <DeleteWorkoutButton workoutID={workout.id} workoutName={workout.name} />
            <br />
            <Link href="/workouts">Back to Workouts</Link>
        </main>
    );
}