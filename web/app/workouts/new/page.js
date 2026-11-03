"use client";

import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation"



export default function NewWorkoutPage() {

    const router = useRouter();

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage]= useState("")

    async function handleSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        setSubmitting(true)
        setErrors({})
        setMessage("")

        try {
            const response = await fetch("/api/workouts", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: form.get("userID"),
                    name: form.get("name"),
                    description: form.get("description"),
                    date: form.get("date"),
                    status: form.get("status"),
                    exercises: [],
                    notes: form.get("notes")
                })
            })
            const data = await response.json();

            if (!response.ok) {
                const fieldErrors = {}

                for (const error of data.error?.details ?? []) {
                    fieldErrors[error.field] = error.message;
                }

                setErrors(fieldErrors)
                setMessage(data.error?.message ?? "Unable to create workout")
                return;
            }

            router.push(`/workouts/${data.id}`)
            router.refresh()
        }
        catch (error){
            setMessage("Unable to connect to API")
        }
        finally {
            setSubmitting(false)
        }
    }



    return (
        <main>
            <h1>Create new Workout</h1>
            <p>Create a new workout to add to the tracker.</p>


            {/* <br></br>INSERT THE NEW FORM HERE<br></br> */}
            {message && <p role="alert">{message}</p>}
            <form onSubmit={handleSubmit} noValidate>

                <div>
                    <label htmlFor="userID">User ID</label>
                    <input id="userID" name="userID" defaultValue="001"/>
                    {errors.userID && <p>{errors.userID}</p>}
                </div>

                <div>
                     <label htmlFor="name">Workout Name</label>
                    <input id="name" name="name"/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                     <label htmlFor="description">description</label>
                    <input id="description" name="description"/>
                    {errors.description && <p>{errors.description}</p>}
                </div>

                <div>
                     <label htmlFor="date">date</label>
                    <input id="date" name="date" type="date"/>
                    {errors.date && <p>{errors.date}</p>}
                </div>

                <div>
                     <label htmlFor="status">status</label>
                    <select id="status" name="status" defaultValue="planned">
                        <option value="planned">Planned</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">cancelled</option>
                    </select>

                    {errors.status && <p>{errors.status}</p>}
                </div>

                <div>
                     <label htmlFor="notes">Notes</label>
                    <textarea id="notes" name="notes"/>
                    {errors.notes && <p>{errors.notes}</p>}
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting ? "Saving" : "Create workout"}

                </button>

                {errors.body && <p>{errors.body}</p>}
            </form>



            <Link href="/workouts">Back to Workouts</Link>
        </main>
    );
}