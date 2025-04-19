import { getWorks, getWorkBySlug, getUpdateInfoContent } from "@/lib/works"
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
    title: `${work.title} - Publication Status`,
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

  // Get update info content
  const updateInfoContent = getUpdateInfoContent(params.slug)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href={`/works/${work.slug}/`} className="text-primary hover:underline">
          ← Back to {work.title}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Publication Status</h1>

      <div className="border border-border rounded-lg p-6">
        <div className="flex items-start gap-3 mb-6">
          <Calendar className="h-5 w-5 mt-0.5 text-gray-500" />
          <div>
            <p className="font-medium">Last Updated</p>
            <p className="text-gray-500 dark:text-gray-400">{lastUpdated}</p>
          </div>
        </div>

        <div className="prose dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: updateInfoContent }} />
        </div>
      </div>
    </div>
  )
}
