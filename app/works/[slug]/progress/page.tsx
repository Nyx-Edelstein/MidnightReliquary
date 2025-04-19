import { getWorks, getWorkBySlug } from "@/lib/works"
import type { Metadata } from "next"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const works = getWorks()
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const work = getWorkBySlug(params.slug)

  if (!work) {
    return {
      title: "Work Not Found",
    }
  }

  return {
    title: `${work.title} - Progress`,
  }
}

export default function ProgressPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug)

  if (!work) {
    notFound()
  }

  // Format dates for display
  const lastUpdated =
    work.lastUpdated ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // Calculate next update if not provided
  const nextUpdateDate = work.nextUpdate ? new Date(work.nextUpdate) : new Date()
  if (!work.nextUpdate) {
    nextUpdateDate.setDate(nextUpdateDate.getDate() + 14)
  }

  const nextUpdateFormatted = nextUpdateDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href={`/works/${work.slug}/`} className="text-primary hover:underline">
          ← Back to {work.title}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Publication Status</h1>

      <div className="border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Publication Schedule</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 mt-0.5 text-gray-500" />
            <div>
              <p className="font-medium">Last Updated</p>
              <p className="text-gray-500 dark:text-gray-400">{lastUpdated}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 mt-0.5 text-gray-500" />
            <div>
              <p className="font-medium">Next Update Expected</p>
              <p className="text-gray-500 dark:text-gray-400">{nextUpdateFormatted}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This work is currently {work.chapterCount < 10 ? "in progress" : "complete"}.
              {work.chapterCount < 10 && " New chapters are published every two weeks."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
