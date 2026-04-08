'use client'

import SectionIntro from '@/components/SectionIntro'
import ToolCard from '@/components/ToolCard'
import { getRelatedTools } from '@/lib/tool-catalog'

interface RelatedToolsProps {
  currentPath: string
  maxTools?: number
}

export default function RelatedTools({ currentPath, maxTools = 4 }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentPath, maxTools)

  if (relatedTools.length === 0) return null

  return (
    <section className="mt-12 space-y-6">
      <SectionIntro
        eyebrow="Related tools"
        title="You might need one of these next"
        description="If this article is only one part of the job, keep going from here."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {relatedTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}
