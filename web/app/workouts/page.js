import Link from "next/link";
import DeleteWorkoutButton from "@/components/DeleteWorkoutButton";
import NotificationMessage from "@/components/NotificationMessage";
import { Suspense } from "react";
import Loading from "./(list)/loading";

export default async function WorkoutPages() {
    let workouts;

    try {
        const response = await fetch(
            `${process.env.API_URL}/api/workouts`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve workouts");
        }

        workouts = await response.json();
    } catch (error) {
        throw new Error("Unable to load workouts. Please try again later.");
    }

    return (
        <main>
            <NotificationMessage />
            <h1>My Workouts</h1>

            <Link href="/workouts/new">Create new Workout</Link>

            {workouts.length === 0 ? (
                <p>No workouts found. Create your first workout!</p>
            ) : (
                <section>
                    <Suspense fallback={<Loading/>}>

                    {workouts.map((workout) => (
                        <article key={workout.id}>
                            <h2>{workout.name}</h2>
                            <p>{workout.description}</p>
                            <p>Date: {workout.date}</p>
                            <p>Status: {workout.status}</p>
                            <Link href={`/workouts/${workout.id}`}>View Workout</Link>
                            <DeleteWorkoutButton workoutID={workout.id} workoutName={workout.name} />
                        </article>
                    ))}
                    </Suspense>
                </section>
            )}
        </main>
    );
}