"use client"
import { useState, useEffect } from "react"

interface ChapterProgressTrackerProps {
  workSlug: string
  chapterNumber: number
}

export function ChapterProgressTracker({ workSlug, chapterNumber }: ChapterProgressTrackerProps) {
  const [lastReadChapter, setLastReadChapter] = useState<number | null>(null)

  useEffect(() => {
    // This effect runs when the component mounts and when workSlug or chapterNumber changes

    // Save the current chapter as the last read chapter for this work
    try {
      localStorage.setItem(`reading-progress-${workSlug}`, chapterNumber.toString())
      console.log(`Saved reading progress for ${workSlug}: chapter ${chapterNumber}`)

      // Read it back from localStorage to verify it was saved correctly
      const savedProgress = localStorage.getItem(`reading-progress-${workSlug}`)
      setLastReadChapter(savedProgress ? Number.parseInt(savedProgress, 10) : null)
      console.log(`Verified reading progress for ${workSlug}: retrieved chapter ${savedProgress}`)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [workSlug, chapterNumber])

  return null // This component doesn't render anything visible
}
