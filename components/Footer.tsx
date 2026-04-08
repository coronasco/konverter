import Link from 'next/link'
import { getToolsByCategory } from '@/lib/tool-catalog'

const svgTools = getToolsByCategory('svg')
const frontendTools = getToolsByCategory('frontend')

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-white/70">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
          <div className="max-w-md space-y-4">
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">Konverter</p>
            <p className="text-sm leading-7 text-muted-foreground">
              Browser-based frontend utilities with a strong SVG workflow focus. Built for practical conversion, export, and asset prep work.
            </p>
            <a
              href="https://coff.ee/danielzahav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-foreground underline decoration-[var(--brand-accent)]/60 underline-offset-4"
            >
              Support the project
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">SVG tools</p>
            <div className="space-y-3 text-sm">
              {svgTools.map((tool) => (
                <Link key={tool.id} href={tool.href} className="block text-foreground/85 hover:text-foreground">
                  {tool.shortName}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Frontend tools</p>
            <div className="space-y-3 text-sm">
              {frontendTools.slice(0, 6).map((tool) => (
                <Link key={tool.id} href={tool.href} className="block text-foreground/85 hover:text-foreground">
                  {tool.shortName}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Project</p>
            <div className="space-y-3 text-sm">
              <Link href="/blog" className="block text-foreground/85 hover:text-foreground">
                Blog
              </Link>
              <Link href="/support" className="block text-foreground/85 hover:text-foreground">
                Support
              </Link>
              <Link href="/privacy" className="block text-foreground/85 hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          <p>Copyright © 2025 konverter-online.com. Built by Daniel Zaharia.</p>
        </div>
      </div>
    </footer>
  )
}
