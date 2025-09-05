"use client";
import { useState } from "react";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const res = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) throw new Error("Invalid credentials");
			window.location.href = "/admin/dashboard";
		} catch (err) {
			const message = err instanceof Error ? err.message : "Login failed";
			setError(message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="mx-auto max-w-md px-4 py-10">
			<h1 className="text-2xl font-semibold">Admin Login</h1>
			<form onSubmit={onSubmit} className="mt-6 space-y-4">
				<input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				{error && <p className="text-sm text-red-600">{error}</p>}
				<button disabled={loading} className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
			</form>
		</section>
	);
}


