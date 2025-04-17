import { getWorks } from "@/lib/works"

// Generate static params for all chapters of all works
export function generateStaticParams() {
  const works = getWorks()

  // Create an array of all possible [slug, chapter] combinations
  const params = works.flatMap((work) =>
    Array.from({ length: work.chapterCount }, (_, i) => ({
      slug: work.slug,
      chapter: String(i + 1),
    })),
  )

  return params
}
