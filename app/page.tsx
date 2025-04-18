import { getWorks } from "@/lib/works"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const works = getWorks()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Creative Writing Collection</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About This Site</h2>
        <div className="prose dark:prose-invert">
          <p>
            Welcome to my creative writing collection. This site hosts various works of fiction that I've written over
            time. Feel free to explore the different stories and chapters.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Available Works</h2>

        {works.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No works available yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {works.map((work) => (
              <div
                key={work.slug}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-medium mb-2">{work.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{work.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {work.chapterCount} {work.chapterCount === 1 ? "chapter" : "chapters"}
                  </span>
                  <Link href={`/works/${work.slug}/`} className="flex items-center text-primary hover:underline">
                    Read <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
