import Link from "next/link";

export default function NewWorkoutPage() {
    return (
        <main>
            <h1>Create new Workout</h1>
            <p>Create a new workout to add to the tracker.</p>
            <br></br>INSERT THE NEW FORM HERE<br></br>
            <Link href="/workouts">Back to Workouts</Link>
        </main>
    );
}