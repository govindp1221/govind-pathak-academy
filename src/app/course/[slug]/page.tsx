import Course from "@/models/Course";
import { connectToDatabase } from "@/lib/db";
import Link from "next/link";
import UpiPay from "@/components/UpiPay";

type Params = { params: Promise<{ slug: string }> };

export default async function CourseDetailPage({ params }: Params) {
	const { slug } = await params;
	const hasDb = Boolean(process.env.MONGODB_URI);
	let course: any = null;
	if (hasDb) {
		await connectToDatabase();
		course = await Course.findOne({ slug }).lean();
		if (!course) return <div className="mx-auto max-w-3xl px-4 py-12">Course not found.</div>;
	} else {
		// Minimal placeholder when DB isn't configured
		course = {
			slug,
			title: "Crystal Energy Healing Mastery",
			description: "PDF + Audio based course with bonuses.",
			priceInRupees: 999,
			content: { pdfUrls: [], audioUrls: [], bonuses: [] },
		};
	}
	return (
		<section className="mx-auto max-w-3xl px-4 py-10">
			<h1 className="text-3xl font-bold">{course.title}</h1>
			<p className="mt-3 text-gray-600 dark:text-gray-300">{course.description}</p>
			<ul className="mt-4 list-disc pl-5 text-sm">
				<li>PDFs: {course.content?.pdfUrls?.length || 0}</li>
				<li>Audio Lessons: {course.content?.audioUrls?.length || 0}</li>
				<li>Bonuses: {course.content?.bonuses?.length || 0}</li>
			</ul>
			<div className="mt-6 flex items-center gap-3">
				<span className="text-xl font-semibold">₹{course.priceInRupees}</span>
				<Link href={`/success?course=${course.slug}`} className="rounded border px-5 py-3">Preview Success</Link>
			</div>
			<UpiPay amountInRupees={course.priceInRupees} courseSlug={course.slug} courseTitle={course.title} />
		</section>
	);
}


