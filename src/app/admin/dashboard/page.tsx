import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
	await connectToDatabase();
	const courses = await Course.find().sort({ createdAt: -1 }).lean();
	return (
		<section className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-2xl font-semibold">Course Manager</h1>
			<div className="mt-6 grid gap-4">
				{courses.map((c: any) => (
					<div key={c._id} className="rounded border p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">{c.title}</p>
								<p className="text-sm text-gray-500">/{c.slug} • ₹{c.priceInRupees} • {c.isLive ? "Live" : "Draft"}</p>
							</div>
							<a href={`/course/${c.slug}`} className="rounded border px-3 py-1 text-sm">View</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}


