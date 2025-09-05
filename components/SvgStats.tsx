'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  Palette, 
  Layers, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  Eye,
  Shield
} from 'lucide-react'
import { SVGValidationResult } from '@/lib/svg-validator'

interface SvgStatsProps {
  validation?: SVGValidationResult
  fileStats?: {
    originalSize: number
    optimizedSize: number
    reduction: number
  }
  isOptimized: boolean
  className?: string
}

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export default function SvgStats({ validation, fileStats, isOptimized, className }: SvgStatsProps) {
  const stats = useMemo(() => {
    if (!validation?.info) return null

    const { info } = validation
    const hasWarnings = validation.warnings && validation.warnings.length > 0

    return {
      fileSize: formatFileSize(info.fileSize),
      elements: info.elementCount,
      paths: info.pathCount,
      colors: info.colorCount,
      hasViewBox: info.hasViewBox,
      hasDimensions: info.dimensions.width || info.dimensions.height,
      hasScripts: info.hasScripts,
      hasExternalRefs: info.hasExternalReferences,
      hasWarnings,
      warningCount: validation.warnings?.length || 0
    }
  }, [validation])

  if (!stats && !fileStats) {
    return null
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            SVG Analysis
            {validation?.isValid ? (
              <Badge variant="success" className="ml-auto">
                <CheckCircle className="h-3 w-3 mr-1" />
                Valid
              </Badge>
            ) : (
              <Badge variant="destructive" className="ml-auto">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Invalid
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* File Size Stats */}
          {fileStats && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">File Size Optimization</span>
                {fileStats.reduction > 0 && (
                  <Badge variant="success" className="text-xs">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -{fileStats.reduction.toFixed(1)}%
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {formatFileSize(fileStats.originalSize)}
                  </div>
                  <div className="text-xs text-muted-foreground">Original</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {formatFileSize(fileStats.optimizedSize)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isOptimized ? 'Optimized' : 'Current'}
                  </div>
                </div>
              </div>
              
              {fileStats.reduction > 0 && (
                <Progress 
                  value={fileStats.reduction} 
                  max={100} 
                  variant="success"
                  size="sm"
                />
              )}
            </div>
          )}

          {/* SVG Content Stats */}
          {stats && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">Content Analysis</div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-600" />
                  <span className="text-muted-foreground">Elements:</span>
                  <span className="font-medium">{stats.elements}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-600" />
                  <span className="text-muted-foreground">Paths:</span>
                  <span className="font-medium">{stats.paths}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-pink-600" />
                  <span className="text-muted-foreground">Colors:</span>
                  <span className="font-medium">{stats.colors}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-cyan-600" />
                  <span className="text-muted-foreground">ViewBox:</span>
                  <Badge variant={stats.hasViewBox ? "success" : "warning"} className="text-xs">
                    {stats.hasViewBox ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Security & Quality */}
          {stats && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">Security & Quality</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Scripts/Events</span>
                  </div>
                  <Badge variant={stats.hasScripts ? "warning" : "success"} className="text-xs">
                    {stats.hasScripts ? "Found" : "Clean"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">External References</span>
                  </div>
                  <Badge variant={stats.hasExternalRefs ? "info" : "success"} className="text-xs">
                    {stats.hasExternalRefs ? "Present" : "None"}
                  </Badge>
                </div>
                
                {stats.hasWarnings && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Warnings</span>
                    </div>
                    <Badge variant="warning" className="text-xs">
                      {stats.warningCount}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warnings Display */}
          {validation?.warnings && validation.warnings.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-yellow-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Warnings
              </div>
              <div className="space-y-1">
                {validation.warnings.map((warning, index) => (
                  <div key={index} className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-950/20 p-2 rounded border-l-2 border-yellow-600">
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
