import Image from "next/image";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">The Govind Pathak Academy</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Premium PDF + Audio courses. Start with Crystal Energy Healing Mastery.</p>
          <div className="mt-6 flex gap-3">
            <a href="/courses" className="rounded bg-black px-5 py-3 text-white dark:bg-white dark:text-black">Explore Courses</a>
            <a href="/contact" className="rounded border px-5 py-3">Contact</a>
          </div>
        </div>
        <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
    </section>
  );
}
