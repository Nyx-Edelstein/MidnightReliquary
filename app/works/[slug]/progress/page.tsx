import { getWorks, getWorkBySlug } from "@/lib/works"
import type { Metadata } from "next"
import ProgressPageClient from "./ProgressPageClient"

// Remove dynamicParams: true as it's incompatible with static export
// export const dynamicParams = true

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const works = getWorks()
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const work = getWorkBySlug(params.slug)

  if (!work) {
    return {
      title: "Work Not Found",
    }
  }

  return {
    title: `${work.title} - Progress`,
  }
}

// Remove dynamic: "error" as it's not needed for static export
// export const dynamic = "error"

export default function ProgressPage() {
  return <ProgressPageClient />
}
