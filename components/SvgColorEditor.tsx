'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Palette, RotateCcw, Eye, EyeOff } from 'lucide-react'

interface ColorElement {
  id: string
  type: 'fill' | 'stroke'
  originalColor: string
  currentColor: string
  element: Element
}

interface SvgColorEditorProps {
  svgContent: string
  onColorChange: (modifiedSvg: string) => void
}

export default function SvgColorEditor({ svgContent, onColorChange }: SvgColorEditorProps) {
  const [colorElements, setColorElements] = useState<ColorElement[]>([])
  const [isVisible, setIsVisible] = useState(true)

  // Parse SVG and extract color elements
  useEffect(() => {
    if (!svgContent) return

    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
    const svgElement = svgDoc.querySelector('svg')
    
    if (!svgElement) return

    const elements: ColorElement[] = []
    let idCounter = 0

    // Find all elements with fill or stroke attributes
    const allElements = svgElement.querySelectorAll('*')
    console.log('Found', allElements.length, 'elements in SVG')
    
    allElements.forEach((element, index) => {
      const fill = element.getAttribute('fill')
      const stroke = element.getAttribute('stroke')
      
      console.log(`Element ${index}:`, element.tagName, 'fill:', fill, 'stroke:', stroke)
      
      if (fill && fill !== 'none' && fill !== 'currentColor') {
        elements.push({
          id: `fill-${idCounter++}`,
          type: 'fill',
          originalColor: fill,
          currentColor: fill,
          element: element
        })
      }
      
      if (stroke && stroke !== 'none' && stroke !== 'currentColor') {
        elements.push({
          id: `stroke-${idCounter++}`,
          type: 'stroke',
          originalColor: stroke,
          currentColor: stroke,
          element: element
        })
      }
    })

    console.log('Found', elements.length, 'color elements')
    setColorElements(elements)
  }, [svgContent])

  const handleColorChange = (id: string, newColor: string) => {
    console.log('Changing color for', id, 'to', newColor)
    
    const updatedElements = colorElements.map(el => 
      el.id === id ? { ...el, currentColor: newColor } : el
    )
    setColorElements(updatedElements)

    // Update the SVG with new colors
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
    const svgElement = svgDoc.querySelector('svg')
    
    if (!svgElement) return

    // Find and update elements by their position/index
    const allElements = svgElement.querySelectorAll('*')
    
    updatedElements.forEach(colorEl => {
      // Find the element by matching its attributes
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i]
        const elementFill = element.getAttribute('fill')
        const elementStroke = element.getAttribute('stroke')
        
        if (colorEl.type === 'fill' && elementFill === colorEl.originalColor) {
          element.setAttribute('fill', colorEl.currentColor)
          break
        } else if (colorEl.type === 'stroke' && elementStroke === colorEl.originalColor) {
          element.setAttribute('stroke', colorEl.currentColor)
          break
        }
      }
    })

    const modifiedSvg = new XMLSerializer().serializeToString(svgElement)
    console.log('Modified SVG:', modifiedSvg.substring(0, 200) + '...')
    onColorChange(modifiedSvg)
  }

  const resetColors = () => {
    const updatedElements = colorElements.map(el => ({
      ...el,
      currentColor: el.originalColor
    }))
    setColorElements(updatedElements)
    onColorChange(svgContent)
  }

  const getColorTypeLabel = (element: ColorElement) => {
    const tagName = element.element.tagName.toLowerCase()
    const type = element.type === 'fill' ? 'Fill' : 'Stroke'
    return `${tagName} ${type}`
  }

  if (!svgContent) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No SVG content to edit</p>
        </CardContent>
      </Card>
    )
  }

  if (colorElements.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No color elements found in this SVG</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Editor
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="ml-auto"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isVisible && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Found {colorElements.length} color elements
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={resetColors}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-3 w-3" />
                Reset All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {colorElements.map((element) => (
                <div key={element.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-muted-foreground block truncate">
                      {getColorTypeLabel(element)}
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: element.currentColor }}
                      />
                      <span className="text-sm font-mono">
                        {element.currentColor}
                      </span>
                    </div>
                  </div>
                  <input
                    type="color"
                    value={element.currentColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColorChange(element.id, e.target.value)}
                    className="w-12 h-8 p-1 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 