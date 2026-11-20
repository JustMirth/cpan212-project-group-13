import Link from "next/link";
import DeleteWorkoutButton from "@/components/DeleteWorkoutButton";
import NotificationMessage from "@/components/NotificationMessage";
import { Suspense } from "react";
import Loading from "./loading";

export default async function WorkoutPages( searchParams ) {
    const params = await searchParams;

    const status = params.status ?? "";
    const sort = params.sort ?? "date";
    const page = params.page ?? "1";
    const limit = params.limit ?? "10";

    let workouts;
    // const delay = (ms) => new Promise(resolve=>setTimeout(resolve,ms))
    // uncomment to use fake delay
    try {
        // await delay(2000)
        // uncomment to use fake delay
        const response = await fetch(
            `${process.env.API_URL}/api/workouts?${new URLSearchParams({
                ...(status && { status }),
                sort,
                page,
                limit,
            })}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve workouts");
        }

        const data = await response.json();
        workouts = data.items;
    } catch (error) {
        throw new Error("Unable to load workouts. Please try again later.");
    }

    return (
        <main>
            <NotificationMessage />
            <h1>My Workouts</h1>

            <Link href="/workouts/new">Create new Workout</Link>
            <form method="GET" action="/workouts">
                <label htmlFor="status">Fiter bt Status: </label>
                <select id="status" name="status" defaultValue={status}>
                    <option value="">All statuses</option>
                    <option value="planned">Planned</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <label htmlFor="sort">Sort by: </label>
                <select id="sort" name="sort" defaultValue={sort}>
                    <option value="date">Date (Oldest First)</option>
                    <option value="-date">Date (Newest First)</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="-name">Name (Z-A)</option>
                    <option value="createdAt">Date Created (Oldest First)</option>
                    <option value="-createdAt">Date Created (Newest First)</option>
                </select>

                <input type="hidden" name="limit" value={limit} />
                <button type="submit">Apply</button>
            </form>

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