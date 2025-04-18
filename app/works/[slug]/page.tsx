import { getWorkBySlug, getWorks } from "@/lib/works"
import Link from "next/link"
import { notFound } from "next/navigation"

// Generate static params for all works
export function generateStaticParams() {
  const works = getWorks()
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug)

  if (!work) {
    notFound()
  }

  // Get the first chapter order
  const firstChapterOrder =
    work.chapters && work.chapters.length > 0 ? work.chapters.sort((a, b) => a.order - b.order)[0].order : 1

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{work.title}</h1>

      <div className="prose dark:prose-invert mb-8">
        <p>{work.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          href={`/works/${work.slug}/chapters/`}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md text-center"
        >
          Table of Contents
        </Link>

        <a
          href="#"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md text-center"
          data-start-reading
          data-slug={work.slug}
          data-first-chapter={firstChapterOrder}
        >
          Start Reading
        </a>

        <Link
          href={`/works/${work.slug}/progress/`}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md text-center"
        >
          Current Progress
        </Link>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="text-xl font-semibold mb-4">About This Work</h2>
        <div className="prose dark:prose-invert">
          <p>{work.description}</p>
          <p>
            This work contains {work.chapterCount} {work.chapterCount === 1 ? "chapter" : "chapters"}.
          </p>
        </div>
      </div>
    </div>
  )
}
