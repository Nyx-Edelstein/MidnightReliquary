"use client"
import { useEffect, useRef } from "react"

interface ChapterContentRendererProps {
  content: string
}

export function ChapterContentRenderer({ content }: ChapterContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Function to load jQuery if it's not already loaded
    const loadJQuery = () => {
      if (window.jQuery) return Promise.resolve()

      return new Promise<void>((resolve) => {
        const script = document.createElement("script")
        script.src = "https://code.jquery.com/jquery-3.7.1.min.js"
        script.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        script.crossOrigin = "anonymous"
        script.onload = () => resolve()
        document.head.appendChild(script)
      })
    }

    // Function to execute scripts in the content
    const executeScripts = async () => {
      // First, load jQuery
      await loadJQuery()

      // Find all script tags in the container
      if (!containerRef.current) return

      const scriptElements = containerRef.current.querySelectorAll("script")

      // Execute each script
      scriptElements.forEach((oldScript) => {
        const newScript = document.createElement("script")

        // Copy all attributes
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value)
        })

        // Copy the content
        newScript.textContent = oldScript.textContent

        // Replace the old script with the new one to execute it
        oldScript.parentNode?.replaceChild(newScript, oldScript)
      })
    }

    // Execute the scripts after the content is rendered
    executeScripts()
  }, [content]) // Re-run when content changes

  return (
    <div
      ref={containerRef}
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
