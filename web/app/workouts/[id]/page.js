import Link from "next/link";
import { notFound } from "next/navigation";

export default async function WorkoutDetailPage({ params }){
    const { id } = await params;

    let response;

    try {
        response = await fetch(
            `${process.env.API_URL}/api/workouts/${id}`,
            { cache: "no-store" }
        );
    } catch (error) {
        return (
            <main>
                <h1>Workout Details</h1>
                <p>Unable to connect to the API. Please try again later</p>
                <Link href="/workouts">Back to Workouts</Link>
            </main>
        );
    }

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        return (
            <main>
                <h1>Workout Details</h1>
                <p>Unable to load this workout. Please try again later</p>
                <Link href="/workouts">Back to Workouts</Link>
            </main>
        );
    }

    const workout = await response.json();

    return (
        <main>
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

            <br />

            <Link href="/workouts">Back to Workouts</Link>
        </main>
    );
}