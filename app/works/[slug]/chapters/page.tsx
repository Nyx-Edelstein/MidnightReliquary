import { getWorkBySlug, getWorks } from "@/lib/works"
import { notFound } from "next/navigation"
import ChaptersPageClient from "./ChaptersPageClient"

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

  return <ChaptersPageClient work={work} />
}
