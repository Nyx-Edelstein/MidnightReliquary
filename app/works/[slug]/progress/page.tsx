import { getWorks, getWorkBySlug } from "@/lib/works"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

  // Client-side script to handle reading progress
  const progressScript = `
    (function() {
      if (typeof window !== 'undefined') {
        const progressElement = document.getElementById('reading-progress');
        const continueElement = document.getElementById('continue-reading');
        const nextElement = document.getElementById('next-chapter');
        const startElement = document.getElementById('start-reading');
        const noProgressElement = document.getElementById('no-progress');
        
        const progress = localStorage.getItem('reading-progress-${params.slug}');
        
        if (progress) {
          const chapter = parseInt(progress, 10);
          progressElement.textContent = 'You\\'ve read up to Chapter ' + chapter + ' of ${work.chapterCount}.';
          continueElement.style.display = 'block';
          continueElement.href = '/works/${params.slug}/chapters/' + chapter;
          
          if (chapter < ${work.chapterCount}) {
            nextElement.style.display = 'block';
            nextElement.href = '/works/${params.slug}/chapters/' + (chapter + 1);
          } else {
            nextElement.style.display = 'none';
          }
          
          startElement.style.display = 'none';
          noProgressElement.style.display = 'none';
        } else {
          progressElement.textContent = 'You haven\\'t started reading this work yet.';
          continueElement.style.display = 'none';
          nextElement.style.display = 'none';
          startElement.style.display = 'block';
          noProgressElement.style.display = 'block';
        }
      }
    })();
  `

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href={`/works/${work.slug}`} className="text-primary hover:underline">
          ← Back to {work.title}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Current Progress</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Reading Progress</h2>

          <p id="reading-progress" className="mb-4">
            Loading your progress...
          </p>

          <div className="flex flex-col gap-3">
            <Button id="continue-reading" asChild style={{ display: "none" }}>
              <Link href={`#`}>Continue Reading</Link>
            </Button>

            <Button id="next-chapter" variant="outline" asChild style={{ display: "none" }}>
              <Link href={`#`}>Next Chapter</Link>
            </Button>

            <div id="no-progress" style={{ display: "none" }}>
              <p className="mb-4">You haven't started reading this work yet.</p>
            </div>

            <Button id="start-reading" asChild style={{ display: "none" }}>
              <Link href={`/works/${work.slug}/chapters/1`}>Start Reading</Link>
            </Button>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Publication Status</h2>

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

      {/* Script to handle reading progress */}
      <script dangerouslySetInnerHTML={{ __html: progressScript }} />
    </div>
  )
}
