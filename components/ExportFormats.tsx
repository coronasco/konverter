'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Download,
  FileCode,
  FileText,
  Image as ImageIcon,
  Monitor,
  Smartphone,
  Tablet,
  Upload,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface ExportOptions {
  format: string
  width: number
  height: number
  backgroundColor: string
  quality?: number
}

interface ExportFormatsProps {
  onExport: (format: string, options: ExportOptions) => void
  hasSvg?: boolean
  onOpenJsxModal?: () => void
}

export default function ExportFormats({ onExport, hasSvg = false, onOpenJsxModal }: ExportFormatsProps) {
  const [imageSize, setImageSize] = useState(512)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [transparent, setTransparent] = useState(false)
  const [quality, setQuality] = useState(90)

  const iconSizes = [16, 24, 32, 48, 64, 128, 256]
  const responsiveSizes = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ]

  const handleImageExport = (format: 'png' | 'jpg' | 'webp') => {
    onExport(`image-${format}`, {
      format,
      width: imageSize,
      height: imageSize,
      backgroundColor: transparent ? 'transparent' : backgroundColor,
      quality,
    })
  }

  const handleIconSetExport = () => {
    iconSizes.forEach((size) => {
      onExport(`icon-${size}px`, {
        format: 'png',
        width: size,
        height: size,
        backgroundColor: transparent ? 'transparent' : backgroundColor,
        quality: 100,
      })
    })
  }

  const handleResponsiveExport = (size: { name: string; width: number; height: number }) => {
    onExport(`responsive-${size.name.toLowerCase()}`, {
      format: 'png',
      width: size.width,
      height: size.height,
      backgroundColor: transparent ? 'transparent' : backgroundColor,
      quality,
    })
  }

  const handlePdfExport = () => {
    onExport('pdf', {
      format: 'pdf',
      width: imageSize,
      height: imageSize,
      backgroundColor: transparent ? 'transparent' : backgroundColor,
    })
  }

  if (!hasSvg) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Upload an SVG to unlock export options</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageSize">Image size</Label>
                <Input
                  id="imageSize"
                  type="number"
                  value={imageSize}
                  onChange={(e) => setImageSize(Number(e.target.value))}
                  min="16"
                  max="2048"
                  step="16"
                />
              </div>

              <div>
                <Label htmlFor="backgroundColor">Background</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    disabled={transparent}
                    className="w-20"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="transparent"
                      checked={transparent}
                      onCheckedChange={setTransparent}
                    />
                    <Label htmlFor="transparent">Transparent</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="quality">Quality</Label>
                <Input
                  id="quality"
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
                <span className="text-sm text-muted-foreground">{quality}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Quick exports for the formats people usually need first.
              </p>
              <Button onClick={() => handleImageExport('png')} className="w-full justify-start" variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Export PNG
              </Button>
              <Button onClick={() => handleImageExport('webp')} className="w-full justify-start" variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Export WebP
              </Button>
              <Button onClick={() => handleImageExport('jpg')} className="w-full justify-start" variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Export JPG
              </Button>
            </div>
          </div>

          <div className="rounded-[22px] border border-border/70 bg-[var(--surface-secondary)]/88 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">Icon sizes</p>
                <p className="mt-1 text-sm text-muted-foreground">Good for app icons, favicons, and quick asset handoff.</p>
              </div>
              <Button onClick={handleIconSetExport} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export set
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-7">
              {iconSizes.map((size) => (
                <div key={size} className="rounded-full border border-border/70 bg-white/80 px-3 py-2 text-center text-sm text-foreground">
                  {size}px
                </div>
              ))}
            </div>
          </div>

          <details className="group rounded-[22px] border border-border/70 bg-white/70">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-medium text-foreground">
              Advanced exports
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-4 px-4 pb-4">
              <div className="grid gap-3">
                {responsiveSizes.map((size) => (
                  <div key={size.name} className="flex items-center justify-between rounded-[18px] border border-border/70 px-3 py-3">
                    <div className="flex items-center gap-3">
                      {size.name === 'Mobile' ? <Smartphone className="h-4 w-4" /> : null}
                      {size.name === 'Tablet' ? <Tablet className="h-4 w-4" /> : null}
                      {size.name === 'Desktop' ? <Monitor className="h-4 w-4" /> : null}
                      <div>
                        <div className="font-medium">{size.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {size.width} × {size.height}
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleResponsiveExport(size)} variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Button onClick={handlePdfExport} className="justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
                {onOpenJsxModal ? (
                  <Button onClick={onOpenJsxModal} className="justify-start" variant="outline">
                    <FileCode className="mr-2 h-4 w-4" />
                    Open JSX export
                  </Button>
                ) : null}
              </div>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  )
}
