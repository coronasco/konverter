import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionIntro from '@/components/SectionIntro'
import ToolCard from '@/components/ToolCard'
import SupportCallout from '@/components/SupportCallout'
import { Button } from '@/components/ui/button'
import { getToolsByCategory } from '@/lib/tool-catalog'

export const metadata: Metadata = {
  title: 'SVG Tools | Konverter',
  description:
    'SVG-focused frontend tools for conversion, icon packaging, favicon generation, and browser-based asset prep.',
  alternates: {
    canonical: 'https://www.konverter-online.com/svg-tools',
  },
}

const svgNotes = [
  {
    title: 'Clean it up',
    description: 'Fix messy markup, tweak colors, and turn raw SVG into something easier to work with.',
  },
  {
    title: 'Export what you need',
    description: 'Go from one logo or a folder of icons to favicons, app icons, sprites, or component files.',
  },
  {
    title: 'Stay close to the code',
    description: 'The output is shaped for frontend work, so the next step is easier once you leave the page.',
  },
]

export default function SvgToolsPage() {
  const tools = getToolsByCategory('svg')

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <SectionIntro
            eyebrow="SVG tools"
            title="SVG tools for cleanup, conversion, icon packs, and favicon work"
            description="If your file is messy, not ready for code, or missing the exports you actually need, start here."
          />
          <div className="rounded-[28px] border border-border/70 bg-white/78 p-6 text-sm leading-6 text-muted-foreground">
            <p>Most people start with the converter. If you just need to clean up one SVG or turn it into code, open that first.</p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/#svg-workbench">
                Open the converter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {svgNotes.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm">
            <h2 className="font-display text-2xl tracking-tight text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <SectionIntro
          eyebrow="All SVG tools"
          title="Pick the job and open the tool"
          description="Each one is here for a specific SVG-related task."
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
