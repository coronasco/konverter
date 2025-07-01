'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface OutputTabsProps {
  urlEncoded: string
  base64: string
  jsx: string
}

export default function OutputTabs({ urlEncoded, base64, jsx }: OutputTabsProps) {
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

  const CodeBlock = ({ content, label }: { content: string; label: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{content || 'No output available'}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2"
        onClick={() => copyToClipboard(content, label)}
      >
        {copiedTab === label ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url-encoded" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url-encoded">URL-encoded CSS</TabsTrigger>
            <TabsTrigger value="base64">Base64 CSS</TabsTrigger>
            <TabsTrigger value="jsx">React (JSX)</TabsTrigger>
          </TabsList>
          <TabsContent value="url-encoded" className="mt-4">
            <CodeBlock content={urlEncoded} label="url-encoded" />
          </TabsContent>
          <TabsContent value="base64" className="mt-4">
            <CodeBlock content={base64} label="base64" />
          </TabsContent>
          <TabsContent value="jsx" className="mt-4">
            <CodeBlock content={jsx} label="jsx" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 