import {
  getWorks,
  getWorkBySlug,
  getChapterContent,
  getChapterByOrder,
  getNextChapterOrder,
  getPrevChapterOrder,
} from "@/lib/works"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChapterSelect } from "@/components/chapter-select"
import { notFound } from "next/navigation"

// Generate static params for all chapters of all works
export async function generateStaticParams() {
  const works = getWorks()

  return works.flatMap((work) => {
    if (work.chapters && work.chapters.length > 0) {
      return work.chapters.map((chapter) => ({
        slug: work.slug,
        chapter: String(chapter.order),
      }))
    }

    // Fallback for works without chapter metadata
    return Array.from({ length: work.chapterCount }, (_, i) => ({
      slug: work.slug,
      chapter: String(i + 1),
    }))
  })
}

export function generateMetadata({ params }: { params: { slug: string; chapter: string } }): Metadata {
  const slug = params.slug
  const chapterNum = Number.parseInt(params.chapter, 10)
  const work = getWorkBySlug(slug)

  if (!work) {
    return { title: "Chapter Not Found" }
  }

  const chapter = getChapterByOrder(work, chapterNum)
  const title = chapter ? chapter.title : `Chapter ${chapterNum}`

  return {
    title: `${work.title} - ${title}`,
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
  const chapter = getChapterByOrder(work, chapterNum)
  const chapterTitle = chapter ? chapter.title : `Chapter ${chapterNum}`

  const prevChapterOrder = getPrevChapterOrder(work, chapterNum)
  const nextChapterOrder = getNextChapterOrder(work, chapterNum)

  const isFirstChapter = prevChapterOrder === undefined
  const isLastChapter = nextChapterOrder === undefined

  // Script to save progress immediately when page loads
  const saveProgressScript = `
    document.addEventListener('DOMContentLoaded', function() {
      try {
        localStorage.setItem('reading-progress-${slug}', '${chapterNum}');
        console.log('Saved progress for ${slug}: chapter ${chapterNum} (inline)');
      } catch (e) {
        console.error('Failed to save reading progress:', e);
      }
    });
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
          <Link href={`/works/${slug}/`}>← Start</Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={isFirstChapter}
          asChild={!isFirstChapter}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-3 min-w-[40px]"
        >
          {isFirstChapter ? <span>←</span> : <Link href={`/works/${slug}/chapters/${prevChapterOrder}/`}>←</Link>}
        </Button>
      </div>

      {/* Chapter dropdown */}
      <div className="mx-2">
        {work.chapters && work.chapters.length > 0 ? (
          <ChapterSelect currentChapter={chapterNum} chapters={work.chapters} workSlug={slug} />
        ) : (
          <div className="w-[110px] bg-zinc-800 text-white border-zinc-700 rounded-full px-3 py-1 text-center">
            Chapter {chapterNum}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLastChapter}
          asChild={!isLastChapter}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-3 min-w-[40px]"
        >
          {isLastChapter ? <span>→</span> : <Link href={`/works/${slug}/chapters/${nextChapterOrder}/`}>→</Link>}
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-4"
        >
          <Link href={`/works/${slug}/progress/`}>End →</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-3xl"
      data-chapter-page
      data-work-slug={slug}
      data-chapter-order={chapterNum}
    >
      {/* Inline script to save progress immediately */}
      <script dangerouslySetInnerHTML={{ __html: saveProgressScript }} />

      {/* Work title */}
      <h1 className="text-2xl font-bold mb-2 text-center">{work.title}</h1>

      {/* Chapter title and horizontal rule */}
      <h2 className="text-xl text-center mb-2">{chapterTitle}</h2>
      <hr className="mb-6 border-t border-gray-300 dark:border-gray-700" />

      {/* Navigation buttons */}
      <ChapterNavigation />

      {/* Chapter content */}
      <div className="my-8 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
      </div>

      <ChapterNavigation />
    </div>
  )
}
