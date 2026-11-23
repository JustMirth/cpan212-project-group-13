"use client";

import { useRouter } from "next/navigation";

export default function WorkoutFilters({ status, sort, limit }) {
    const router = useRouter();

    function handleSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const params = new URLSearchParams({
            sort: form.get("sort"),
            page: "1",
            limit,
        });

        const selectedStatus = form.get("status");

        if (selectedStatus) {
            params.set("status", selectedStatus);
        }

        router.push(`/workouts?${params.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="status">Filter by Status: </label>
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

            <button type="submit">Apply</button>
        </form>
    );
}