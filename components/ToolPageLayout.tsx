import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SectionIntro from '@/components/SectionIntro'
import SupportCallout from '@/components/SupportCallout'
import ToolCard from '@/components/ToolCard'
import { getRelatedTools, getToolByHref } from '@/lib/tool-catalog'

interface ContentBlock {
  title: string
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

interface ToolPageLayoutProps {
  toolPath: string
  eyebrow?: string
  title: string
  description: string
  highlights: string[]
  useCases: ContentBlock[]
  helpfulPoints: ContentBlock[]
  faqs?: FaqItem[]
  toolNote?: string
  children: React.ReactNode
}

export default function ToolPageLayout({
  toolPath,
  eyebrow,
  title,
  description,
  highlights,
  useCases,
  helpfulPoints,
  faqs = [],
  toolNote,
  children,
}: ToolPageLayoutProps) {
  const tool = getToolByHref(toolPath)
  const relatedTools = getRelatedTools(toolPath, 4)
  const categoryPath = tool?.category === 'svg' ? '/svg-tools' : '/frontend-tools'
  const categoryLabel = tool?.category === 'svg' ? 'SVG Tools' : 'Frontend Tools'

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-8">
            <SectionIntro eyebrow={eyebrow} title={title} description={description} />
            <div className="flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 text-sm text-foreground shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-[var(--brand-accent)]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#tool-interface">
                  Open the tool
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={categoryPath}>{categoryLabel}</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-border/70 bg-white/80 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-foreground">Built for practical browser workflows</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Copy, export, and test outputs quickly. Konverter keeps utility tooling close to the interface instead of hiding it behind extra steps.
              </p>
            </div>
            {toolNote ? (
              <div className="rounded-[28px] border border-dashed border-border bg-[var(--surface-secondary)]/85 p-6">
                <p className="text-sm leading-6 text-muted-foreground">{toolNote}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="tool-interface" className="space-y-6">
        <SectionIntro
          eyebrow="Tool interface"
          title={`Use ${tool?.shortName ?? 'this tool'} in the browser`}
          description="Everything you need is in one place so you can move from input to output without digging around the page."
        />
        <div className="rounded-[32px] border border-border/70 bg-[var(--surface-secondary)]/72 p-2 shadow-[0_24px_70px_-40px_rgba(20,43,67,0.65)] md:p-4">
          {children}
        </div>
      </section>

      <section className="space-y-8">
        <SectionIntro
          eyebrow="Use cases"
          title="Where this fits in a real workflow"
          description="Clear, practical examples matter more than vague feature lists."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm">
              <h3 className="font-display text-xl tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionIntro
          eyebrow="Why it helps"
          title="Made for quick frontend work, not busywork"
          description="The goal is to shorten the path from raw input to production-ready output."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {helpfulPoints.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-border/70 bg-[var(--surface-secondary)]/92 p-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="space-y-8">
          <SectionIntro
            eyebrow="FAQ"
            title="A few useful details before you use it"
            description="Answers kept short and practical."
          />
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[28px] border border-border/70 bg-white/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-8">
        <SectionIntro
          eyebrow="Related tools"
          title="Keep the workflow moving"
          description="Move into the next step without hunting around the site."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedTools.map((relatedTool) => (
            <ToolCard key={relatedTool.id} tool={relatedTool} />
          ))}
        </div>
      </section>

      <SupportCallout />
    </div>
  )
}
