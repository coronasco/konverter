'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Download, Upload, FileText, Code, ArrowRight, ArrowLeft } from 'lucide-react'

export default function Base64Converter() {
  const [textInput, setTextInput] = useState('')
  const [base64Output, setBase64Output] = useState('')
  const [decodedText, setDecodedText] = useState('')
  const [base64Input, setBase64Input] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [copied, setCopied] = useState({ text: false, base64: false, decoded: false })
  const [error, setError] = useState('')

  const encodeText = () => {
    try {
      setError('')
      const input = fileContent || textInput
      if (!input) {
        setError('Nu există text sau fișier de codificat.')
        return
      }
      const encoded = btoa(input)
      setBase64Output(encoded)
    } catch {
      setError('Failed to encode text. Please check your input.')
    }
  }

  const decodeBase64 = () => {
    try {
      setError('')
      const decoded = atob(base64Input)
      setDecodedText(decoded)
    } catch {
      setError('Invalid Base64 string. Please check your input.')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        setFileContent(content)
        
        // Remove data URL prefix if present
        const base64Data = content.replace(/^data:[^;]+;base64,/, '')
        setBase64Output(base64Data)
        setError('')
      } catch {
        setError('Failed to process file.')
      }
    }
    
    reader.readAsDataURL(file)
  }

  const downloadBase64 = () => {
    if (!base64Output) return
    
    const link = document.createElement('a')
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(base64Output)}`
    link.download = 'base64-encoded.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadDecoded = () => {
    if (!decodedText) return
    
    const link = document.createElement('a')
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(decodedText)}`
    link.download = 'decoded-text.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = async (text: string, type: 'text' | 'base64' | 'decoded') => {
    if (!text) return
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied({ ...copied, [type]: true })
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard: ', err)
    }
  }

  const clearAll = () => {
    setTextInput('')
    setBase64Output('')
    setDecodedText('')
    setBase64Input('')
    setFileName('')
    setFileContent('')
    setError('')
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Base64 Encoder/Decoder
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Encode text to Base64 or decode Base64 strings back to text. Upload files to encode them or decode Base64 data. Free online tool with instant results.
        </p>
      </div>

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode" className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Encode to Base64
          </TabsTrigger>
          <TabsTrigger value="decode" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Decode from Base64
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text to Encode</Label>
                  <Textarea
                    id="text-input"
                    placeholder="Enter text to encode to Base64..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Or Upload a File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </span>
                    </label>
                    {fileName && (
                      <p className="text-sm text-green-600 mt-2">
                        File loaded: {fileName}
                      </p>
                    )}
                  </div>
                </div>

                <Button onClick={encodeText} className="w-full" disabled={!textInput.trim() && !fileContent}>
                  <Code className="h-4 w-4 mr-2" />
                  Encode to Base64
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Base64 Output
                  </span>
                  {base64Output && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(base64Output, 'base64')}
                        className="flex items-center gap-2"
                      >
                        {copied.base64 ? 'Copied!' : <Copy className="h-4 w-4" />}
                        {copied.base64 ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadBase64}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {base64Output ? (
                  <div className="space-y-4">
                    <Textarea
                      value={base64Output}
                      readOnly
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Length: {base64Output.length} characters
                    </p>
                  </div>
                ) : (
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Base64 output will appear here...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="decode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Base64 Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="base64-input">Base64 String to Decode</Label>
                  <Textarea
                    id="base64-input"
                    placeholder="Enter Base64 string to decode..."
                    value={base64Input}
                    onChange={(e) => setBase64Input(e.target.value)}
                    rows={8}
                    className="font-mono"
                  />
                </div>

                <Button onClick={decodeBase64} className="w-full" disabled={!base64Input.trim()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Decode from Base64
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Decoded Text
                  </span>
                  {decodedText && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(decodedText, 'decoded')}
                        className="flex items-center gap-2"
                      >
                        {copied.decoded ? 'Copied!' : <Copy className="h-4 w-4" />}
                        {copied.decoded ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadDecoded}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {decodedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={decodedText}
                      readOnly
                      rows={8}
                    />
                    <p className="text-xs text-muted-foreground">
                      Length: {decodedText.length} characters
                    </p>
                  </div>
                ) : (
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Decoded text will appear here...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button onClick={clearAll} variant="ghost">
          Clear All
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowRight className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold">Text Encoding</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Encode any text string to Base64 format for safe transmission and storage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Upload className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">File Upload</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload files to encode them to Base64. Supports images, documents, and any file type.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowLeft className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">Instant Decoding</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Decode Base64 strings back to their original text format with validation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Encoding Examples:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Embed images in HTML/CSS</li>
                <li>• Store binary data in JSON</li>
                <li>• Send files via API</li>
                <li>• Encode credentials</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Decoding Examples:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Extract embedded images</li>
                <li>• Decode API responses</li>
                <li>• Convert stored data</li>
                <li>• Debug encoded content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 