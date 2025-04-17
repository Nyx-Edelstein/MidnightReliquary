import fs from "fs"
import path from "path"

export type Work = {
  slug: string
  title: string
  description: string
  chapterCount: number
  lastUpdated?: string
  nextUpdate?: string
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
        nextUpdate: meta.nextUpdate,
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
    const chapterPath = path.join(process.cwd(), "public/works", slug, "chapters", `${chapterNum}.html`)
    return fs.readFileSync(chapterPath, "utf8")
  } catch (error) {
    console.error(`Error reading chapter content for ${slug}, chapter ${chapterNum}:`, error)
    return "<p>Chapter content not found.</p>"
  }
}
