'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Copy, Link2, ExternalLink, Loader2 } from 'lucide-react'

export default function UrlShortener() {
  const [inputUrl, setInputUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleShorten = async () => {
    setError('')
    setShortUrl('')
    setCopied(false)
    if (!inputUrl.trim()) {
      setError('Please enter a valid URL.')
      return
    }
    setLoading(true)
    try {
      // Use TinyURL's simple API
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(inputUrl)}`)
      if (response.ok) {
        const shortUrlResult = await response.text()
        setShortUrl(shortUrlResult)
      } else {
        setError('Failed to shorten URL. Please try again.')
      }
    } catch {
      setError('An error occurred while shortening the URL.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shortUrl) return
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Failed to copy URL.')
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
          URL Shortener
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Shorten any URL quickly with TinyURL. Copy, share, and track your shortened links easily. 100% free, no ads.
        </p>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Shorten a URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL Address</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/article"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleShorten} className="w-full" disabled={loading || !inputUrl.trim()}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Link2 className="h-4 w-4 mr-2" />}
            Shorten URL
          </Button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {shortUrl && (
            <div className="flex flex-col items-center gap-2 mt-4">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                {shortUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
              <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2">
                {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy URL'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 