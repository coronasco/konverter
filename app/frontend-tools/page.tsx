import { Metadata } from 'next'
import SectionIntro from '@/components/SectionIntro'
import SupportCallout from '@/components/SupportCallout'
import ToolCard from '@/components/ToolCard'
import { getToolsByCategory } from '@/lib/tool-catalog'

export const metadata: Metadata = {
  title: 'Frontend Tools | Konverter',
  description:
    'Frontend-focused browser tools for JSON, CSS, tokens, Base64, QR codes, links, color palettes, and day-to-day utility work.',
  alternates: {
    canonical: 'https://www.konverter-online.com/frontend-tools',
  },
}

const notes = [
  {
    title: 'Useful in codebases',
    description: 'The point is to generate something a developer can use immediately: clean text output, token files, shortened links, assets, or copied snippets.',
  },
  {
    title: 'Fast by default',
    description: 'These tools are arranged for quick input, visible output, and easy copy or download actions without unnecessary ceremony.',
  },
  {
    title: 'Connected internally',
    description: 'Pages now link more clearly across related frontend workflows so the site behaves like a product, not a dead-end tool grid.',
  },
]

export default function FrontendToolsPage() {
  const tools = getToolsByCategory('frontend')

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background">
        <SectionIntro
          eyebrow="Frontend tools"
          title="Frontend helpers that stay practical"
          description="This side of Konverter handles the day-to-day jobs around formatting, encoding, tokens, links, QR output, and lightweight utility work in the browser."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {notes.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm">
            <h2 className="font-display text-2xl tracking-tight text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <SectionIntro
          eyebrow="All frontend tools"
          title="Keep common utility work in one place"
          description="The product is wider than SVG, but still tuned for frontend workflows and browser-native usage."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <SupportCallout />
    </div>
  )
}
