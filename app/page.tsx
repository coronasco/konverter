import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from 'lucide-react'
import SvgConverter from '@/components/SvgConverter'
import FAQSchema, { svgConverterFAQs } from '@/components/FAQSchema'
import ReviewSchema from '@/components/ReviewSchema'
import SectionIntro from '@/components/SectionIntro'
import SupportCallout from '@/components/SupportCallout'
import ToolCard from '@/components/ToolCard'
import { Button } from '@/components/ui/button'
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
    title: 'Start with the file',
    description:
      'Drop in an SVG, a logo, an icon set, or a rough palette and work from there instead of starting from a blank page.',
  },
  {
    title: 'Get the output and move on',
    description:
      'The point is to leave with code, assets, or a clean export you can actually use in the next step of the job.',
  },
  {
    title: 'Keep it simple',
    description:
      'No account wall, no giant setup, no trying to turn a small frontend task into a whole ordeal.',
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
        <section className="section-frame overflow-hidden">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-start">
            <div className="space-y-6">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
                  Konverter
                </p>
                <h1 className="font-display max-w-4xl text-4xl tracking-tight text-foreground md:text-6xl">
                  Tools for SVG, icons, favicons, tokens, and the frontend cleanup work that keeps showing up.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  Clean up an SVG, turn a folder of icons into components, generate a favicon pack, shape some design tokens, or just format the annoying bit of data in front of you and get back to the real work.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a href="#svg-workbench">
                    Open the SVG converter
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Link href="/svg-tools" className="text-sm font-medium text-foreground underline decoration-[var(--brand-accent)]/50 underline-offset-4">
                  Or go straight to all SVG tools
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span>Runs in the browser.</span>
                <span>Useful output you can copy or download.</span>
                <span>No sign-up to get started.</span>
              </div>
            </div>

            <div className="space-y-4 border-t border-border/60 pt-4 xl:border-t-0 xl:border-l xl:pl-6 xl:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Start here
              </p>
              <div className="space-y-3 text-sm">
                {featuredTools.slice(0, 4).map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="block text-foreground/85 underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-[var(--brand-accent)]/45"
                  >
                    {tool.shortName}
                  </Link>
                ))}
              </div>
              <div className="pt-2 text-sm leading-6 text-muted-foreground">
                Most people start with the SVG converter, then move into icons, favicons, or tokens if the job grows.
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionIntro
            eyebrow="Featured tools"
            title="Start with the tools people use most"
            description="If you came here to clean up SVG, build a favicon pack, turn icons into components, or make a token file, start with one of these."
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
            title="Built for the kind of jobs people usually have to piece together themselves"
            description="Open the tool, do the job, copy or download the result, move on."
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
            title="Paste an SVG or drop in a file and work from there"
            description="Clean it up, tweak it, export what you need, and keep going."
          />
          <div className="rounded-[32px] border border-border/70 bg-[var(--surface-secondary)]/72 p-2 shadow-[0_24px_70px_-40px_rgba(20,43,67,0.65)] md:p-4">
            <SvgConverter />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="section-frame">
            <SectionIntro
              eyebrow="Trust"
              title="Why people keep using browser tools for this stuff"
              description="For quick frontend jobs, it is usually easier when the page opens fast and the result stays right there in front of you."
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
                <p className="mt-2 text-sm leading-6 text-muted-foreground">A lot of this stays in the browser, which is better for speed and often better for privacy too.</p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                <CheckCircle2 className="h-5 w-5 text-[var(--brand-accent)]" />
                <p className="mt-3 font-semibold text-foreground">Outputs you can use</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">You should be able to copy the code, download the asset, and move straight into the next step.</p>
              </div>
            </div>
          </div>

          <div className="section-frame">
            <SectionIntro
              eyebrow="SVG tools"
              title="More SVG tools"
              description="If the main converter is not the exact job, go straight to the tool that is."
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
            title="Need a guide first?"
            description="These posts cover the same kind of jobs people usually come here to solve."
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
