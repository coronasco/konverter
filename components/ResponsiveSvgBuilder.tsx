'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Copy,
  Check,
  Maximize2
} from 'lucide-react'

interface ResponsiveSvgBuilderProps {
  svgContent: string
}

interface ViewBox {
  x: number
  y: number
  width: number
  height: number
}

interface ResponsiveBreakpoint {
  name: string
  width: number
  height: number
  icon: React.ReactNode
}

export default function ResponsiveSvgBuilder({ svgContent }: ResponsiveSvgBuilderProps) {
  const [viewBox, setViewBox] = useState<ViewBox | null>(null)
  const [currentSize, setCurrentSize] = useState(300)
  const [copied, setCopied] = useState(false)
  const [responsiveCss, setResponsiveCss] = useState('')

  const breakpoints: ResponsiveBreakpoint[] = [
    { name: 'Mobile', width: 375, height: 667, icon: <Smartphone className="h-4 w-4" /> },
    { name: 'Tablet', width: 768, height: 1024, icon: <Tablet className="h-4 w-4" /> },
    { name: 'Desktop', width: 1920, height: 1080, icon: <Monitor className="h-4 w-4" /> }
  ]

  // Parse SVG and extract viewBox
  useEffect(() => {
    if (!svgContent) return

    try {
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
      const svgElement = svgDoc.querySelector('svg')
      
      if (svgElement) {
        const viewBoxAttr = svgElement.getAttribute('viewBox')
        const widthAttr = svgElement.getAttribute('width')
        const heightAttr = svgElement.getAttribute('height')
        
        if (viewBoxAttr) {
          const [x, y, width, height] = viewBoxAttr.split(' ').map(Number)
          setViewBox({ x, y, width, height })
        } else if (widthAttr && heightAttr) {
          setViewBox({ x: 0, y: 0, width: Number(widthAttr), height: Number(heightAttr) })
        }
      }
    } catch (error) {
      console.error('Error parsing SVG:', error)
    }
  }, [svgContent])

  // Generate responsive CSS
  useEffect(() => {
    if (!viewBox) return

    const aspectRatio = viewBox.width / viewBox.height
    const css = `
/* Responsive SVG CSS */
.responsive-svg {
  width: 100%;
  height: auto;
  max-width: ${viewBox.width}px;
  aspect-ratio: ${aspectRatio};
}

/* Mobile (up to 768px) */
@media (max-width: 768px) {
  .responsive-svg {
    max-width: 100%;
    width: 100%;
  }
}

/* Tablet (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .responsive-svg {
    max-width: 80%;
  }
}

/* Desktop (1025px and up) */
@media (min-width: 1025px) {
  .responsive-svg {
    max-width: ${viewBox.width}px;
  }
}

/* Optional: Custom sizes */
.responsive-svg.small {
  max-width: 200px;
}

.responsive-svg.medium {
  max-width: 400px;
}

.responsive-svg.large {
  max-width: 600px;
}
`.trim()

    setResponsiveCss(css)
  }, [viewBox])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(responsiveCss)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy CSS: ', err)
    }
  }

  const getScaledSvg = (width: number) => {
    if (!viewBox) return svgContent
    
    const aspectRatio = viewBox.width / viewBox.height
    const height = width / aspectRatio
    
    return svgContent.replace(
      /<svg([^>]*)>/g,
      `<svg$1 width="${width}" height="${height}" style="max-width: 100%; height: auto; display: block; overflow: visible;">`
    )
  }

  if (!svgContent) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5" />
            Responsive SVG Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Maximize2 className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Upload an SVG to build responsive CSS</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Maximize2 className="h-5 w-5" />
          Responsive SVG Builder
          {viewBox && (
            <span className="text-sm text-muted-foreground font-normal">
              ({viewBox.width}×{viewBox.height})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="size">Preview Size (px)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    type="range"
                    id="size"
                    min="50"
                    max="800"
                    step="10"
                    value={currentSize}
                    onChange={(e) => setCurrentSize(Number(e.target.value))}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={currentSize}
                    onChange={(e) => setCurrentSize(Number(e.target.value))}
                    className="w-20"
                    min="50"
                    max="800"
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-muted/20 overflow-hidden">
                <div 
                  className="mx-auto"
                  style={{ 
                    width: `${Math.min(currentSize, 600)}px`,
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: getScaledSvg(Math.min(currentSize, 600))
                  }}
                />
              </div>

              {viewBox && (
                <div className="text-sm text-muted-foreground">
                  <p>Aspect ratio: {(viewBox.width / viewBox.height).toFixed(2)}:1</p>
                  <p>Original size: {viewBox.width}×{viewBox.height}</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Breakpoints Tab */}
          <TabsContent value="breakpoints" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {breakpoints.map((breakpoint) => (
                <div key={breakpoint.name} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-shrink-0">
                      {breakpoint.icon}
                    </div>
                    <h3 className="font-medium text-sm truncate">{breakpoint.name}</h3>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {breakpoint.width}×{breakpoint.height}
                  </div>
                  <div className="border rounded bg-muted/20 p-2 overflow-hidden">
                    <div 
                      className="mx-auto"
                      style={{ 
                        width: `${Math.min(breakpoint.width * 0.2, 100)}px`,
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: getScaledSvg(Math.min(breakpoint.width * 0.2, 100))
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* CSS Tab */}
          <TabsContent value="css" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Generated Responsive CSS</Label>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy CSS
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{responsiveCss}</code>
                </pre>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Usage:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  &lt;div className=&quot;responsive-svg&quot;&gt;{svgContent}&lt;/div&gt;
                </code>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 