import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>That page or event does not exist. The event may have been removed.</p>
      <Link href="/">Go Home</Link>
    </section>
  );
}