'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Upload, Link as LinkIcon, Palette } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface Color {
  hex: string
  rgb: string
  percentage: number
}

export default function ColorGenerator() {
  const [colors, setColors] = useState<Color[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const rgbToHex = useCallback((r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }, [])

  const extractColorsFromImage = useCallback((src: string) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      
      const colorMap = new Map<string, number>()
      
      // Sample pixels (every 10th pixel for performance)
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        
        // Round to reduce color variations
        const roundedR = Math.round(r / 10) * 10
        const roundedG = Math.round(g / 10) * 10
        const roundedB = Math.round(b / 10) * 10
        
        const key = `${roundedR},${roundedG},${roundedB}`
        colorMap.set(key, (colorMap.get(key) || 0) + 1)
      }
      
      // Sort by frequency and get top 5 colors
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
      
      const totalPixels = sortedColors.reduce((sum, [, count]) => sum + count, 0)
      
      const extractedColors: Color[] = sortedColors.map(([rgb, count]) => {
        const [r, g, b] = rgb.split(',').map(Number)
        const hex = rgbToHex(r, g, b)
        const percentage = Math.round((count / totalPixels) * 100)
        
        return {
          hex,
          rgb: `${r}, ${g}, ${b}`,
          percentage
        }
      })
      
      setColors(extractedColors)
      setIsLoading(false)
    }
    
    img.onerror = () => {
      setIsLoading(false)
      console.error('Failed to load image')
    }
    
    img.src = src
  }, [rgbToHex])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImageSrc(result)
        extractColorsFromImage(result)
      }
      reader.readAsDataURL(file)
    }
  }, [extractColorsFromImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  })

  const loadImageFromUrl = useCallback(() => {
    if (!imageUrl.trim()) return
    
    setIsLoading(true)
    setImageSrc(imageUrl)
    extractColorsFromImage(imageUrl)
  }, [imageUrl, extractColorsFromImage])

  const copyPalette = useCallback(async () => {
    if (colors.length === 0) return
    
    const cssVariables = colors.map((color, index) => 
      `--color-${index + 1}: ${color.hex}; /* ${color.rgb} */`
    ).join('\n  ')
    
    const cssCode = `/* Color Palette */\n:root {\n  ${cssVariables}\n}`
    
    try {
      await navigator.clipboard.writeText(cssCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy palette: ', err)
    }
  }, [colors])

  const clearAll = useCallback(() => {
    setColors([])
    setImageUrl('')
    setImageSrc('')
    setCopied(false)
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Color Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Extract beautiful color palettes from your images. Upload an image or provide a URL to generate CSS color variables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              {isDragActive ? (
                <p className="text-purple-600">Drop the image here...</p>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">Drag & drop an image here</p>
                  <p className="text-sm text-muted-foreground">or click to select a file</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports: JPG, PNG, GIF, WebP</p>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="url"
                placeholder="Or enter image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button 
              onClick={loadImageFromUrl} 
              disabled={!imageUrl.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? 'Loading...' : 'Load from URL'}
            </Button>

            <Button onClick={clearAll} variant="ghost" size="sm" className="w-full">
              Clear All
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Image Preview
              </span>
              {colors.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPalette}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy Palette'}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {imageSrc ? (
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    src={imageSrc}
                    alt="Uploaded image"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="text-white">Extracting colors...</div>
                    </div>
                  )}
                </div>
                
                {colors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Extracted Colors</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg border"
                        >
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-white shadow-lg"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="flex-1">
                            <div className="font-mono text-sm">
                              <div className="font-semibold">{color.hex}</div>
                              <div className="text-muted-foreground">rgb({color.rgb})</div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            {color.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Image preview will appear here...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Color Palette Preview */}
      {colors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Palette Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="p-6 text-center">
                    <div className="text-2xl font-bold mb-2">
                      Color {index + 1}
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2">
                        <div className="font-mono text-sm font-bold">{color.hex}</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2">
                        <div className="font-mono text-sm">rgb({color.rgb})</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Upload className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold">Upload Images</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Drag and drop images or click to upload. Supports JPG, PNG, GIF, and WebP formats.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <LinkIcon className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">URL Input</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Provide an image URL to extract colors from images hosted online.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Copy className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">CSS Variables</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy the generated color palette as CSS custom properties for easy use in your projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 