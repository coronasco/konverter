'use client'

import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings } from 'lucide-react'

interface OptionsPanelProps {
  isOptimized: boolean
  onOptimizedChange: (value: boolean) => void
}

export default function OptionsPanel({ isOptimized, onOptimizedChange }: OptionsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Optimize SVG
            </label>
            <p className="text-sm text-muted-foreground">
              Remove unnecessary elements and attributes to reduce file size
            </p>
          </div>
          <Switch
            checked={isOptimized}
            onCheckedChange={onOptimizedChange}
            aria-label="Toggle SVG optimization"
          />
        </div>
      </CardContent>
    </Card>
  )
} 