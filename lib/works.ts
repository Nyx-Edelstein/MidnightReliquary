import fs from "fs"
import path from "path"

export type Chapter = {
  order: number
  title: string
  file: string
}

export type Work = {
  slug: string
  title: string
  description: string
  chapterCount: number
  lastUpdated?: string
  chapters: Chapter[]
}

// Function to get all works from the works directory
export function getWorks(): Work[] {
  try {
    // In a static build, we need to read from the file system during build time
    const worksDirectory = path.join(process.cwd(), "public/works")
    const workFolders = fs
      .readdirSync(worksDirectory)
      .filter((folder) => fs.statSync(path.join(worksDirectory, folder)).isDirectory())

    return workFolders.map((folder) => {
      const metaPath = path.join(worksDirectory, folder, "meta.json")
      const metaContent = fs.readFileSync(metaPath, "utf8")
      const meta = JSON.parse(metaContent)

      return {
        slug: folder,
        title: meta.title,
        description: meta.description,
        chapterCount: meta.chapterCount,
        lastUpdated: meta.lastUpdated,
        chapters: meta.chapters || [],
      }
    })
  } catch (error) {
    console.error("Error reading works directory:", error)
    return []
  }
}

// Function to get a specific work by slug
export function getWorkBySlug(slug: string): Work | undefined {
  try {
    const works = getWorks()
    return works.find((work) => work.slug === slug)
  } catch (error) {
    console.error(`Error getting work by slug ${slug}:`, error)
    return undefined
  }
}

// Function to get chapter content - reads the actual file during build time
export function getChapterContent(slug: string, chapterNum: number): string {
  try {
    const work = getWorkBySlug(slug)
    if (!work || !work.chapters || work.chapters.length === 0) {
      // Fallback to old method if chapters array is not available
      const chapterPath = path.join(process.cwd(), "public/works", slug, "chapters", `${chapterNum}.html`)
      return fs.readFileSync(chapterPath, "utf8")
    }

    // Find the chapter by order
    const chapter = work.chapters.find((ch) => ch.order === chapterNum)
    if (!chapter) {
      throw new Error(`Chapter with order ${chapterNum} not found`)
    }

    const chapterPath = path.join(process.cwd(), "public/works", slug, "chapters", chapter.file)
    return fs.readFileSync(chapterPath, "utf8")
  } catch (error) {
    console.error(`Error reading chapter content for ${slug}, chapter ${chapterNum}:`, error)
    return "<p>Chapter content not found.</p>"
  }
}

// Function to get title blurb content
export function getTitleBlurbContent(slug: string): string {
  try {
    const blurbPath = path.join(process.cwd(), "public/works", slug, "title-blurb.html")
    if (fs.existsSync(blurbPath)) {
      return fs.readFileSync(blurbPath, "utf8")
    }
    return "" // Return empty string if file doesn't exist
  } catch (error) {
    console.error(`Error reading title blurb for ${slug}:`, error)
    return ""
  }
}

// Function to get update info content
export function getUpdateInfoContent(slug: string): string {
  try {
    const updateInfoPath = path.join(process.cwd(), "public/works", slug, "update-info.html")
    if (fs.existsSync(updateInfoPath)) {
      return fs.readFileSync(updateInfoPath, "utf8")
    }
    return "<p>No update information available.</p>" // Default message if file doesn't exist
  } catch (error) {
    console.error(`Error reading update info for ${slug}:`, error)
    return "<p>No update information available.</p>"
  }
}

// Function to get chapter by order number
export function getChapterByOrder(work: Work, order: number): Chapter | undefined {
  if (!work.chapters) return undefined
  return work.chapters.find((chapter) => chapter.order === order)
}

// Function to get next chapter order
export function getNextChapterOrder(work: Work, currentOrder: number): number | undefined {
  if (!work.chapters) return currentOrder < work.chapterCount ? currentOrder + 1 : undefined

  const sortedChapters = [...work.chapters].sort((a, b) => a.order - b.order)
  const currentIndex = sortedChapters.findIndex((ch) => ch.order === currentOrder)

  if (currentIndex === -1 || currentIndex === sortedChapters.length - 1) return undefined
  return sortedChapters[currentIndex + 1].order
}

// Function to get previous chapter order
export function getPrevChapterOrder(work: Work, currentOrder: number): number | undefined {
  if (!work.chapters) return currentOrder > 1 ? currentOrder - 1 : undefined

  const sortedChapters = [...work.chapters].sort((a, b) => a.order - b.order)
  const currentIndex = sortedChapters.findIndex((ch) => ch.order === currentOrder)

  if (currentIndex <= 0) return undefined
  return sortedChapters[currentIndex - 1].order
}
