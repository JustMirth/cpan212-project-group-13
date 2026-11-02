"use client";

import { useNotification } from "./NotificationContext";

export default function NotificationMessage() {
    const { notification, setNotification } = useNotification();

    if (!notification) {
        return null;
    }

    return (
        <div>
            <p>{notification}</p>
            <button onClick={() => setNotification("")}>Dismiss</button>
        </div>
    );
}