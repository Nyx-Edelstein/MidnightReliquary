import { getWorks, getWorkBySlug, getChapterContent } from "@/lib/works"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Generate static params for all chapters of all works
export async function generateStaticParams() {
  const works = getWorks()

  return works.flatMap((work) =>
    Array.from({ length: work.chapterCount }, (_, i) => ({
      slug: work.slug,
      chapter: String(i + 1),
    })),
  )
}

export function generateMetadata({ params }: { params: { slug: string; chapter: string } }): Metadata {
  const slug = params.slug
  const chapter = params.chapter
  const work = getWorkBySlug(slug)

  return {
    title: work ? `${work.title} - Chapter ${chapter}` : "Chapter Not Found",
  }
}

export default function ChapterPage({ params }: { params: { slug: string; chapter: string } }) {
  const slug = params.slug
  const chapterNum = Number.parseInt(params.chapter, 10)

  const work = getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  const chapterContent = getChapterContent(slug, chapterNum)
  const isFirstChapter = chapterNum === 1
  const isLastChapter = chapterNum === work.chapterCount

  // Client-side script to save reading progress
  const saveProgressScript = `
    (function() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('reading-progress-${slug}', '${chapterNum}');
      }
    })();
  `

  const ChapterNavigation = () => (
    <div className="flex justify-center items-center py-4 gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-4"
        >
          <Link href={`/works/${slug}`}>← Start</Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={isFirstChapter}
          asChild={!isFirstChapter}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-3 min-w-[40px]"
        >
          {isFirstChapter ? <span>←</span> : <Link href={`/works/${slug}/chapters/${chapterNum - 1}`}>←</Link>}
        </Button>
      </div>

      {/* Chapter dropdown - will be enhanced with client JS */}
      <div className="mx-2">
        <div className="w-[110px] bg-zinc-800 text-white border-zinc-700 rounded-full px-3 py-1 text-center">
          Chapter {chapterNum}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLastChapter}
          asChild={!isLastChapter}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-3 min-w-[40px]"
        >
          {isLastChapter ? <span>→</span> : <Link href={`/works/${slug}/chapters/${chapterNum + 1}`}>→</Link>}
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-4"
        >
          <Link href={`/works/${slug}/progress`}>End →</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Work title */}
      <h1 className="text-2xl font-bold mb-2 text-center">{work.title}</h1>

      {/* Chapter title and horizontal rule */}
      <h2 className="text-xl text-center mb-2">Chapter {chapterNum}</h2>
      <hr className="mb-6 border-t border-gray-300 dark:border-gray-700" />

      {/* Navigation buttons */}
      <ChapterNavigation />

      {/* Chapter content */}
      <div className="my-8 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
      </div>

      <ChapterNavigation />

      {/* Script to save reading progress */}
      <script dangerouslySetInnerHTML={{ __html: saveProgressScript }} />
    </div>
  )
}
