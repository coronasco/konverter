'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import SvgInputArea from './SvgInputArea'
import OptionsPanel from './OptionsPanel'
import SvgPreview from './SvgPreview'
import OutputTabs from './OutputTabs'
import ExportFormats from './ExportFormats'
import ResponsiveSvgBuilder from './ResponsiveSvgBuilder'
import SvgAnimationEditor from './SvgAnimationEditor'
import JsxExportModal from './JsxExportModal'
import { optimizeSvg, urlEncodeSvg, base64EncodeSvg, convertToJsx, validateSvgAdvanced } from '@/lib/svg-utils'
import { exportToImage, exportToPdf } from '@/lib/export-utils'
import { useDebounce } from '@/lib/hooks'
import { logger } from '@/lib/logger'
import { showToast } from '@/components/Toast'
import SvgStats from '@/components/SvgStats'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'


export default function SvgConverter() {
  const [inputSvg, setInputSvg] = useState<string>('')
  const [optimizedSvg, setOptimizedSvg] = useState<string>('')
  const [isOptimized, setIsOptimized] = useState<boolean>(false)
  const [optimizationLevel, setOptimizationLevel] = useState<'conservative' | 'balanced' | 'aggressive' | 'maximum'>('balanced')
  const [fileStats, setFileStats] = useState<{
    originalSize: number
    optimizedSize: number
    reduction: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [showJsxExport, setShowJsxExport] = useState(false)

  // Debounce input pentru a preveni procesarea frecventă
  const debouncedInputSvg = useDebounce(inputSvg, 300)
  
  // Cache pentru rezultate - temporar dezactivat pentru a evita re-rendering
  // const cache = useCache<string>('svg-processing', 5 * 60 * 1000) // 5 minute cache
  
  // Async operation pentru optimizare - temporar simplificat
  const [isOptimizing, setIsOptimizing] = useState(false)
  // const svgOptimizer = useAsyncOperation(optimizeSvg)
  
  // Debug tracking removed - component is now stable

  const handleSvgChange = useCallback((newSvg: string) => {
    setInputSvg(newSvg)
    setError(null)
  }, [])

  const handleExport = useCallback(async (format: string, options: { format: string; width: number; height: number; backgroundColor: string; quality?: number }) => {
    const currentSvg = isOptimized ? optimizedSvg : inputSvg
    if (!currentSvg) {
      setError('No SVG to export')
      return
    }

    setIsExporting(true)
    try {
      if (format.startsWith('image-')) {
        const imageFormat = format.replace('image-', '') as 'png' | 'jpg' | 'webp'
        await exportToImage(currentSvg, { ...options, format: imageFormat })
      } else if (format.startsWith('icon-')) {
        const size = parseInt(format.replace('icon-', '').replace('px', ''))
        await exportToImage(currentSvg, { ...options, width: size, height: size, format: 'png' })
      } else if (format.startsWith('responsive-')) {
        await exportToImage(currentSvg, { ...options, format: 'png' })
      } else if (format === 'pdf') {
        await exportToPdf(currentSvg, options)
      }
    } catch (error) {
      logger.error('Export failed', error, 'SVG_CONVERTER')
              const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setError(`Export failed: ${errorMessage}`)
        showToast.error(`Export failed: ${errorMessage}`)
    } finally {
      setIsExporting(false)
    }
  }, [optimizedSvg, inputSvg, isOptimized])

  const handleOpenJsxModal = useCallback(() => {
    setShowJsxExport(true)
  }, [])

  const handleOptimizedChange = useCallback((value: boolean) => {
    setIsOptimized(value)
  }, [])

  const handleOptimizationLevelChange = useCallback((level: 'conservative' | 'balanced' | 'aggressive' | 'maximum') => {
    setOptimizationLevel(level)
  }, [])

  const handleSvgPreviewChange = useCallback((modifiedSvg: string) => {
    // Update the SVG that's being used for processing
    if (isOptimized) {
      setOptimizedSvg(modifiedSvg)
    } else {
      handleSvgChange(modifiedSvg)
    }
  }, [isOptimized, handleSvgChange])

  const handleCloseJsxModal = useCallback(() => {
    setShowJsxExport(false)
  }, [])

  // Memoized validation result
  const validationResult = useMemo(() => {
    if (!debouncedInputSvg.trim()) {
      return null
    }
    return validateSvgAdvanced(debouncedInputSvg)
  }, [debouncedInputSvg])

  // Effect pentru a actualiza validation state - ELIMINAT pentru a evita loop-uri
  // useEffect(() => {
  //   setValidation(validationResult)
  // }, [validationResult])

  // Memoized processed SVG pentru a evita recalcularea
  const processedSvgData = useMemo(() => {
    if (!debouncedInputSvg.trim()) {
      return null
    }
    
    if (!validationResult?.isValid) {
      return { error: validationResult?.error || 'Input is not a valid SVG' }
    }

    const originalSize = new Blob([debouncedInputSvg]).size
    
    return {
      svg: debouncedInputSvg,
      originalSize
    }
  }, [debouncedInputSvg, validationResult])

  // Effect pentru procesarea SVG cu optimizare async
  useEffect(() => {
    const processSvg = async () => {
      if (!processedSvgData) {
        // Clear everything
        setOptimizedSvg('')
        setFileStats(null)
        setError(null)
        return
      }

      if ('error' in processedSvgData) {
        setError(processedSvgData.error || 'Unknown error')
        setOptimizedSvg('')
        setFileStats(null)
        return
      }

      try {
        const { originalSize } = processedSvgData

        if (isOptimized) {
          logger.debug('Starting SVG optimization', { level: optimizationLevel }, 'SVG_CONVERTER')
          
          try {
            setIsOptimizing(true)
            const optimized = await optimizeSvg(processedSvgData.svg, optimizationLevel)
            setOptimizedSvg(optimized)
            
            const optimizedSize = new Blob([optimized]).size
            const reduction = ((originalSize - optimizedSize) / originalSize) * 100
            
            setFileStats({
              originalSize,
              optimizedSize,
              reduction
            })

            // Cache rezultatul - temporar dezactivat
            // cache.set(cacheKey, JSON.stringify({
            //   optimized,
            //   fileStats: { originalSize, optimizedSize, reduction }
            // }))
          } catch (optimizeError) {
            logger.warn('Optimization failed, using original SVG', optimizeError, 'SVG_CONVERTER')
            setOptimizedSvg(processedSvgData.svg)
            setFileStats({
              originalSize,
              optimizedSize: originalSize,
              reduction: 0
            })
            showToast.warning('SVG optimization failed, using original version')
          } finally {
            setIsOptimizing(false)
          }
        } else {
          setOptimizedSvg(processedSvgData.svg)
          setFileStats({
            originalSize,
            optimizedSize: originalSize,
            reduction: 0
          })
        }

        setError(null)
      } catch (error) {
        logger.error('Failed to process SVG', error, 'SVG_CONVERTER')
        const errorMessage = 'Failed to process SVG. Please check your input.'
        setError(errorMessage)
        setFileStats(null)
        showToast.error(errorMessage)
      }
    }

    processSvg()
  }, [processedSvgData, optimizationLevel, isOptimized])

  // Memoized output pentru a evita recalcularea frecventă
  const output = useMemo(() => {
    const svgToProcess = isOptimized ? optimizedSvg : debouncedInputSvg
    
    if (!svgToProcess.trim()) {
      return { urlEncoded: '', base64: '', jsx: '' }
    }

    logger.debug('Generating output formats', { isOptimized }, 'SVG_CONVERTER')
    
    const urlEncoded = urlEncodeSvg(svgToProcess)
    const base64 = base64EncodeSvg(svgToProcess)
    const jsx = convertToJsx(svgToProcess)

    return {
      urlEncoded,
      base64,
      jsx,
    }
  }, [isOptimized, optimizedSvg, debouncedInputSvg])

  // Listen for JSX export events
  useEffect(() => {
    const handleJsxExport = (event: CustomEvent) => {
      logger.debug('JSX Export triggered', { 
        hasSvgString: !!event.detail?.svgString 
      }, 'SVG_CONVERTER')
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
            onOptimizedChange={handleOptimizedChange}
            onOptimizationLevelChange={handleOptimizationLevelChange}
            isOptimizing={isOptimizing}
          />
        </div>

        <div className="space-y-6">
          <SvgPreview 
            svgString={isOptimized ? optimizedSvg : debouncedInputSvg} 
            originalSvg={inputSvg}
            isOptimized={isOptimized}
            onSvgChange={handleSvgPreviewChange}
          />
          {isOptimizing && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              Optimizing SVG...
            </div>
          )}
          <SvgStats 
            validation={validationResult || undefined} 
            fileStats={fileStats || undefined}
            isOptimized={isOptimized}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OutputTabs 
          urlEncoded={output.urlEncoded}
          base64={output.base64}
          jsx={output.jsx}
          svgString={isOptimized ? optimizedSvg : debouncedInputSvg}
        />
        
        <ExportFormats 
          onExport={handleExport}
          hasSvg={!!(isOptimized ? optimizedSvg : debouncedInputSvg)}
          onOpenJsxModal={handleOpenJsxModal}
        />
      </div>

      {(isOptimized ? optimizedSvg : debouncedInputSvg) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveSvgBuilder svgContent={isOptimized ? optimizedSvg : debouncedInputSvg} />
          <SvgAnimationEditor svgContent={isOptimized ? optimizedSvg : debouncedInputSvg} />
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
          svgString={isOptimized ? optimizedSvg : debouncedInputSvg}
          onClose={handleCloseJsxModal}
        />
      )}
    </div>
  )
} 