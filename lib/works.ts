export type Work = {
  slug: string
  title: string
  description: string
  chapterCount: number
  lastUpdated?: string
  nextUpdate?: string
}

// Function to get all works from the public/works directory
export function getWorks(): Work[] {
  try {
    // For static export, we need to use mock data during build
    // In a real server environment, this would scan the directory
    return [
      {
        slug: "the-lost-kingdom",
        title: "The Lost Kingdom",
        description: "A fantasy adventure about a forgotten realm and the hero who must save it.",
        chapterCount: 3,
        lastUpdated: "2025-04-15",
        nextUpdate: "2025-04-29",
      },
      {
        slug: "beyond-the-stars",
        title: "Beyond the Stars",
        description: "A science fiction epic spanning galaxies and civilizations.",
        chapterCount: 2,
        lastUpdated: "2025-04-10",
        nextUpdate: "2025-04-24",
      },
    ]
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

// Function to get chapter content
export function getChapterContent(slug: string, chapterNum: number): string {
  // For client-side usage, we'll return the path to the HTML file
  // The actual content will be fetched by the client
  return `/works/${slug}/chapters/${chapterNum}.html`
}
