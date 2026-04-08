import { Metadata } from 'next'
import Link from 'next/link'
import { Coffee, MessageSquareMore } from 'lucide-react'
import SectionIntro from '@/components/SectionIntro'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Support Konverter',
  description:
    'Support the project, follow the blog, or get in touch if Konverter has been useful in your frontend workflow.',
  alternates: {
    canonical: 'https://www.konverter-online.com/support',
  },
}

const reasons = [
  {
    title: 'Keeps the tools online',
    description: 'Hosting, fixes, cleanup, and all the little maintenance jobs still need time and money.',
  },
  {
    title: 'Makes room for new tools',
    description: 'It helps me keep building the kind of frontend utilities people actually need once the obvious ones are already done.',
  },
  {
    title: 'Helps me smooth the rough edges',
    description: 'A lot of the work is in the details: better exports, cleaner UI, clearer docs, and fewer annoying mistakes.',
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="section-frame section-grid-background">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <SectionIntro
            eyebrow="Support"
            title="If Konverter helped, this is where you can support it"
            description="Use the tools, share them if they were useful, and if you want to help me keep building more of them, you can buy me a coffee."
          />
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Coffee className="h-5 w-5 text-[var(--brand-accent)]" />
                Direct support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                A coffee helps me keep working on the site without turning it into a mess of popups, paywalls, or junk.
              </p>
              <Button asChild className="w-full">
                <a href="https://coff.ee/danielzahav" target="_blank" rel="noopener noreferrer">
                  Buy me a coffee
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {reasons.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-border/70 bg-white/78 p-6 shadow-sm">
            <h2 className="font-display text-2xl tracking-tight text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Other ways to help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Share the tools with another developer who will actually use them.</p>
            <p>Link to the relevant tool or article instead of the generic homepage when you recommend it.</p>
            <p>Use the blog as a reference point when a tool solves a recurring workflow problem.</p>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquareMore className="h-5 w-5 text-[var(--brand-accent)]" />
              Need something else?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>If you came here for one thing and ended up needing another, these are the best places to look next.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/svg-tools">SVG tools</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/frontend-tools">Frontend tools</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Blog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
