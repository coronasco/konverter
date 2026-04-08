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
    title: 'Small jobs, less friction',
    description: 'Format the data, minify the CSS, shorten the link, or generate the token file and keep going.',
  },
  {
    title: 'Built for copy and download',
    description: 'The result should be easy to grab and drop into whatever you are already working on.',
  },
  {
    title: 'Useful around the edges of a build',
    description: 'These are the jobs that are usually too small for a whole app and too annoying to do by hand.',
  },
]

export default function FrontendToolsPage() {
  const tools = getToolsByCategory('frontend')

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background">
        <SectionIntro
          eyebrow="Frontend tools"
          title="Frontend tools for the jobs around the edges of a build"
          description="Format JSON, minify CSS, make tokens, shorten links, generate QR codes, or pull colors without opening five different tabs."
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
          title="Pick the one you need"
          description="These are the utility tools people keep reaching for in day-to-day frontend work."
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
