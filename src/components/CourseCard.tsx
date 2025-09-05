import Link from "next/link";

type Props = {
	slug: string;
	title: string;
	description: string;
	priceInRupees: number;
};

export default function CourseCard({ slug, title, description, priceInRupees }: Props) {
	return (
		<div className="rounded-lg border p-4 transition-shadow hover:shadow-md">
			<div className="aspect-video w-full rounded bg-gray-200 dark:bg-gray-800" />
			<h3 className="mt-3 text-lg font-semibold">{title}</h3>
			<p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
			<div className="mt-3 flex items-center justify-between">
				<span className="font-medium">₹{priceInRupees}</span>
				<Link href={`/course/${slug}`} className="rounded border px-3 py-1 text-sm">View</Link>
			</div>
		</div>
	);
}


