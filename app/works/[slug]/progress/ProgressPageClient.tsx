"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getWorkBySlug } from "@/lib/works"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function ProgressPageClient() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [work, setWork] = useState<any>(null)
  const [lastReadChapter, setLastReadChapter] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get work data
    const workData = getWorkBySlug(slug)
    if (!workData) {
      router.push("/")
      return
    }
    setWork(workData)

    // Get reading progress
    const progress = localStorage.getItem(`reading-progress-${slug}`)
    if (progress) {
      setLastReadChapter(Number.parseInt(progress, 10))
    }

    setLoading(false)
  }, [slug, router])

  if (loading || !work) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
  }

  // Format dates for display
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate next update (example: 2 weeks from now)
  const nextUpdate = new Date()
  nextUpdate.setDate(nextUpdate.getDate() + 14)
  const nextUpdateFormatted = nextUpdate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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

          {lastReadChapter ? (
            <div>
              <p className="mb-4">
                You've read up to Chapter {lastReadChapter} of {work.chapterCount}.
              </p>

              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href={`/works/${slug}/chapters/${lastReadChapter}`}>Continue Reading</Link>
                </Button>

                {lastReadChapter < work.chapterCount && (
                  <Button variant="outline" asChild>
                    <Link href={`/works/${slug}/chapters/${lastReadChapter + 1}`}>Next Chapter</Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">You haven't started reading this work yet.</p>
              <Button asChild>
                <Link href={`/works/${slug}/chapters/1`}>Start Reading</Link>
              </Button>
            </div>
          )}
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
    </div>
  )
}
