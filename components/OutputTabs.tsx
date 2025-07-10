'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, Info, Code, FileCode, Palette, Download } from 'lucide-react'

interface OutputTabsProps {
  urlEncoded: string
  base64: string
  jsx: string
  svgString: string
}

export default function OutputTabs({ urlEncoded, base64, jsx, svgString }: OutputTabsProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const copyToClipboard = async (text: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTab(tabName)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const tabConfig = [
    {
      value: 'url-encoded',
      label: 'URL-encoded CSS',
      icon: Code,
      description: 'Perfect for CSS background images. Smaller file size, works in all browsers.',
      useCase: 'Use when you need the SVG as a background image in CSS.',
      example: 'background-image: url("data:image/svg+xml,...")'
    },
    {
      value: 'base64',
      label: 'Base64 CSS',
      icon: FileCode,
      description: 'Encoded as Base64 string. Larger size but more compatible with older systems.',
      useCase: 'Use when you need maximum compatibility or for email templates.',
      example: 'background-image: url("data:image/svg+xml;base64,...")'
    },
    {
      value: 'jsx',
      label: 'React JSX',
      icon: Palette,
      description: 'Ready-to-use React component. Perfect for React/Next.js applications.',
      useCase: 'Use in React components when you need to manipulate the SVG dynamically.',
      example: '<SvgIcon className="w-6 h-6" />'
    }
  ]

  const CodeBlock = ({ content, label, config }: { content: string; label: string; config: typeof tabConfig[0] }) => (
    <div className="space-y-4">
      {/* Info Section */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              {config.description}
            </p>
            <div className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Best for:</strong> {config.useCase}
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 font-mono bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
              {config.example}
            </div>
          </div>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono border">
          <code>{content || 'No output available'}</code>
        </pre>
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
            onClick={() => copyToClipboard(content, label)}
          >
            {copiedTab === label ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          {label === 'jsx' && (
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
              onClick={() => {
                // Trigger JSX export modal
                const event = new CustomEvent('openJsxExport', { detail: { svgString } })
                window.dispatchEvent(event)
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Output Formats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url-encoded" className="w-full">
          <TabsList className="flex w-full h-auto gap-2 p-1">
            {tabConfig.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs sm:text-sm flex-1"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
          
          {tabConfig.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <CodeBlock 
                content={
                  tab.value === 'url-encoded' ? urlEncoded :
                  tab.value === 'base64' ? base64 : jsx
                } 
                label={tab.value}
                config={tab}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
} 