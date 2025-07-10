'use client'

import { useState, useEffect } from 'react'
import SvgInputArea from './SvgInputArea'
import OptionsPanel from './OptionsPanel'
import SvgPreview from './SvgPreview'
import OutputTabs from './OutputTabs'
import ExportFormats from './ExportFormats'
import ResponsiveSvgBuilder from './ResponsiveSvgBuilder'
import SvgAnimationEditor from './SvgAnimationEditor'
import JsxExportModal from './JsxExportModal'
import { optimizeSvg, urlEncodeSvg, base64EncodeSvg, convertToJsx, validateSvg } from '@/lib/svg-utils'
import { exportToImage, exportToPdf } from '@/lib/export-utils'
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
  const [optimizationLevel, setOptimizationLevel] = useState<'conservative' | 'balanced' | 'aggressive' | 'maximum'>('balanced')
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
  const [isExporting, setIsExporting] = useState(false)
  const [showJsxExport, setShowJsxExport] = useState(false)

  const handleSvgChange = (newSvg: string) => {
    setInputSvg(newSvg)
    setError(null)
  }

  const handleExport = async (format: string, options: { format: string; width: number; height: number; backgroundColor: string; quality?: number }) => {
    if (!optimizedSvg) {
      setError('No SVG to export')
      return
    }

    setIsExporting(true)
    try {
      if (format.startsWith('image-')) {
        const imageFormat = format.replace('image-', '') as 'png' | 'jpg' | 'webp'
        await exportToImage(optimizedSvg, { ...options, format: imageFormat })
      } else if (format.startsWith('icon-')) {
        const size = parseInt(format.replace('icon-', '').replace('px', ''))
        await exportToImage(optimizedSvg, { ...options, width: size, height: size, format: 'png' })
      } else if (format.startsWith('responsive-')) {
        await exportToImage(optimizedSvg, { ...options, format: 'png' })
      } else if (format === 'pdf') {
        await exportToPdf(optimizedSvg, options)
      }
    } catch (error) {
      setError(`Export failed: ${error}`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleOpenJsxModal = () => {
    setShowJsxExport(true)
  }

  // Process SVG when input, optimization settings, or optimized SVG changes
  useEffect(() => {
    const processSvg = async () => {
      console.log('🔄 useEffect triggered - Processing SVG...', { 
        inputSvgLength: inputSvg.length, 
        isOptimized, 
        hasInputSvg: !!inputSvg.trim() 
      })
      
      if (!inputSvg.trim()) {
        console.log('❌ No input SVG, clearing everything')
        setOutput({ urlEncoded: '', base64: '', jsx: '' })
        setOptimizedSvg('')
        setFileStats(null)
        setError(null)
        return
      }

      // Validează SVG-ul
      const validation = validateSvg(inputSvg)
      if (!validation.isValid) {
        console.log('❌ SVG validation failed:', validation.error)
        setError(validation.error || 'Input is not a valid SVG')
        setOutput({ urlEncoded: '', base64: '', jsx: '' })
        setOptimizedSvg('')
        setFileStats(null)
        return
      }

      try {
        let svgToProcess = inputSvg
        const originalSize = new Blob([inputSvg]).size
        console.log('📊 Original size:', originalSize, 'bytes')

        if (isOptimized) {
          console.log('🚀 Starting optimization with level:', optimizationLevel)
          setIsOptimizing(true)
          try {
            const optimized = await optimizeSvg(inputSvg, optimizationLevel)
            console.log('✅ Optimization completed, result length:', optimized.length)
            svgToProcess = optimized
            setOptimizedSvg(optimized)
            
            const optimizedSize = new Blob([optimized]).size
            const reduction = ((originalSize - optimizedSize) / originalSize) * 100
            console.log('📊 Optimized size:', optimizedSize, 'bytes, Reduction:', reduction.toFixed(1) + '%')
            
            setFileStats({
              originalSize,
              optimizedSize,
              reduction
            })
            console.log('📈 File stats updated')
          } catch (optimizeError) {
            console.warn('⚠️ Optimization failed, using original SVG:', optimizeError)
            svgToProcess = inputSvg
            setOptimizedSvg(inputSvg)
            setFileStats({
              originalSize,
              optimizedSize: originalSize,
              reduction: 0
            })
          } finally {
            setIsOptimizing(false)
            console.log('🏁 Optimization process finished')
          }
        } else {
          console.log('⏭️ Optimization disabled, using original SVG')
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
        console.log('✅ Output updated with processed SVG')
        setError(null)
      } catch (error) {
        console.error('❌ Failed to process SVG:', error)
        setError('Failed to process SVG. Please check your input.')
        setOutput({ urlEncoded: '', base64: '', jsx: '' })
        setFileStats(null)
      }
    }

    processSvg()
  }, [inputSvg, isOptimized, optimizationLevel])

  // Update output when optimizedSvg changes (e.g., from color editor)
  useEffect(() => {
    if (!optimizedSvg.trim()) return
    
    console.log('🎨 Color change detected, updating output...')
    
    const svgToProcess = isOptimized ? optimizedSvg : inputSvg
    
    const urlEncoded = urlEncodeSvg(svgToProcess)
    const base64 = base64EncodeSvg(svgToProcess)
    const jsx = convertToJsx(svgToProcess)

    setOutput({
      urlEncoded,
      base64,
      jsx,
    })
    console.log('✅ Output updated after color change')
  }, [optimizedSvg, isOptimized, inputSvg])

  // Listen for JSX export events
  useEffect(() => {
    const handleJsxExport = (event: CustomEvent) => {
      console.log('🎨 JSX Export triggered with SVG:', event.detail?.svgString?.substring(0, 100) + '...')
      setShowJsxExport(true)
    }

    window.addEventListener('openJsxExport', handleJsxExport as EventListener)
    
    return () => {
      window.removeEventListener('openJsxExport', handleJsxExport as EventListener)
    }
  }, [])

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
            optimizationLevel={optimizationLevel}
            onOptimizedChange={setIsOptimized}
            onOptimizationLevelChange={setOptimizationLevel}
            isOptimizing={isOptimizing}
          />
        </div>

        <div className="space-y-6">
          <SvgPreview 
            svgString={isOptimized ? optimizedSvg : inputSvg} 
            originalSvg={inputSvg}
            isOptimized={isOptimized}
            onSvgChange={(modifiedSvg) => {
              // Update the SVG that's being used for processing
              if (isOptimized) {
                setOptimizedSvg(modifiedSvg)
              } else {
                handleSvgChange(modifiedSvg)
              }
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OutputTabs 
          urlEncoded={output.urlEncoded}
          base64={output.base64}
          jsx={output.jsx}
          svgString={isOptimized ? optimizedSvg : inputSvg}
        />
        
        <ExportFormats 
          onExport={handleExport}
          hasSvg={!!optimizedSvg}
          onOpenJsxModal={handleOpenJsxModal}
        />
      </div>

      {(isOptimized ? optimizedSvg : inputSvg) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveSvgBuilder svgContent={isOptimized ? optimizedSvg : inputSvg} />
          <SvgAnimationEditor svgContent={isOptimized ? optimizedSvg : inputSvg} />
        </div>
      )}

      {isExporting && (
        <div className="text-sm text-muted-foreground text-center">
          Exporting...
        </div>
      )}

      {/* JSX Export Modal */}
      {showJsxExport && (
        <JsxExportModal 
          svgString={isOptimized ? optimizedSvg : inputSvg}
          onClose={() => setShowJsxExport(false)}
        />
      )}
    </div>
  )
} 