'use client'

import Link from 'next/link'
import {
  Binary,
  Clock3,
  Code2,
  FileJson,
  ImageIcon,
  Link2,
  Lock,
  Palette,
  QrCode,
  Scissors,
  SwatchBook,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ToolDefinition } from '@/lib/tool-catalog'

const iconMap = {
  'svg-converter': Code2,
  'favicon-generator': ImageIcon,
  'svg-icon-pack-generator': Code2,
  'json-formatter': FileJson,
  'css-minifier': Scissors,
  'design-token-generator': SwatchBook,
  'color-generator': Palette,
  'base64-converter': Binary,
  'password-generator': Lock,
  'qr-generator': QrCode,
  'url-shortener': Link2,
  'time-tracker': Clock3,
} as const

interface ToolCardProps {
  tool: ToolDefinition
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = iconMap[tool.id as keyof typeof iconMap] ?? Code2

  return (
    <Link href={tool.href} className="group block h-full">
      <Card className="tool-card h-full border-border/70 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--brand-accent)]/40 group-hover:shadow-[0_18px_48px_-32px_rgba(20,43,67,0.75)]">
        <CardHeader className="gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-[var(--surface-secondary)] text-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-border/70 bg-white/70 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {tool.category === 'svg' ? 'SVG' : 'Frontend'}
              </Badge>
              {tool.new ? (
                <Badge className="bg-[var(--brand-accent)] text-[11px] font-semibold text-[var(--brand-accent-foreground)]">
                  New
                </Badge>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl tracking-tight text-foreground">{tool.shortName}</CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">{tool.summary}</p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm leading-6 text-foreground/80">{tool.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
