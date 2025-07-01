'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye } from 'lucide-react'

interface SvgPreviewProps {
  svgString: string
}

export default function SvgPreview({ svgString }: SvgPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="w-full h-48 border rounded-lg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y4ZmFmZiIvPgo8L3N2Zz4K')] bg-repeat flex items-center justify-center p-4"
        >
          {svgString ? (
            <div 
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ 
                __html: svgString.replace(
                  /<svg([^>]*)>/g, 
                  '<svg$1 style="max-width: 100%; max-height: 100%; width: auto; height: auto; display: block;">'
                )
              }}
            />
          ) : (
            <p className="text-muted-foreground text-sm">
              No SVG to preview
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 