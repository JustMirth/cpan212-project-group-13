"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function EditWorkoutForm({ workout}) {
    
    const router = useRouter();

    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {

        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setSubmitting(true)
        setErrors({})
        setMessage("")

        try {
            const response = await fetch (`/api/workouts/${workout.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: form.get("name"),
                    description: form.get("description"),
                    date: form.get("date"),
                    status: form.get("status"),
                    notes: form.get("notes")
                })
            })

            const date = await response.json()

            if (!response.ok) {
                const fieldErrors = {}

                for (const error of data.error?.details ?? []) {
                    
                    fieldErrors[error.field] = error.message;

                }

                setErrors(fieldErrors);
                setMessage(data.error?.message ?? "unable to update workout");
                return

            }

            router.push(`/workouts`);
            router.refresh();
        }
        catch (error) {
            setMessage("unable to connect to API")
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>

            {message && <p role="alert">{message}</p>}

            <div>
                <label htmlFor="name">Workout name</label>
                <input id="name" name="name" defaultValue={workout.name}/>
                {errors.name && <p>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" defaultValue={workout.description}/>
                {errors.description && <p>{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" defaultValue={workout.status}>
                    <option value="planned">Planned</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">cancelled</option>
                </select>
                {errors.status && <p>{errors.status}</p>}
            </div>

            <div>
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" defaultValue={workout.notes ?? ""}/>
                {errors.notes && <p>{errors.notes}</p>}
            </div>

            {errors.body && <p>{errors.body}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? "Saving.." : "Save changes"}
            </button>
            
        </form>
    )
}