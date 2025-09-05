"use client";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
	const { theme, setTheme } = useTheme();
	return (
		<header className="sticky top-0 z-40 border-b bg-white/70 dark:bg-black/40 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
				<Link href="/" className="text-lg font-semibold">The Govind Pathak Academy</Link>
				<nav className="flex items-center gap-4">
					<Link href="/courses" className="hover:underline">Courses</Link>
					<Link href="/about" className="hover:underline">About</Link>
					<Link href="/contact" className="hover:underline">Contact</Link>
					<button
						className="rounded border px-2 py-1 text-sm"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? "Light" : "Dark"}
					</button>
				</nav>
			</div>
		</header>
	);
}


