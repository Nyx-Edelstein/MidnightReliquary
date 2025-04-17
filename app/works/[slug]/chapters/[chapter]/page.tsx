"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { getWorkBySlug } from "@/lib/works"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChapterPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const chapterNum = Number.parseInt(params.chapter as string, 10)

  const [work, setWork] = useState<any>(null)
  const [chapterContent, setChapterContent] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get work data
    const workData = getWorkBySlug(slug)
    if (!workData) {
      router.push("/")
      return
    }
    setWork(workData)

    // Load chapter content without the title and horizontal rule
    setChapterContent(`<p>This is the content of chapter ${chapterNum}.</p>`)

    // Save reading progress
    localStorage.setItem(`reading-progress-${slug}`, chapterNum.toString())

    setLoading(false)
  }, [slug, chapterNum, router])

  if (loading || !work) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
  }

  const isFirstChapter = chapterNum === 1
  const isLastChapter = chapterNum === work.chapterCount

  // Handle chapter selection
  const handleChapterChange = (value: string) => {
    router.push(`/works/${slug}/chapters/${value}`)
  }

  const ChapterNavigation = () => (
    <div className="flex justify-center items-center py-4 gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-4"
        >
          <Link href={`/works/${slug}`}>← Start</Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={isFirstChapter}
          asChild={!isFirstChapter}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-3 min-w-[40px]"
        >
          {isFirstChapter ? <span>←</span> : <Link href={`/works/${slug}/chapters/${chapterNum - 1}`}>←</Link>}
        </Button>
      </div>

      {/* Chapter dropdown */}
      <div className="mx-2">
        <Select value={chapterNum.toString()} onValueChange={handleChapterChange}>
          <SelectTrigger className="w-[110px] bg-zinc-800 text-white border-zinc-700 rounded-full focus:ring-primary">
            <SelectValue placeholder="Chapter" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: work.chapterCount }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                Chapter {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLastChapter}
          asChild={!isLastChapter}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-3 min-w-[40px]"
        >
          {isLastChapter ? <span>→</span> : <Link href={`/works/${slug}/chapters/${chapterNum + 1}`}>→</Link>}
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white rounded-full px-4"
        >
          <Link href={`/works/${slug}/progress`}>End →</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Work title */}
      <h1 className="text-2xl font-bold mb-2 text-center">{work.title}</h1>

      {/* Chapter title and horizontal rule */}
      <h2 className="text-xl text-center mb-2">Chapter {chapterNum}</h2>
      <hr className="mb-6 border-t border-gray-300 dark:border-gray-700" />

      {/* Navigation buttons */}
      <ChapterNavigation />

      {/* Chapter content */}
      <div className="my-8 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
      </div>

      <ChapterNavigation />
    </div>
  )
}
