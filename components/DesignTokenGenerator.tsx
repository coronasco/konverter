'use client'

import { useMemo, useState } from 'react'
import { Check, Copy, Download, Palette, SwatchBook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { showToast } from '@/components/Toast'
import { generateTokenBundle } from '@/lib/design-token-utils'

function downloadText(value: string, fileName: string) {
  const blob = new Blob([value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function DesignTokenGenerator() {
  const [brand, setBrand] = useState('#1d7c74')
  const [accent, setAccent] = useState('#b8753b')
  const [surface, setSurface] = useState('#f7f3ec')
  const [text, setText] = useState('#243548')
  const [spacingBase, setSpacingBase] = useState(1)
  const [radiusBase, setRadiusBase] = useState(0.75)
  const [shadowStrength, setShadowStrength] = useState(1)
  const [fontFamily, setFontFamily] = useState('"Avenir Next", "Segoe UI", sans-serif')
  const [fontSizeBase, setFontSizeBase] = useState(1)
  const [lineHeightBase, setLineHeightBase] = useState(1.55)
  const [includeDarkMode, setIncludeDarkMode] = useState(true)
  const [copiedTab, setCopiedTab] = useState('')

  const tokenBundle = useMemo(
    () =>
      generateTokenBundle({
        brand,
        accent,
        surface,
        text,
        spacingBase,
        radiusBase,
        shadowStrength,
        fontFamily,
        fontSizeBase,
        lineHeightBase,
        includeDarkMode,
      }),
    [
      brand,
      accent,
      surface,
      text,
      spacingBase,
      radiusBase,
      shadowStrength,
      fontFamily,
      fontSizeBase,
      lineHeightBase,
      includeDarkMode,
    ]
  )

  const copyOutput = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedTab(label)
    showToast.success(`${label} copied to clipboard.`)
    window.setTimeout(() => setCopiedTab(''), 1600)
  }

  const colorScale = tokenBundle.tokens.color.brand

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_minmax(0,1.08fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Token inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Brand', value: brand, setter: setBrand },
                { label: 'Accent', value: accent, setter: setAccent },
                { label: 'Surface', value: surface, setter: setSurface },
                { label: 'Text', value: text, setter: setText },
              ].map((field) => (
                <div key={field.label} className="space-y-2">
                  <Label>{field.label} color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={field.value}
                      onChange={(event) => field.setter(event.target.value)}
                      className="h-11 w-14 p-1"
                    />
                    <Input value={field.value} onChange={(event) => field.setter(event.target.value)} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="spacing-base">Spacing base (rem)</Label>
                <Input
                  id="spacing-base"
                  type="number"
                  step="0.125"
                  value={spacingBase}
                  onChange={(event) => setSpacingBase(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="radius-base">Radius base (rem)</Label>
                <Input
                  id="radius-base"
                  type="number"
                  step="0.125"
                  value={radiusBase}
                  onChange={(event) => setRadiusBase(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size-base">Base font size (rem)</Label>
                <Input
                  id="font-size-base"
                  type="number"
                  step="0.125"
                  value={fontSizeBase}
                  onChange={(event) => setFontSizeBase(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="line-height-base">Base line height</Label>
                <Input
                  id="line-height-base"
                  type="number"
                  step="0.05"
                  value={lineHeightBase}
                  onChange={(event) => setLineHeightBase(Number(event.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
              <div className="space-y-2">
                <Label htmlFor="font-family">Font family</Label>
                <Input
                  id="font-family"
                  value={fontFamily}
                  onChange={(event) => setFontFamily(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shadow-strength">Shadow strength</Label>
                <Input
                  id="shadow-strength"
                  type="number"
                  min="0.2"
                  max="1.6"
                  step="0.1"
                  value={shadowStrength}
                  onChange={(event) => setShadowStrength(Number(event.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3">
              <div>
                <p className="font-medium text-foreground">Include dark mode tokens</p>
                <p className="text-sm text-muted-foreground">Adds a second surface/text layer for theme switching.</p>
              </div>
              <Switch checked={includeDarkMode} onCheckedChange={setIncludeDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SwatchBook className="h-5 w-5" />
              Token preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-5">
              {Object.entries(colorScale).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="h-14 rounded-2xl border border-border/70" style={{ backgroundColor: value }} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{key}</p>
                    <p className="text-xs text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div
                className="rounded-[28px] border p-6"
                style={{
                  backgroundColor: tokenBundle.tokens.color.surface,
                  color: tokenBundle.tokens.color.text,
                  borderColor: tokenBundle.tokens.color.border,
                  boxShadow: tokenBundle.tokens.shadow.md,
                  borderRadius: tokenBundle.tokens.radius.lg,
                  fontFamily,
                }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: tokenBundle.tokens.color.textMuted }}>
                  Light preview
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Token-ready card</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: tokenBundle.tokens.color.textMuted }}>
                  The preview reflects the generated semantic layer, spacing scale, and type settings.
                </p>
                <button
                  type="button"
                  className="mt-5 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    backgroundColor: tokenBundle.tokens.color.brand[500],
                    color: '#ffffff',
                  }}
                >
                  Primary action
                </button>
              </div>

              {includeDarkMode ? (
                <div
                  className="rounded-[28px] border p-6"
                  style={{
                    backgroundColor: tokenBundle.tokens.dark?.color.surface,
                    color: tokenBundle.tokens.dark?.color.text,
                    borderColor: tokenBundle.tokens.dark?.color.border,
                    boxShadow: tokenBundle.tokens.shadow.md,
                    borderRadius: tokenBundle.tokens.radius.lg,
                    fontFamily,
                  }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: tokenBundle.tokens.dark?.color.textMuted }}>
                    Dark preview
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">Theme switch ready</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: tokenBundle.tokens.dark?.color.textMuted }}>
                    Generated dark tokens are scoped to the same semantic naming so they are easy to wire into a theme toggle.
                  </p>
                  <button
                    type="button"
                    className="mt-5 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{
                      backgroundColor: tokenBundle.tokens.color.accent[500],
                      color: '#ffffff',
                    }}
                  >
                    Accent action
                  </button>
                </div>
              ) : null}
            </div>

            <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
              <p className="text-sm font-medium text-foreground">Spacing and radius</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {Object.entries(tokenBundle.tokens.spacing).map(([key, value]) => (
                    <p key={key}>
                      <span className="font-medium text-foreground">{key}</span>: {value}
                    </p>
                  ))}
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {Object.entries(tokenBundle.tokens.radius).map(([key, value]) => (
                    <p key={key}>
                      <span className="font-medium text-foreground">{key}</span>: {value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Exported token files</CardTitle>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => downloadText(tokenBundle.css, 'tokens.css')}>
                <Download className="h-4 w-4" />
                CSS
              </Button>
              <Button variant="outline" onClick={() => downloadText(tokenBundle.json, 'tokens.json')}>
                <Download className="h-4 w-4" />
                JSON
              </Button>
              <Button variant="outline" onClick={() => downloadText(tokenBundle.tailwind, 'tailwind.tokens.ts')}>
                <Download className="h-4 w-4" />
                Tailwind
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="css" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="css">CSS variables</TabsTrigger>
              <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="css" className="space-y-3">
              <Textarea readOnly value={tokenBundle.css} className="min-h-[360px] font-mono text-sm" />
              <Button variant="outline" onClick={() => void copyOutput(tokenBundle.css, 'CSS variables')}>
                {copiedTab === 'CSS variables' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'CSS variables' ? 'Copied' : 'Copy CSS'}
              </Button>
            </TabsContent>
            <TabsContent value="tailwind" className="space-y-3">
              <Textarea readOnly value={tokenBundle.tailwind} className="min-h-[360px] font-mono text-sm" />
              <Button variant="outline" onClick={() => void copyOutput(tokenBundle.tailwind, 'Tailwind config')}>
                {copiedTab === 'Tailwind config' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'Tailwind config' ? 'Copied' : 'Copy Tailwind'}
              </Button>
            </TabsContent>
            <TabsContent value="json" className="space-y-3">
              <Textarea readOnly value={tokenBundle.json} className="min-h-[360px] font-mono text-sm" />
              <Button variant="outline" onClick={() => void copyOutput(tokenBundle.json, 'JSON tokens')}>
                {copiedTab === 'JSON tokens' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'JSON tokens' ? 'Copied' : 'Copy JSON'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
