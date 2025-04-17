// This is a mock implementation that would be replaced with actual file system access
// In a real implementation, this would scan the works directory

type Work = {
  slug: string
  title: string
  description: string
  chapterCount: number
}

// Mock data - in a real implementation, this would be generated from the file system
const works: Work[] = [
  {
    slug: "the-lost-kingdom",
    title: "The Lost Kingdom",
    description: "A fantasy adventure about a forgotten realm and the hero who must save it.",
    chapterCount: 5,
  },
  {
    slug: "beyond-the-stars",
    title: "Beyond the Stars",
    description: "A science fiction epic spanning galaxies and civilizations.",
    chapterCount: 3,
  },
]

export function getWorks(): Work[] {
  // In a real implementation, this would scan the works directory
  return works
}

export function getWorkBySlug(slug: string): Work | undefined {
  // In a real implementation, this would read the work's metadata file
  return works.find((work) => work.slug === slug)
}

// In a real implementation, this function would read the chapter HTML file
export function getChapterContent(workSlug: string, chapterNum: number): string {
  return `<h2>Chapter ${chapterNum}</h2><p>This is the content of chapter ${chapterNum}.</p>`
}
