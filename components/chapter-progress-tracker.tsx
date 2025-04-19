"use client"
import { useEffect } from "react"

interface ChapterProgressTrackerProps {
  workSlug: string
  chapterNumber: number
}

export function ChapterProgressTracker({ workSlug, chapterNumber }: ChapterProgressTrackerProps) {
  useEffect(() => {
    // Save the current chapter as the last read chapter for this work
    try {
      localStorage.setItem(`reading-progress-${workSlug}`, chapterNumber.toString())
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [workSlug, chapterNumber])

  return null // This component doesn't render anything visible
}
