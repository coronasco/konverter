import { Coffee } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface SupportCalloutProps {
  title?: string
  description?: string
}

export default function SupportCallout({
  title = 'If a tool saved you time, you can support the project.',
  description = 'Konverter is built as a practical browser-based toolkit. Support helps keep the tools fast, useful, and free to use.',
}: SupportCalloutProps) {
  return (
    <section className="section-frame">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
            Support Konverter
          </p>
          <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="text-base leading-7 text-muted-foreground">{description}</p>
        </div>
        <Button asChild size="lg" className="min-w-[220px]">
          <a href="https://coff.ee/danielzahav" target="_blank" rel="noopener noreferrer">
            <Coffee className="h-4 w-4" />
            Buy me a coffee
          </a>
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Looking for updates, guides, or background on the project?{' '}
        <Link href="/support" className="font-medium text-foreground underline decoration-[var(--brand-accent)]/60 underline-offset-4">
          Visit the support page
        </Link>
        .
      </p>
    </section>
  )
}
