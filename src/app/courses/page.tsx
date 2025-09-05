import Course from "@/models/Course";
import { connectToDatabase } from "@/lib/db";
import CourseCard from "@/components/CourseCard";

export const dynamic = "force-dynamic";

type LeanCourse = { _id?: string; slug: string; title: string; description: string; priceInRupees: number };

export default async function CoursesPage() {
	const hasDb = Boolean(process.env.MONGODB_URI);
	let courses: LeanCourse[] = [];
	if (hasDb) {
		await connectToDatabase();
		courses = await Course.find({ isLive: true }).lean();
	}
	return (
		<section className="mx-auto max-w-6xl px-4 py-10">
			<h2 className="text-2xl font-semibold">All Courses</h2>
			{!hasDb && (
				<p className="mt-2 text-sm text-amber-600">Database not configured. Add MONGODB_URI in .env.local to load live courses. Showing placeholders.</p>
			)}
			<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{courses.length > 0 ? (
					courses.map((c: LeanCourse) => (
						<CourseCard key={c._id} slug={c.slug} title={c.title} description={c.description} priceInRupees={c.priceInRupees} />
					))
				) : (
					<>
						<CourseCard slug="crystal-energy-healing-mastery" title="Crystal Energy Healing Mastery" description="PDF + Audio lessons with bonuses." priceInRupees={999} />
						<CourseCard slug="energy-clearing-starter" title="Energy Clearing Starter" description="Quick start guide to energy clearing." priceInRupees={499} />
					</>
				)}
			</div>
		</section>
	);
}


