"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWorkoutButton({ workoutID }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        const confirmed = window.confirm("Are you sure you want to delete this workout?");
        if (!confirmed) {
            return;
        }
        setIsDeleting(true);
        setError("");

        try {
            const response = await fetch(`/api/workouts/${workoutID}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new error("Unable to delete workout.")
            }

            router.push("/workouts");
            router.refresh();
        } catch (error) {
            setError (error.message);
            setIsDeleting(false);
        }
    }

    return (
        <div>
            <button onClick={handleDelete} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete Workout"}</button>
            {error && <p>{error}</p>}
        </div>
    );
}