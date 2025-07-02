'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Download, 
  Image, 
  FileText, 
  Smartphone, 
  Monitor, 
  Tablet,
  Palette,
  Zap,
  Upload
} from 'lucide-react'

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
}

export default function ExportFormats({ onExport, hasSvg = false }: ExportFormatsProps) {
  const [imageSize, setImageSize] = useState(512)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [transparent, setTransparent] = useState(false)
  const [quality, setQuality] = useState(90)

  const iconSizes = [16, 24, 32, 48, 64, 128, 256]
  const responsiveSizes = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ]

  const handleImageExport = (format: 'png' | 'jpg' | 'webp') => {
    const options = {
      format,
      width: imageSize,
      height: imageSize,
      backgroundColor: transparent ? 'transparent' : backgroundColor,
      quality
    }
    onExport(`image-${format}`, options)
  }

  const handleIconSetExport = () => {
    iconSizes.forEach(size => {
      const options = {
        format: 'png',
        width: size,
        height: size,
        backgroundColor: transparent ? 'transparent' : backgroundColor,
        quality: 100
      }
      onExport(`icon-${size}px`, options)
    })
  }

  const handleResponsiveExport = (size: { name: string; width: number; height: number }) => {
    const options = {
      format: 'png',
      width: size.width,
      height: size.height,
      backgroundColor: transparent ? 'transparent' : backgroundColor,
      quality
    }
    onExport(`responsive-${size.name.toLowerCase()}`, options)
  }

  const handlePdfExport = () => {
    const options = {
      format: 'pdf',
      width: imageSize,
      height: imageSize,
      backgroundColor: transparent ? 'transparent' : backgroundColor
    }
    onExport('pdf', options)
  }

  if (!hasSvg) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Formats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
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
          Export Formats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Icons
            </TabsTrigger>
            <TabsTrigger value="responsive" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Responsive
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageSize">Image Size (px)</Label>
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
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      disabled={transparent}
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
                  <Label htmlFor="quality">Quality (%)</Label>
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
                <Button 
                  onClick={() => handleImageExport('png')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Export as PNG
                </Button>
                
                <Button 
                  onClick={() => handleImageExport('jpg')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Export as JPG
                </Button>
                
                <Button 
                  onClick={() => handleImageExport('webp')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Export as WebP
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Icon Set Sizes</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {iconSizes.map(size => (
                    <div key={size} className="text-center p-2 border rounded">
                      <div className="text-sm font-medium">{size}px</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleIconSetExport}
                className="w-full"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Complete Icon Set
              </Button>
            </div>
          </TabsContent>

          {/* Responsive Tab */}
          <TabsContent value="responsive" className="space-y-4">
            <div className="space-y-4">
              {responsiveSizes.map(size => (
                <div key={size.name} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    {size.name === 'Mobile' && <Smartphone className="h-4 w-4" />}
                    {size.name === 'Tablet' && <Tablet className="h-4 w-4" />}
                    {size.name === 'Desktop' && <Monitor className="h-4 w-4" />}
                    <div>
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {size.width} × {size.height}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleResponsiveExport(size)}
                    variant="outline"
                    size="sm"
                  >
                    Export
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-4">
              <Button 
                onClick={handlePdfExport}
                className="w-full justify-start"
                variant="outline"
                size="lg"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF Document
              </Button>
              
              <div className="text-sm text-muted-foreground">
                PDF export includes the SVG as a vector graphic, maintaining quality at any scale.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 