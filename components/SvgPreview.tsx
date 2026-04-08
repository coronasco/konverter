'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Eye, Grid2X2, Moon, Palette, SunMedium, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SvgColorEditor from './SvgColorEditor'

interface SvgPreviewProps {
  svgString: string
  originalSvg?: string
  isOptimized?: boolean
  onSvgChange?: (modifiedSvg: string) => void
}

export default function SvgPreview({ svgString, originalSvg, isOptimized = false, onSvgChange }: SvgPreviewProps) {
  const [showColorEditor, setShowColorEditor] = useState(false)
  const [currentSvg, setCurrentSvg] = useState(svgString)
  const [originalSvgState, setOriginalSvgState] = useState(originalSvg || svgString)
  const [editorBaseSvg, setEditorBaseSvg] = useState(svgString)
  const [previewSurface, setPreviewSurface] = useState<'checker' | 'light' | 'dark'>('checker')

  useEffect(() => {
    setCurrentSvg(svgString)
  }, [svgString])

  useEffect(() => {
    setOriginalSvgState(originalSvg || svgString)
  }, [originalSvg, svgString])

  const handleColorChange = (modifiedSvg: string) => {
    setCurrentSvg(modifiedSvg)
    onSvgChange?.(modifiedSvg)
  }

  const surfaceClasses = {
    checker:
      "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y4ZmFmZiIvPgo8L3N2Zz4K')] bg-repeat",
    light: 'bg-white',
    dark: 'bg-slate-950',
  } as const

  const renderSvgPreview = (svgContent: string, className: string = '') => (
    <div className={`flex h-56 w-full items-center justify-center rounded-[22px] border p-4 ${surfaceClasses[previewSurface]} ${className}`}>
      {svgContent ? (
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="flex h-full w-full items-center justify-center"
            dangerouslySetInnerHTML={{
              __html: svgContent.replace(
                /<svg([^>]*)>/g,
                '<svg$1 style="max-width: 100%; max-height: 100%; width: auto; height: auto; display: block;">'
              ),
            }}
          />
        </div>
      ) : (
        <div className="text-center">
          <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Upload an SVG to see the preview</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
            {svgString ? (
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded-full border border-border/70 bg-[var(--surface-secondary)]/80 p-1">
                  <Button
                    type="button"
                    variant={previewSurface === 'checker' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-8 rounded-full px-3"
                    onClick={() => setPreviewSurface('checker')}
                  >
                    <Grid2X2 className="h-4 w-4" />
                    Grid
                  </Button>
                  <Button
                    type="button"
                    variant={previewSurface === 'light' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-8 rounded-full px-3"
                    onClick={() => setPreviewSurface('light')}
                  >
                    <SunMedium className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    type="button"
                    variant={previewSurface === 'dark' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-8 rounded-full px-3"
                    onClick={() => setPreviewSurface('dark')}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-foreground"
                  onClick={() => {
                    if (!showColorEditor) {
                      setEditorBaseSvg(currentSvg)
                    }
                    setShowColorEditor(!showColorEditor)
                  }}
                >
                  <Palette className="h-4 w-4" />
                  {showColorEditor ? 'Hide colors' : 'Edit colors'}
                </Button>
              </div>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isOptimized && originalSvgState && originalSvgState !== svgString ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-blue-600">Original</span>
                  </div>
                  {renderSvgPreview(originalSvgState, 'border-blue-200')}
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-600">Optimized</span>
                  </div>
                  {renderSvgPreview(svgString, 'border-green-200')}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Before</span>
                <ArrowRight className="h-4 w-4" />
                <span>After</span>
              </div>
            </div>
          ) : (
            renderSvgPreview(svgString)
          )}
        </CardContent>
      </Card>

      {showColorEditor && currentSvg ? (
        <SvgColorEditor
          svgContent={currentSvg}
          originalSvg={editorBaseSvg || currentSvg}
          onColorChange={handleColorChange}
        />
      ) : null}

      {!currentSvg ? (
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardContent className="p-4">
            <div className="text-center">
              <Palette className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload an SVG to unlock color editing</p>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
