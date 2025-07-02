'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Palette, Upload } from 'lucide-react'
import { useState } from 'react'
import SvgColorEditor from './SvgColorEditor'

interface SvgPreviewProps {
  svgString: string
  onSvgChange?: (modifiedSvg: string) => void
}

export default function SvgPreview({ svgString, onSvgChange }: SvgPreviewProps) {
  const [showColorEditor, setShowColorEditor] = useState(false)
  const [currentSvg, setCurrentSvg] = useState(svgString)

  // Update currentSvg when svgString changes
  if (svgString !== currentSvg && !showColorEditor) {
    setCurrentSvg(svgString)
  }

  const handleColorChange = (modifiedSvg: string) => {
    setCurrentSvg(modifiedSvg)
    onSvgChange?.(modifiedSvg)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
            {svgString && (
              <button
                onClick={() => setShowColorEditor(!showColorEditor)}
                className="ml-auto flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Palette className="h-4 w-4" />
                {showColorEditor ? 'Hide' : 'Edit Colors'}
              </button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full h-48 border rounded-lg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y4ZmFmZiIvPgo8L3N2Zz4K')] bg-repeat flex items-center justify-center p-4"
          >
            {currentSvg ? (
              <div 
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ 
                  __html: currentSvg.replace(
                    /<svg([^>]*)>/g, 
                    '<svg$1 style="max-width: 100%; max-height: 100%; width: auto; height: auto; display: block;">'
                  )
                }}
              />
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Upload an SVG to see preview</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showColorEditor && currentSvg && (
        <SvgColorEditor 
          svgContent={currentSvg}
          onColorChange={handleColorChange}
        />
      )}

      {!currentSvg && (
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardContent className="p-4">
            <div className="text-center">
              <Palette className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Upload an SVG to unlock color editing</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 