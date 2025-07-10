'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Check, FileText, Minus, CheckCircle, ArrowRight } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [outputMode, setOutputMode] = useState<'json' | 'yaml'>('json')

  const validateJson = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString)
      return true
    } catch {
      return false
    }
  }

  const beautifyJson = () => {
    if (!input.trim()) {
      setError('Please enter some JSON')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const beautified = JSON.stringify(parsed, null, 2)
      setOutput(beautified)
      setError(null)
      setOutputMode('json')
    } catch {
      setError('Invalid JSON format')
    }
  }

  const minifyJson = () => {
    if (!input.trim()) {
      setError('Please enter some JSON')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError(null)
      setOutputMode('json')
    } catch {
      setError('Invalid JSON format')
    }
  }

  const validateJsonInput = () => {
    if (!input.trim()) {
      setError('Please enter some JSON')
      return
    }

    if (validateJson(input)) {
      setError(null)
      setOutput('✅ Valid JSON!')
      setOutputMode('json')
    } else {
      setError('❌ Invalid JSON format')
    }
  }

  const convertToYaml = () => {
    if (!input.trim()) {
      setError('Please enter some JSON')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const yaml = jsonToYaml(parsed)
      setOutput(yaml)
      setError(null)
      setOutputMode('yaml')
    } catch {
      setError('Invalid JSON format')
    }
  }

  const jsonToYaml = (obj: unknown, indent: number = 0): string => {
    const spaces = '  '.repeat(indent)
    let yaml = ''

    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          yaml += `${spaces}- ${jsonToYaml(item, indent + 1)}`
        } else {
          yaml += `${spaces}- ${item}\n`
        }
      })
    } else if (typeof obj === 'object' && obj !== null) {
      Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          yaml += `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`
        } else if (Array.isArray(value)) {
          yaml += `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`
        } else {
          yaml += `${spaces}${key}: ${value}\n`
        }
      })
    }

    return yaml
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

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
    setCopied(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          JSON Formatter
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Format, validate, and convert your JSON data with ease. Beautify, minify, validate, and convert to YAML.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Input JSON
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='{ "example": "value", "array": [1, 2, 3], "nested": { "key": "value" } }'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={beautifyJson} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Beautify
              </Button>
              <Button onClick={minifyJson} variant="outline" className="flex items-center gap-2">
                <Minus className="h-4 w-4" />
                Minify
              </Button>
              <Button onClick={validateJsonInput} variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Validate
              </Button>
              <Button onClick={convertToYaml} variant="outline" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Convert to YAML
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
                <FileText className="h-5 w-5" />
                Output
                {outputMode === 'yaml' && <span className="text-sm text-blue-600">(YAML)</span>}
              </span>
              {output && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {output && !error && (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language={outputMode === 'yaml' ? 'yaml' : 'json'}
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
            
            {!output && !error && (
              <div className="min-h-[300px] bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Output will appear here...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">Beautify</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Format your JSON with proper indentation and spacing for better readability.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Minus className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">Minify</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Remove all unnecessary whitespace to create compact JSON for production use.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowRight className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold">Convert</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Convert JSON to YAML format for configuration files and documentation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 