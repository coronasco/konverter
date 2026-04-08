'use client'

import { useCallback } from 'react'
import { AlertCircle, Settings, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { logger } from '@/lib/logger'

interface OptionsPanelProps {
  isOptimized: boolean
  optimizationLevel: 'conservative' | 'balanced' | 'aggressive' | 'maximum'
  onOptimizedChange: (value: boolean) => void
  onOptimizationLevelChange: (level: 'conservative' | 'balanced' | 'aggressive' | 'maximum') => void
  isOptimizing?: boolean
}

export default function OptionsPanel({
  isOptimized,
  optimizationLevel,
  onOptimizedChange,
  onOptimizationLevelChange,
  isOptimizing = false,
}: OptionsPanelProps) {
  const handleToggle = useCallback((value: boolean) => {
    logger.debug('Optimization toggle changed', { enabled: value }, 'OPTIONS_PANEL')
    onOptimizedChange(value)
  }, [onOptimizedChange])

  const handleLevelChange = useCallback((level: 'conservative' | 'balanced' | 'aggressive' | 'maximum') => {
    logger.debug('Optimization level changed', { level }, 'OPTIONS_PANEL')
    onOptimizationLevelChange(level)
  }, [onOptimizationLevelChange])

  const optimizationLevels = [
    {
      id: 'conservative',
      name: 'Light',
      description: 'Small cleanup with the lowest risk.',
      reduction: '5-15%',
    },
    {
      id: 'balanced',
      name: 'Safe',
      description: 'The best default for most SVG files.',
      reduction: '15-30%',
    },
    {
      id: 'aggressive',
      name: 'Strong',
      description: 'Cuts more size and may change some files.',
      reduction: '30-50%',
    },
    {
      id: 'maximum',
      name: 'Maximum',
      description: 'Use only if you are checking the result carefully.',
      reduction: '50-70%',
    },
  ] as const

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-[var(--brand-accent)]" />
          Cleanup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold leading-none">Optimize the SVG before exporting</label>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Good for smaller files, cleaner output, and fewer leftovers from design exports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isOptimizing ? (
              <div className="flex items-center gap-2 text-sm text-[var(--brand-accent)]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--brand-accent)] border-t-transparent"></div>
                <span>Working...</span>
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <Switch
                checked={isOptimized}
                onCheckedChange={handleToggle}
                disabled={isOptimizing}
                aria-label="Toggle SVG optimization"
                className="data-[state=checked]:bg-[var(--brand-accent)]"
              />
              <div className="flex items-center gap-1">
                {isOptimized ? (
                  <Zap className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-xs font-medium">{isOptimized ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        </div>

        {isOptimized ? (
          <>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">How strong should the cleanup be?</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {optimizationLevels.map((level) => {
                  const isActive = optimizationLevel === level.id

                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => handleLevelChange(level.id)}
                      className={`rounded-[22px] border px-4 py-4 text-left transition-colors ${
                        isActive
                          ? 'border-[var(--brand-accent)]/70 bg-[var(--surface-secondary)]/90'
                          : 'border-border/70 bg-white/75 hover:border-foreground/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-foreground">{level.name}</span>
                        <span className="text-xs text-muted-foreground">{level.reduction}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{level.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[20px] border border-border/70 bg-[var(--surface-secondary)]/85 p-4 text-sm leading-6 text-muted-foreground">
              Start with <strong className="text-foreground">Safe</strong>. Move up only if you care more about file size than preserving every little detail from the original export.
            </div>

            <div className="rounded-[20px] border border-border/70 bg-white/80 p-4">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Zap className="h-4 w-4" />
                <span className="font-medium">Optimization is on</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Check the preview before exporting, especially if you picked a stronger cleanup level.
              </p>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
