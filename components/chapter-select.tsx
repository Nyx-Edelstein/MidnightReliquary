"use client"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChapterSelectProps {
  currentChapter: number
  totalChapters: number
  workSlug: string
}

export function ChapterSelect({ currentChapter, totalChapters, workSlug }: ChapterSelectProps) {
  const router = useRouter()

  const handleValueChange = (value: string) => {
    router.push(`/works/${workSlug}/chapters/${value}/`)
  }

  return (
    <Select value={currentChapter.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[110px] h-8 bg-zinc-800 text-white border-zinc-700 rounded-full">
        <SelectValue placeholder="Chapter" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((num) => (
          <SelectItem key={num} value={num.toString()}>
            Chapter {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
