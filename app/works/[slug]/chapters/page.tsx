import { getWorks, getWorkBySlug } from "@/lib/works"
import Link from "next/link"
import { notFound } from "next/navigation"

// Generate static params for all works
export function generateStaticParams() {
  const works = getWorks()
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export default function ChaptersPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug)

  if (!work) {
    notFound()
  }

  // Sort chapters by order
  const sortedChapters = [...(work.chapters || [])].sort((a, b) => a.order - b.order)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href={`/works/${work.slug}/`} className="text-primary hover:underline">
          ← Back to {work.title}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Table of Contents</h1>

      <div className="border border-border rounded-lg divide-y divide-border">
        {sortedChapters.length > 0 ? (
          sortedChapters.map((chapter) => (
            <Link
              key={chapter.order}
              href={`/works/${work.slug}/chapters/${chapter.order}/`}
              className="block p-4 hover:bg-accent transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{chapter.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter.wordCount ? `~${chapter.wordCount} words` : ""}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="p-4 text-gray-500 dark:text-gray-400">No chapters available.</p>
        )}
      </div>

      {work.totalWordCount && (
        <div className="mt-4 text-right text-sm text-gray-500 dark:text-gray-400">
          Total: ~{work.totalWordCount} words
        </div>
      )}
    </div>
  )
}
