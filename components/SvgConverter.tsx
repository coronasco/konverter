'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'
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

  const debouncedInputSvg = useDebounce(inputSvg, 300)
  const [isOptimizing, setIsOptimizing] = useState(false)

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

  const handleSvgPreviewChange = useCallback((modifiedSvg: string) => {
    if (isOptimized) {
      setOptimizedSvg(modifiedSvg)
    } else {
      handleSvgChange(modifiedSvg)
    }
  }, [isOptimized, handleSvgChange])

  const validationResult = useMemo(() => {
    if (!debouncedInputSvg.trim()) {
      return null
    }
    return validateSvgAdvanced(debouncedInputSvg)
  }, [debouncedInputSvg])

  const processedSvgData = useMemo(() => {
    if (!debouncedInputSvg.trim()) {
      return null
    }

    if (!validationResult?.isValid) {
      return { error: validationResult?.error || 'Input is not a valid SVG' }
    }

    return {
      svg: debouncedInputSvg,
      originalSize: new Blob([debouncedInputSvg]).size,
    }
  }, [debouncedInputSvg, validationResult])

  useEffect(() => {
    const processSvg = async () => {
      if (!processedSvgData) {
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
              reduction,
            })
          } catch (optimizeError) {
            logger.warn('Optimization failed, using original SVG', optimizeError, 'SVG_CONVERTER')
            setOptimizedSvg(processedSvgData.svg)
            setFileStats({
              originalSize,
              optimizedSize: originalSize,
              reduction: 0,
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
            reduction: 0,
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

  const activeSvg = isOptimized ? optimizedSvg : debouncedInputSvg

  const output = useMemo(() => {
    if (!activeSvg.trim()) {
      return { urlEncoded: '', base64: '', jsx: '' }
    }

    logger.debug('Generating output formats', { isOptimized }, 'SVG_CONVERTER')

    return {
      urlEncoded: urlEncodeSvg(activeSvg),
      base64: base64EncodeSvg(activeSvg),
      jsx: convertToJsx(activeSvg),
    }
  }, [activeSvg, isOptimized])

  return (
    <div className="space-y-6">
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <SvgInputArea value={inputSvg} onChange={handleSvgChange} />
          <OutputTabs
            urlEncoded={output.urlEncoded}
            base64={output.base64}
            jsx={output.jsx}
            svgString={activeSvg}
            onOpenJsxModal={() => setShowJsxExport(true)}
          />
          <ExportFormats
            onExport={handleExport}
            hasSvg={!!activeSvg}
            onOpenJsxModal={() => setShowJsxExport(true)}
          />
        </div>

        <div className="space-y-6">
          <SvgPreview
            svgString={activeSvg}
            originalSvg={inputSvg}
            isOptimized={isOptimized}
            onSvgChange={handleSvgPreviewChange}
          />
          <OptionsPanel
            isOptimized={isOptimized}
            optimizationLevel={optimizationLevel}
            onOptimizedChange={setIsOptimized}
            onOptimizationLevelChange={setOptimizationLevel}
            isOptimizing={isOptimizing}
          />
          {isOptimizing ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--brand-accent)] border-t-transparent"></div>
              Cleaning up the SVG...
            </div>
          ) : null}
          <SvgStats
            validation={validationResult || undefined}
            fileStats={fileStats || undefined}
            isOptimized={isOptimized}
          />
        </div>
      </div>

      {activeSvg ? (
        <details className="group rounded-[28px] border border-border/70 bg-card/86 shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 text-sm font-medium text-foreground">
            Advanced tools
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="grid grid-cols-1 gap-6 px-6 pb-6 lg:grid-cols-2">
            <ResponsiveSvgBuilder svgContent={activeSvg} />
            <SvgAnimationEditor svgContent={activeSvg} />
          </div>
        </details>
      ) : null}

      {isExporting ? (
        <div className="text-center text-sm text-muted-foreground">Exporting...</div>
      ) : null}

      {showJsxExport ? (
        <JsxExportModal
          svgString={activeSvg}
          onClose={() => setShowJsxExport(false)}
        />
      ) : null}
    </div>
  )
}
