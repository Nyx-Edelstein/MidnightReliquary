"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReadButtonProps {
  workSlug: string
}

export function ReadButton({ workSlug }: ReadButtonProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      // Check if there's saved progress for this work
      const savedProgress = localStorage.getItem(`reading-progress-${workSlug}`)

      if (savedProgress) {
        // If progress exists, navigate to that chapter
        router.push(`/works/${workSlug}/chapters/${savedProgress}/`)
      } else {
        // If no progress, navigate to the work's title page
        router.push(`/works/${workSlug}/`)
      }
    } catch (error) {
      // If there's an error (e.g., localStorage not available), fall back to default behavior
      router.push(`/works/${workSlug}/`)
    }
  }

  return (
    <a
      href={`/works/${workSlug}/`} // Default href for non-JS environments
      onClick={handleClick}
      className="flex items-center text-primary hover:underline"
    >
      Read <ArrowRight className="ml-1 h-4 w-4" />
    </a>
  )
}
