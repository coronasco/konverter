'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Download, FileCode, Palette, Settings, ChevronUp } from 'lucide-react'
import { generateReactComponent } from '@/lib/svg-utils'
import { showToast } from '@/components/Toast'
import { logger } from '@/lib/logger'

interface JsxExportModalProps {
  svgString: string
  onClose?: () => void
}

export default function JsxExportModal({ svgString, onClose }: JsxExportModalProps) {
  const [componentName, setComponentName] = useState('SvgIcon')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('component')

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      logger.error('Failed to copy text', err, 'JSX_EXPORT')
      showToast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    // Close modal after download
    if (onClose) {
      onClose()
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const simpleJsx = `const ${componentName} = (props) => (
  <svg {...props}>
    {/* SVG content */}
  </svg>
);

export default ${componentName};`

  const advancedComponent = generateReactComponent(svgString, componentName)

  const usageExample = `import ${componentName} from './${componentName}'

function App() {
  return (
    <div>
      {/* Basic usage */}
      <${componentName} className="w-6 h-6" />
      
      {/* With custom colors */}
      <${componentName} 
        className="w-8 h-8" 
        fill0="#ff0000"
        stroke0="#000000"
      />
      
      {/* With custom size */}
      <${componentName} 
        width={32} 
        height={32}
        style={{ color: 'blue' }}
      />
    </div>
  )
}`

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Export React Component
            </h2>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-6">
          {/* Component Name Input */}
          <div className="space-y-2">
            <Label htmlFor="componentName">Component Name</Label>
            <Input
              id="componentName"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              placeholder="SvgIcon"
              className="font-mono"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="component" className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                Component
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Usage
              </TabsTrigger>
              <TabsTrigger value="simple" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Simple
              </TabsTrigger>
            </TabsList>

            <TabsContent value="component" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Advanced Component with Color Props</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(advancedComponent)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy
                      </Button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        onClick={() => {
                          logger.debug('Download button clicked', { componentLength: advancedComponent?.length }, 'JSX_EXPORT')
                          handleDownload(advancedComponent, `${componentName}.tsx`)
                        }}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{advancedComponent}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Usage Examples</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(usageExample)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{usageExample}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simple" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Simple Component</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(simpleJsx)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(simpleJsx, `${componentName}.tsx`)}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{simpleJsx}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Advanced Component</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• TypeScript interfaces</li>
                    <li>• Configurable color props</li>
                    <li>• Size and style props</li>
                    <li>• Best practices compliant</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Simple Component</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Minimal boilerplate</li>
                    <li>• Easy to customize</li>
                    <li>• Lightweight</li>
                    <li>• Quick integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </>
    )
} 