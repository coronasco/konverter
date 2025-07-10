'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Copy, Check, Download, Minus, ArrowRight } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [autoPrefixer, setAutoPrefixer] = useState(false)
  const [copied, setCopied] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [minifiedSize, setMinifiedSize] = useState(0)

  const minifyCss = () => {
    if (!input.trim()) {
      return
    }

    let css = input

    // Apply auto-prefixer if enabled
    if (autoPrefixer) {
      css = addVendorPrefixes(css)
    }

    // Minify CSS
    const minified = css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove whitespace around certain characters
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim()

    setOutput(minified)
    setOriginalSize(input.length)
    setMinifiedSize(minified.length)
  }

  const addVendorPrefixes = (css: string): string => {
    // Add vendor prefixes for common properties
    const prefixes = {
      'transform': ['-webkit-transform', '-moz-transform', '-ms-transform'],
      'transition': ['-webkit-transition', '-moz-transition', '-o-transition'],
      'animation': ['-webkit-animation', '-moz-animation', '-o-animation'],
      'border-radius': ['-webkit-border-radius', '-moz-border-radius'],
      'box-shadow': ['-webkit-box-shadow', '-moz-box-shadow'],
      'flex': ['-webkit-box', '-moz-box', '-ms-flexbox'],
      'flex-direction': ['-webkit-box-orient', '-webkit-box-direction'],
      'justify-content': ['-webkit-box-pack', '-moz-box-pack', '-ms-flex-pack'],
      'align-items': ['-webkit-box-align', '-moz-box-align', '-ms-flex-align'],
      'user-select': ['-webkit-user-select', '-moz-user-select', '-ms-user-select']
    }

    let result = css

    Object.entries(prefixes).forEach(([property, vendorPrefixes]) => {
      const regex = new RegExp(`(${property}\\s*:\\s*[^;]+;)`, 'gi')
      result = result.replace(regex, (match) => {
        const value = match.split(':')[1].trim().replace(';', '')
        const prefixedRules = vendorPrefixes.map(prefix => `${prefix}: ${value};`).join('\n  ')
        return `${prefixedRules}\n  ${match}`
      })
    })

    return result
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadFile = () => {
    if (!output) return

    const blob = new Blob([output], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'styles.min.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setCopied(false)
    setOriginalSize(0)
    setMinifiedSize(0)
  }

  const compressionRatio = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          CSS Minifier
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Minify your CSS code to reduce file size and improve loading performance. Includes auto-prefixer for better browser compatibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Minus className="h-5 w-5" />
              Input CSS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={`.example {
  color: #333;
  font-size: 16px;
  margin: 10px 0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-prefixer"
                checked={autoPrefixer}
                onCheckedChange={setAutoPrefixer}
              />
              <Label htmlFor="auto-prefixer">Auto-Prefixer (add vendor prefixes)</Label>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={minifyCss} className="flex items-center gap-2">
                <Minus className="h-4 w-4" />
                Minify
              </Button>
              <Button onClick={clearAll} variant="ghost" size="sm">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Minus className="h-5 w-5" />
                Minified CSS
              </span>
              {output && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadFile}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {output && (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="css"
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    minHeight: '300px'
                  }}
                >
                  {output}
                </SyntaxHighlighter>
              </div>
            )}
            
            {!output && (
              <div className="min-h-[300px] bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Minified CSS will appear here...</p>
              </div>
            )}

            {/* Statistics */}
            {output && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{originalSize}</div>
                  <div className="text-sm text-muted-foreground">Original (bytes)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{minifiedSize}</div>
                  <div className="text-sm text-muted-foreground">Minified (bytes)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{compressionRatio}%</div>
                  <div className="text-sm text-muted-foreground">Reduction</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {output && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Before & After Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-muted-foreground">Original CSS</h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language="css"
                    style={tomorrow}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.75rem',
                      maxHeight: '200px'
                    }}
                  >
                    {input}
                  </SyntaxHighlighter>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-muted-foreground">Minified CSS</h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language="css"
                    style={tomorrow}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.75rem',
                      maxHeight: '200px'
                    }}
                  >
                    {output}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Minus className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">Minification</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Remove comments, whitespace, and unnecessary characters to reduce file size.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowRight className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">Auto-Prefixer</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically add vendor prefixes for better cross-browser compatibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Download className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold">Download</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Download the minified CSS as a .min.css file ready for production use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 