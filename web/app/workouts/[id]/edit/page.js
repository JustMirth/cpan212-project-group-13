import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditWorkoutPage({ params }) {
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
        <h1>Edit Workout</h1>
        <p>Unable to connect to the API. Please try again later.</p>
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
        <h1>Edit Workout</h1>
        <p>Unable to load this workout. Please try again later.</p>
        <Link href="/workouts">Back to Workouts</Link>
      </main>
    );
  }

  const workout = await response.json();

  return (
    <main>
      <h1>Edit Workout</h1>
      <p>Update the details for your workout below.</p>
      <br></br>INSERT THE NEW FORM HERE<br></br>
      <Link href={`/workouts/${workout.id}`}>Back to Workout Details</Link>
    </main>
  );
}