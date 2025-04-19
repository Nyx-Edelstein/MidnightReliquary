import { getWorkBySlug, getWorks, getTitleBlurbContent } from "@/lib/works"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReadingProgressWidget } from "@/components/reading-progress-widget"

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

  // Get title blurb content
  const titleBlurbContent = getTitleBlurbContent(params.slug)

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

      {/* Reading Progress Widget */}
      <ReadingProgressWidget
        workSlug={work.slug}
        workTitle={work.title}
        chapterCount={work.chapterCount}
        firstChapterOrder={firstChapterOrder}
        chapters={work.chapters || []}
      />

      {/* Title Blurb */}
      {titleBlurbContent && (
        <div className="prose dark:prose-invert mb-8">
          <div dangerouslySetInnerHTML={{ __html: titleBlurbContent }} />
        </div>
      )}
    </div>
  )
}
