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
    throw new Error("Unable to connect to the API. Please try again later.");
    
  }

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load this workout. Please try again later.");
    
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