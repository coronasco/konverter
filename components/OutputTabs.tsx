'use client'

import { useState } from 'react'
import { Check, Code, Copy, Download, FileCode, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface OutputTabsProps {
  urlEncoded: string
  base64: string
  jsx: string
  svgString: string
  onOpenJsxModal?: () => void
}

function downloadText(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export default function OutputTabs({ urlEncoded, base64, jsx, svgString, onOpenJsxModal }: OutputTabsProps) {
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
      value: 'svg',
      label: 'Clean SVG',
      icon: FileText,
      note: 'Copy or download the current SVG markup.',
      fileName: 'cleaned.svg',
      content: svgString,
    },
    {
      value: 'url-encoded',
      label: 'CSS data URI',
      icon: Code,
      note: 'Useful for CSS background-image work.',
      fileName: 'svg-data-uri.txt',
      content: urlEncoded,
    },
    {
      value: 'base64',
      label: 'Base64',
      icon: FileCode,
      note: 'Useful for systems that expect Base64 strings.',
      fileName: 'svg-base64.txt',
      content: base64,
    },
    {
      value: 'jsx',
      label: 'React JSX',
      icon: Code,
      note: 'Start here if the SVG is going straight into a React project.',
      fileName: 'SvgIcon.tsx',
      content: jsx,
    },
  ] as const

  const CodeBlock = ({ content, label, note, fileName, allowAdvanced }: {
    content: string
    label: string
    note: string
    fileName: string
    allowAdvanced?: boolean
  }) => (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-border/70 bg-[var(--surface-secondary)]/88 px-4 py-3 text-sm text-muted-foreground">
        {note}
      </div>

      <div className="relative">
        <pre className="max-h-[360px] overflow-x-auto rounded-[20px] border border-border/70 bg-muted/60 p-4 text-sm font-mono">
          <code>{content || 'No output available'}</code>
        </pre>
        <div className="absolute right-2 top-2 flex gap-2">
          <Button variant="outline" size="sm" className="shadow-sm" onClick={() => copyToClipboard(content, label)}>
            {copiedTab === label ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" className="shadow-sm" onClick={() => downloadText(content, fileName)}>
            <Download className="h-4 w-4" />
          </Button>
          {allowAdvanced && onOpenJsxModal ? (
            <Button variant="outline" size="sm" className="shadow-sm" onClick={onOpenJsxModal}>
              Advanced
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Output
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="svg" className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap gap-2 p-1">
            {tabConfig.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex h-auto flex-1 flex-col items-center gap-1 px-2 py-3 text-xs sm:text-sm"
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
                content={tab.content}
                label={tab.value}
                note={tab.note}
                fileName={tab.fileName}
                allowAdvanced={tab.value === 'jsx'}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
