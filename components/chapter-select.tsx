"use client"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Chapter } from "@/lib/works"

interface ChapterSelectProps {
  currentChapter: number
  chapters: Chapter[]
  workSlug: string
}

export function ChapterSelect({ currentChapter, chapters, workSlug }: ChapterSelectProps) {
  const router = useRouter()

  const handleValueChange = (value: string) => {
    router.push(`/works/${workSlug}/chapters/${value}/`)
  }

  // Sort chapters by order
  const sortedChapters = [...chapters].sort((a, b) => a.order - b.order)

  return (
    <Select value={currentChapter.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] h-8 bg-zinc-800 text-white border-zinc-700 rounded-full">
        <SelectValue placeholder="Select Chapter" />
      </SelectTrigger>
      <SelectContent>
        {sortedChapters.map((chapter) => (
          <SelectItem key={chapter.order} value={chapter.order.toString()}>
            {chapter.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
