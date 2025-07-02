'use client'

import { useState, useEffect } from 'react'
import SvgInputArea from './SvgInputArea'
import OptionsPanel from './OptionsPanel'
import SvgPreview from './SvgPreview'
import OutputTabs from './OutputTabs'
import { optimizeSvg, urlEncodeSvg, base64EncodeSvg, convertToJsx, validateSvg } from '@/lib/svg-utils'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export default function SvgConverter() {
  const [inputSvg, setInputSvg] = useState<string>('')
  const [optimizedSvg, setOptimizedSvg] = useState<string>('')

  const [isOptimized, setIsOptimized] = useState<boolean>(false)
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false)
  const [fileStats, setFileStats] = useState<{
    originalSize: number
    optimizedSize: number
    reduction: number
  } | null>(null)
  const [output, setOutput] = useState({
    urlEncoded: '',
    base64: '',
    jsx: ''
  })
  const [error, setError] = useState<string | null>(null)

  const handleSvgChange = (newSvg: string) => {
    setInputSvg(newSvg)
    setError(null)
  }

  useEffect(() => {
    const processSvg = async () => {
      if (!inputSvg.trim()) {
        setOutput({ urlEncoded: '', base64: '', jsx: '' })
        setOptimizedSvg('')
        setFileStats(null)
        setError(null)
        return
      }

      // Validează SVG-ul
      const validation = validateSvg(inputSvg)
      if (!validation.isValid) {
        setError(validation.error || 'Input is not a valid SVG')
        setOutput({ urlEncoded: '', base64: '', jsx: '' })
        setOptimizedSvg('')
        setFileStats(null)
        return
      }

      try {
        let svgToProcess = inputSvg
        const originalSize = new Blob([inputSvg]).size

        if (isOptimized) {
          setIsOptimizing(true)
          try {
            const optimized = await optimizeSvg(inputSvg)
            svgToProcess = optimized
            setOptimizedSvg(optimized)
            
            const optimizedSize = new Blob([optimized]).size
            const reduction = ((originalSize - optimizedSize) / originalSize) * 100
            
            setFileStats({
              originalSize,
              optimizedSize,
              reduction
            })
          } catch (optimizeError) {
            console.warn('Optimization failed, using original SVG:', optimizeError)
            svgToProcess = inputSvg
            setOptimizedSvg(inputSvg)
            setFileStats({
              originalSize,
              optimizedSize: originalSize,
              reduction: 0
            })
          } finally {
            setIsOptimizing(false)
          }
        } else {
          setOptimizedSvg(inputSvg)
          setFileStats({
            originalSize,
            optimizedSize: originalSize,
            reduction: 0
          })
        }

        const urlEncoded = urlEncodeSvg(svgToProcess)
        const base64 = base64EncodeSvg(svgToProcess)
        const jsx = convertToJsx(svgToProcess)

        setOutput({
          urlEncoded,
          base64,
          jsx,
        })
        setError(null)
      } catch {
        setError('Failed to process SVG. Please check your input.')
        setOutput({ urlEncoded: '', base64: '', jsx: '' })
        setFileStats(null)
      }
    }

    processSvg()
  }, [inputSvg, isOptimized])



  return (
    <div className="container mx-auto p-6 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SvgInputArea value={inputSvg} onChange={handleSvgChange} />
          <OptionsPanel 
            isOptimized={isOptimized} 
            onOptimizedChange={setIsOptimized} 
          />
        </div>

        <div className="space-y-6">
          <SvgPreview 
            svgString={optimizedSvg} 
            onSvgChange={(modifiedSvg) => {
              // Update output with modified SVG
              const urlEncoded = urlEncodeSvg(modifiedSvg)
              const base64 = base64EncodeSvg(modifiedSvg)
              const jsx = convertToJsx(modifiedSvg)
              setOutput({ urlEncoded, base64, jsx })
            }}
          />
          {isOptimizing && (
            <div className="text-sm text-muted-foreground">
              Optimizing SVG...
            </div>
          )}
          {fileStats && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-sm">File Size Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatFileSize(fileStats.originalSize)}
                  </div>
                  <div className="text-xs text-muted-foreground">Original</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {formatFileSize(fileStats.optimizedSize)}
                  </div>
                  <div className="text-xs text-muted-foreground">Optimized</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${fileStats.reduction > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {fileStats.reduction > 0 ? `-${fileStats.reduction.toFixed(1)}%` : '0%'}
                  </div>
                  <div className="text-xs text-muted-foreground">Reduction</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <OutputTabs 
        urlEncoded={output.urlEncoded}
        base64={output.base64}
        jsx={output.jsx}
      />
    </div>
  )
} 