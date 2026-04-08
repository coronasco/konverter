import Link from 'next/link'
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
  const pageLinks = [
    { href: '#tool-interface', label: 'Tool' },
    { href: '#use-cases', label: 'Use cases' },
    { href: '#why-it-helps', label: 'Why it helps' },
    ...(faqs.length > 0 ? [{ href: '#faq', label: 'FAQ' }] : []),
  ]

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame overflow-hidden">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_240px] xl:items-start">
          <div className="space-y-6">
            <SectionIntro eyebrow={eyebrow} title={title} description={description} className="max-w-4xl" />
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a href="#tool-interface" className="font-medium text-foreground underline decoration-[var(--brand-accent)]/50 underline-offset-4">
                Jump to the tool
              </a>
              <Link href={categoryPath} className="font-medium text-foreground underline decoration-[var(--brand-accent)]/50 underline-offset-4">
                See all {categoryLabel.toLowerCase()}
              </Link>
            </div>
            {toolNote ? (
              <div className="max-w-2xl border-l-2 border-[var(--brand-accent)]/55 pl-4 text-sm leading-6 text-muted-foreground">
                {toolNote}
              </div>
            ) : null}
          </div>

          <div className="space-y-4 border-t border-border/60 pt-4 xl:border-t-0 xl:border-l xl:pl-6 xl:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              On this page
            </p>
            <div className="space-y-3 text-sm">
              {pageLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-foreground/85 underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-[var(--brand-accent)]/45"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-2 text-sm leading-6 text-muted-foreground">
              Use it here in the page, check the result, then copy or download what you need.
            </div>
          </div>
        </div>
      </section>

      <section id="tool-interface" className="space-y-6">
        <SectionIntro
          eyebrow="Tool"
          title={tool?.shortName ?? 'Use the tool'}
          description="Add your input, check the result, then copy or download what you need."
        />
        <div className="rounded-[32px] border border-border/70 bg-[var(--surface-secondary)]/72 p-2 shadow-[0_24px_70px_-40px_rgba(20,43,67,0.65)] md:p-4">
          {children}
        </div>
      </section>

      <section id="use-cases" className="space-y-8">
        <SectionIntro
          eyebrow="Use cases"
          title="When this is useful"
          description="A few common cases."
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

      <section id="why-it-helps" className="space-y-8">
        <SectionIntro
          eyebrow="Why it helps"
          title="What it helps with"
          description="The parts that matter."
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
        <section id="faq" className="space-y-8">
          <SectionIntro
            eyebrow="FAQ"
            title="A few things worth knowing"
            description="Short answers before you start."
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
          title="You might need one of these next"
          description="If this is one step in a longer job, keep going from here."
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
