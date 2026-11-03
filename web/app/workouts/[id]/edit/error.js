'use client';

import { useEffect } from 'react';

export default function EventsError({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  function handleClick() {
    retry();
  }

  return (
    <section role="alert">
      <h1>Something went wrong</h1>
      <p>The events could not be loaded. Try again in a moment.</p>
      <button type="button" onClick={handleClick}>
        Try again
      </button>
    </section>
  );
}