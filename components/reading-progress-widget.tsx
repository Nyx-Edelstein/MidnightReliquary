"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Chapter } from "@/lib/works"

interface ReadingProgressWidgetProps {
  workSlug: string
  workTitle: string
  chapterCount: number
  firstChapterOrder: number
  chapters: Chapter[]
}

export function ReadingProgressWidget({
  workSlug,
  workTitle,
  chapterCount,
  firstChapterOrder,
  chapters,
}: ReadingProgressWidgetProps) {
  const [progress, setProgress] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  // Check for reading progress once the component mounts
  useEffect(() => {
    setIsClient(true)
    try {
      const savedProgress = localStorage.getItem(`reading-progress-${workSlug}`)
      setProgress(savedProgress)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [workSlug])

  // Handle clearing progress
  const handleClearProgress = () => {
    try {
      localStorage.removeItem(`reading-progress-${workSlug}`)
      setProgress(null)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }

  // Get chapter title based on progress
  const getChapterTitle = (progressValue: string): string => {
    const chapterOrder = Number.parseInt(progressValue, 10)

    // If we have chapters array with titles
    if (chapters && chapters.length > 0) {
      const chapter = chapters.find((ch) => ch.order === chapterOrder)
      if (chapter) {
        return chapter.title
      }
    }

    // Fallback if no chapter title found
    return `Chapter ${progressValue}`
  }

  // If we're still on the server or haven't checked localStorage yet, show a loading state
  if (!isClient) {
    return (
      <div className="border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>
        <p className="mb-4">Loading your progress...</p>
      </div>
    )
  }

  return (
    <div className="border border-border rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>

      {progress ? (
        <>
          <p className="mb-4">
            You last read "{getChapterTitle(progress)}"
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/works/${workSlug}/chapters/${progress}/`}>Continue Reading</Link>
            </Button>
            <Button variant="outline" onClick={handleClearProgress}>
              Start Over
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/works/${workSlug}/chapters/`}>Table of Contents</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4">You haven't started reading this work yet.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/works/${workSlug}/chapters/${firstChapterOrder}/`}>Start Reading</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/works/${workSlug}/chapters/`}>Table of Contents</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
