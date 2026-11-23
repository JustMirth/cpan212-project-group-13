import Link from "next/link";
import DeleteWorkoutButton from "@/components/DeleteWorkoutButton";
import NotificationMessage from "@/components/NotificationMessage";
import WorkoutFilters from "@/components/WorkoutFilters";
import { Suspense } from "react";
import Loading from "./loading";

export default async function WorkoutPages({ searchParams }) {
    const params = await searchParams;

    const status = params.status ?? "";
    const sort = params.sort ?? "date";
    const page = params.page ?? "1";
    const limit = params.limit ?? "10";

    let currentPage
    let totalPages
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

        currentPage = data.page;
        totalPages = data.pages;
    } catch (error) {
        throw new Error("Unable to load workouts. Please try again later.");
    }

    return (
        <main>
            <NotificationMessage />
            <h1>My Workouts</h1>

            <Link href="/workouts/new">Create new Workout</Link>
            <WorkoutFilters
                status={status}
                sort={sort}
                limit={limit}
            />

            {workouts.length === 0 ? (
                <p>No workouts found. Create your first workout!</p>
            ) : (
                <section>
                    <Suspense fallback={<Loading/>}>

                    {workouts.map((workout) => (
                        <article key={workout._id}>
                            <h2>{workout.name}</h2>
                            <p>{workout.description}</p>
                            <p>Date: {workout.date}</p>
                            <p>Status: {workout.status}</p>
                            <Link href={`/workouts/${workout._id}`}>View Workout</Link>
                            <DeleteWorkoutButton workoutID={workout._id} workoutName={workout.name} />
                        </article>
                    ))}
                    </Suspense>

                    <nav aria-label="Workout pagination">
                        <p>
                            Page {currentPage} of {totalPages}
                        </p>

                        {currentPage > 1 && (
                            <Link
                                href={`/workouts?${new URLSearchParams({
                                    ...(status && { status }),
                                    sort,
                                    page: String(currentPage -1),
                                    limit,
                                })}`}
                            > Previous 
                            </Link>
                            )}

                            {" "}

                            {currentPage < totalPages && (
                                <Link
                                    href={`/workouts?${new URLSearchParams({
                                        ...(status && { status }),
                                        sort,
                                        page: String(currentPage + 1),
                                        limit,
                                    })}`}
                                > Next
                                </Link>
                            )}
                    </nav>
                </section>
            )}
        </main>
    );
}