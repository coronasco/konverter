import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Sparkles } from 'lucide-react'
import SvgConverter from '@/components/SvgConverter'
import FAQSchema, { svgConverterFAQs } from '@/components/FAQSchema'
import ReviewSchema from '@/components/ReviewSchema'
import SectionIntro from '@/components/SectionIntro'
import SupportCallout from '@/components/SupportCallout'
import ToolCard from '@/components/ToolCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFeaturedTools, getToolsByCategory } from '@/lib/tool-catalog'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Konverter | Frontend Tools for SVG, Assets, and Browser-Based Workflows',
  description:
    'Konverter helps developers and creators work faster with browser-based SVG utilities, asset tools, and code-ready frontend helpers.',
  keywords:
    'frontend tools, svg tools, favicon generator, svg icon generator, design token generator, svg converter, browser based developer tools',
  openGraph: {
    title: 'Konverter | Frontend Tools for SVG, Assets, and Browser-Based Workflows',
    description:
      'Practical browser-based tools for SVG conversion, favicon packs, icon workflows, design tokens, and frontend asset prep.',
    type: 'website',
    url: 'https://www.konverter-online.com',
    images: [
      {
        url: 'https://www.konverter-online.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Konverter frontend tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konverter | Frontend Tools',
    description: 'SVG workflows, asset prep, and browser-based frontend utilities.',
    images: ['https://www.konverter-online.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.konverter-online.com',
  },
}

const platformNotes = [
  {
    title: 'SVG-first workflow',
    description:
      'Konverter is built around the sort of SVG cleanup, export, and code generation work that happens constantly in frontend projects.',
  },
  {
    title: 'Browser-based and direct',
    description:
      'Most tools work locally in the browser, which keeps turnaround quick and avoids unnecessary upload flows for everyday tasks.',
  },
  {
    title: 'Made for shipping',
    description:
      'The outputs are meant to drop into real codebases: JSX, CSS, token files, icon packs, asset exports, and plain-text snippets.',
  },
]

export default function Home() {
  const featuredTools = getFeaturedTools()
  const svgTools = getToolsByCategory('svg')
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <FAQSchema faqs={svgConverterFAQs} />
      <ReviewSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Konverter',
            description:
              'Browser-based frontend tools for SVG conversion, asset generation, design tokens, and practical developer workflows.',
            url: 'https://www.konverter-online.com',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'SVG converter and optimizer',
              'Favicon and PWA asset pack generator',
              'SVG icon pack generator',
              'Design token generator',
              'JSON formatter',
              'CSS minifier',
            ],
          }),
        }}
      />

      <div className="space-y-16 md:space-y-20">
        <section className="section-frame section-grid-background overflow-hidden">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
                  Frontend tools for SVG work
                </p>
                <h1 className="font-display max-w-4xl text-4xl tracking-tight text-foreground md:text-6xl">
                  Browser tools for SVG, icons, favicons, and the frontend asset jobs that should not take all afternoon.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  Clean up SVG, package icons, generate favicons, shape tokens, and export code you can actually drop into a project. Fast to open, easy to use, no account nonsense.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#svg-workbench">
                    Open the SVG converter
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/svg-tools">Browse all tools</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Works in the browser.</span>
                <span>Code-ready output.</span>
                <span>No sign-up.</span>
              </div>
            </div>

          <div className="grid gap-4">
            <Card className="border-border/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-[var(--brand-accent)]" />
                    What Konverter is for
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>Convert SVG into code, exports, and asset packages.</p>
                  <p>Build frontend-ready files without leaving the browser.</p>
                  <p>Move from raw input to production output with less friction.</p>
                </CardContent>
            </Card>
            <Card className="border-border/70 bg-[var(--surface-secondary)]/92">
              <CardContent className="p-6 text-sm leading-6 text-muted-foreground">
                  Built for quick frontend jobs: cleaner inputs, clearer outputs, and fewer steps between the raw file and something you can actually use.
              </CardContent>
            </Card>
          </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionIntro
            eyebrow="Featured tools"
            title="Start with the core workflows"
            description="These are the tools people reach for most when they need to clean up SVGs, prepare assets, or generate frontend-ready output."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionIntro
            eyebrow="Why Konverter"
            title="Clear utility beats noisy tooling"
            description="Fast tools, readable output, and a workflow that makes sense matter more than flashy filler."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {platformNotes.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm">
                <h2 className="font-display text-2xl tracking-tight text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="svg-workbench" className="space-y-6">
          <SectionIntro
            eyebrow="SVG workbench"
            title="Convert, tweak, and export SVG in one pass"
            description="Paste code or upload a file, clean it up, adjust colors, and export the format you need without bouncing between tools."
          />
          <div className="rounded-[32px] border border-border/70 bg-[var(--surface-secondary)]/72 p-2 shadow-[0_24px_70px_-40px_rgba(20,43,67,0.65)] md:p-4">
            <SvgConverter />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="section-frame">
            <SectionIntro
              eyebrow="Trust"
              title="Built around browser-friendly processing"
              description="For utility work, the product should explain itself quickly and keep the output close to the interface."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                <Globe className="h-5 w-5 text-[var(--brand-accent)]" />
                <p className="mt-3 font-semibold text-foreground">Fast setup</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Open the page and start. No account wall, no hidden dashboard.</p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                <ShieldCheck className="h-5 w-5 text-[var(--brand-accent)]" />
                <p className="mt-3 font-semibold text-foreground">Local-first where possible</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Many workflows stay in the browser, which is useful for speed and privacy-sensitive asset work.</p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                <CheckCircle2 className="h-5 w-5 text-[var(--brand-accent)]" />
                <p className="mt-3 font-semibold text-foreground">Outputs you can use</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">The goal is not novelty. It is to give you code and assets you can drop into the next step immediately.</p>
              </div>
            </div>
          </div>

          <div className="section-frame">
            <SectionIntro
              eyebrow="SVG tools"
              title="A stronger SVG path"
              description="SVG remains the clearest strength of the platform."
            />
            <div className="mt-6 space-y-3">
              {svgTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="flex items-start justify-between gap-4 rounded-[22px] border border-border/70 bg-white/75 px-5 py-4 hover:border-[var(--brand-accent)]/40 hover:bg-white"
                >
                  <div>
                    <p className="font-medium text-foreground">{tool.shortName}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{tool.summary}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionIntro
            eyebrow="From the blog"
            title="Short guides for the same kind of work"
            description="SVG cleanup, icon workflows, favicons, tokens, and the small frontend tasks that are easier with the right tool."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm hover:border-[var(--brand-accent)]/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{post.category}</p>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-sm font-medium text-foreground">Read article</p>
              </Link>
            ))}
          </div>
        </section>

        <SupportCallout />
      </div>
    </>
  )
}
