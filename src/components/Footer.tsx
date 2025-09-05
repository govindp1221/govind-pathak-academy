import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 dark:text-gray-300">
				<div className="flex items-center justify-between">
					<p>© {new Date().getFullYear()} The Govind Pathak Academy</p>
					<Link href="https://wa.me/919999999999" className="fixed bottom-4 right-4 rounded-full bg-green-500 px-4 py-3 font-medium text-white shadow-lg">WhatsApp</Link>
				</div>
			</div>
		</footer>
	);
}


