'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, ChevronDown, ChevronUp } from 'lucide-react'

interface SvgInputAreaProps {
  value: string
  onChange: (value: string) => void
}

export default function SvgInputArea({ value, onChange }: SvgInputAreaProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        onChange(content)
      }
      reader.readAsText(file)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg']
    },
    multiple: false
  })

  const isLargeContent = value.length > 1000
  const shouldShowExpandButton = isLargeContent && !isExpanded

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Input SVG
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary">Drop SVG file here...</p>
          ) : (
            <p className="text-muted-foreground">
              Drag & drop an SVG file here, or click to select
            </p>
          )}
        </div>
        <div className="mt-4 relative">
          <Textarea
            placeholder="Or paste your SVG code here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`font-mono text-sm transition-all duration-200 ${
              isExpanded 
                ? 'min-h-[600px]' 
                : shouldShowExpandButton 
                  ? 'min-h-[200px] max-h-[200px] overflow-hidden' 
                  : 'min-h-[200px]'
            }`}
          />
          {shouldShowExpandButton && (
            <div className="absolute bottom-2 right-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="bg-background/80 backdrop-blur-sm border shadow-sm"
              >
                <ChevronDown className="h-4 w-4 mr-1" />
                Expand
              </Button>
            </div>
          )}
          {isExpanded && isLargeContent && (
            <div className="absolute bottom-2 right-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="bg-background/80 backdrop-blur-sm border shadow-sm"
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Collapse
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 