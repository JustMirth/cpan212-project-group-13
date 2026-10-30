import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WorkoutApp",
  description: "Manage your Workout and Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header>
          <h1>WorkoutApp</h1>

          <nav>
            <Link href="/workouts">Workouts</Link>
            <Link href="/workouts/new">Create New Workout</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
