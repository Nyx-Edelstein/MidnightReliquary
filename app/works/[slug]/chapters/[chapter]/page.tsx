import { getWorks, getWorkBySlug } from "@/lib/works"
import type { Metadata } from "next"
import ChapterClientPage from "./ChapterClientPage"

export async function generateStaticParams() {
  const works = getWorks()

  return works.flatMap((work) =>
    Array.from({ length: work.chapterCount }, (_, i) => ({
      slug: work.slug,
      chapter: (i + 1).toString(),
    })),
  )
}

export function generateMetadata({ params }: { params: { slug: string; chapter: string } }): Metadata {
  const slug = params.slug as string
  const chapter = params.chapter as string
  const work = getWorkBySlug(slug)

  return {
    title: work ? `${work.title} - Chapter ${chapter}` : "Chapter Not Found",
  }
}

export default function ChapterPage() {
  return <ChapterClientPage />
}
