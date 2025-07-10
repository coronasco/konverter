'use client'

import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Zap, Info, AlertCircle, Gauge } from 'lucide-react'

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
  isOptimizing = false 
}: OptionsPanelProps) {
  const handleToggle = (value: boolean) => {
    console.log('Optimization toggle clicked:', value)
    onOptimizedChange(value)
  }

  const optimizationLevels = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Safe optimizations only',
      features: ['Remove comments', 'Clean whitespace', 'Remove metadata', 'Remove titles'],
      reduction: '5-15%',
      color: 'text-blue-600'
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Good balance of size and safety',
      features: ['All conservative +', 'Remove version', 'Remove unused xmlns', 'Optimize numbers'],
      reduction: '15-30%',
      color: 'text-green-600'
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'Maximum size reduction',
      features: ['All balanced +', 'Remove classes', 'Remove hidden elements', 'Simplify paths'],
      reduction: '30-50%',
      color: 'text-orange-600'
    },
    {
      id: 'maximum',
      name: 'Maximum',
      description: 'Extreme optimization (may affect quality)',
      features: ['All aggressive +', 'Remove styles', 'Remove transforms', 'Remove filters'],
      reduction: '50-70%',
      color: 'text-red-600'
    }
  ]

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          Optimization Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                SVG Optimization
              </label>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Choose your optimization level. Higher levels reduce file size more but may affect visual quality.
            </p>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            {isOptimizing && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Optimizing...</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Switch
                checked={isOptimized}
                onCheckedChange={handleToggle}
                disabled={isOptimizing}
                aria-label="Toggle SVG optimization"
                className="data-[state=checked]:bg-blue-600"
              />
              <div className="flex items-center gap-1">
                {isOptimized ? (
                  <Zap className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-xs font-medium">
                  {isOptimized ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Level Selector */}
        {isOptimized && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Optimization Level</span>
            </div>
            
                        {/* Modern Tab Selector */}
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <div className="flex">
                  {optimizationLevels.map((level) => {
                    const isActive = optimizationLevel === level.id
                    
                    return (
                      <button
                        key={level.id}
                        onClick={() => onOptimizationLevelChange(level.id as 'conservative' | 'balanced' | 'aggressive' | 'maximum')}
                        className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        {level.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Modern Level Details */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {optimizationLevels.find(l => l.id === optimizationLevel)?.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {optimizationLevels.find(l => l.id === optimizationLevel)?.description}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {optimizationLevels.find(l => l.id === optimizationLevel)?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {isOptimized && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Optimization Active</span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Your SVG will be optimized using {optimizationLevels.find(l => l.id === optimizationLevel)?.name.toLowerCase()} settings. 
              Check the preview and file statistics below to see the results.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 