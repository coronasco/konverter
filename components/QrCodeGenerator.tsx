'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Download, QrCode, Palette, Upload, X } from 'lucide-react'
import QRCode from 'qrcode'

interface QrData {
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi'
  content: string
  email?: string
  subject?: string
  phone?: string
  ssid?: string
  password?: string
  encryption?: 'WPA' | 'WEP' | 'nopass'
}

interface LogoConfig {
  image: string | null
  shape: 'round' | 'square' | 'original'
  size: number
}

export default function QrCodeGenerator() {
  const [qrData, setQrData] = useState<QrData>({
    type: 'url',
    content: ''
  })
  const [qrImage, setQrImage] = useState<string>('')
  const [customization, setCustomization] = useState({
    foreground: '#000000',
    background: '#FFFFFF',
    size: 256,
    margin: 4
  })
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    image: null,
    shape: 'round',
    size: 20
  })
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

    const generateQRWithLogo = useCallback(async () => {
    let hasContent = false
    let qrContent = ''
    
    switch (qrData.type) {
      case 'url':
        hasContent = !!qrData.content.trim()
        qrContent = qrData.content
        break
      case 'text':
        hasContent = !!qrData.content.trim()
        qrContent = qrData.content
        break
      case 'email':
        hasContent = !!qrData.email?.trim()
        qrContent = `mailto:${qrData.email}${qrData.subject ? `?subject=${encodeURIComponent(qrData.subject)}` : ''}`
        break
      case 'phone':
        hasContent = !!qrData.phone?.trim()
        qrContent = `tel:${qrData.phone}`
        break
      case 'wifi':
        hasContent = !!qrData.ssid?.trim()
        qrContent = `WIFI:T:${qrData.encryption || 'WPA'};S:${qrData.ssid};P:${qrData.password || ''};;`
        break
    }

    if (!hasContent) return

    try {
      // Calculăm dimensiunea logo-ului
      const logoSize = logoConfig.image ? (customization.size * logoConfig.size) / 100 : 0
      
      // Generăm QR code-ul de bază cu nivelul de corectare erori potrivit
      const qrImageData = await QRCode.toDataURL(qrContent, {
        width: customization.size,
        margin: customization.margin,
        color: {
          dark: customization.foreground,
          light: customization.background
        },
        errorCorrectionLevel: logoConfig.image ? 'H' : 'M' // Nivel mai înalt de corectare erori când avem logo
      })

      // Dacă nu avem logo, folosim QR code-ul de bază
      if (!logoConfig.image) {
        setQrImage(qrImageData)
        return
      }

      // Creăm canvas pentru a combina QR code-ul cu logo-ul
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = customization.size
      canvas.height = customization.size

      // Desenăm QR code-ul
      const qrImg = new Image()
      qrImg.onload = () => {
        ctx.drawImage(qrImg, 0, 0, customization.size, customization.size)

        // Adăugăm logo-ul în centru
        const logoImg = new Image()
        logoImg.onload = () => {
          const logoX = (customization.size - logoSize) / 2
          const logoY = (customization.size - logoSize) / 2

          // Creăm path pentru forma logo-ului
          ctx.save()
          ctx.beginPath()

          if (logoConfig.shape === 'round') {
            ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, 2 * Math.PI)
          } else if (logoConfig.shape === 'square') {
            ctx.rect(logoX, logoY, logoSize, logoSize)
          } else {
            // original - nu facem clipping
          }

          if (logoConfig.shape !== 'original') {
            ctx.clip()
          }

          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
          ctx.restore()

          setQrImage(canvas.toDataURL('image/png'))
        }
        logoImg.src = logoConfig.image!
      }
      qrImg.src = qrImageData

    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }, [qrData, customization, logoConfig])

  useEffect(() => {
    generateQRWithLogo()
  }, [generateQRWithLogo])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoConfig(prev => ({
          ...prev,
          image: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoSizeChange = (size: number) => {
    // Permite orice valoare între 15-35%, limitează doar valorile din afara intervalului
    let finalSize = size
    if (size < 15) {
      finalSize = 15
    } else if (size > 35) {
      finalSize = 35
    } else {
      // Dacă este în intervalul valid, păstrează valoarea exactă
      finalSize = size
    }
    setLogoConfig(prev => ({
      ...prev,
      size: finalSize
    }))
  }

  const handleLogoShapeChange = (shape: 'round' | 'square' | 'original') => {
    setLogoConfig(prev => ({
      ...prev,
      shape: shape
    }))
  }

  const removeLogo = () => {
    setLogoConfig(prev => ({
      ...prev,
      image: null
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const copyToClipboard = async () => {
    if (!qrImage) return
    
    try {
      await navigator.clipboard.writeText(qrImage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy QR code: ', err)
    }
  }

  const downloadQR = () => {
    if (!qrImage) return

    const link = document.createElement('a')
    link.href = qrImage
    link.download = `qr-code-${qrData.type}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAll = () => {
    setQrData({
      type: 'url',
      content: ''
    })
    setQrImage('')
    setCustomization({
      foreground: '#000000',
      background: '#FFFFFF',
      size: 256,
      margin: 4
    })
    setLogoConfig({
      image: null,
      shape: 'round',
      size: 20
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          QR Code Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Create custom QR codes for URLs, text, email, phone numbers, and WiFi networks. Add your logo in the center and download as PNG or copy to clipboard instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-type">QR Code Type</Label>
              <Select value={qrData.type} onValueChange={(value: 'url' | 'text' | 'email' | 'phone' | 'wifi') => setQrData({ ...qrData, type: value, content: '' })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Number</SelectItem>
                  <SelectItem value="wifi">WiFi Network</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {qrData.type === 'url' && (
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={qrData.content}
                  onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
                />
              </div>
            )}

            {qrData.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="text">Text Content</Label>
                <Textarea
                  id="text"
                  placeholder="Enter any text you want to encode..."
                  value={qrData.content}
                  onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
                  rows={4}
                />
              </div>
            )}

            {qrData.type === 'email' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={qrData.email || ''}
                    onChange={(e) => setQrData({ ...qrData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject (Optional)</Label>
                  <Input
                    id="subject"
                    placeholder="Email subject"
                    value={qrData.subject || ''}
                    onChange={(e) => setQrData({ ...qrData, subject: e.target.value })}
                  />
                </div>
              </div>
            )}

            {qrData.type === 'phone' && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={qrData.phone || ''}
                  onChange={(e) => setQrData({ ...qrData, phone: e.target.value })}
                />
              </div>
            )}

            {qrData.type === 'wifi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ssid">Network Name (SSID)</Label>
                  <Input
                    id="ssid"
                    placeholder="My WiFi Network"
                    value={qrData.ssid || ''}
                    onChange={(e) => setQrData({ ...qrData, ssid: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="WiFi password"
                    value={qrData.password || ''}
                    onChange={(e) => setQrData({ ...qrData, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption Type</Label>
                  <Select value={qrData.encryption || 'WPA'} onValueChange={(value: 'WPA' | 'WEP' | 'nopass') => setQrData({ ...qrData, encryption: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
                      <SelectItem value="WEP">WEP</SelectItem>
                      <SelectItem value="nopass">No Password</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Logo Upload Section */}
            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">Logo Settings</Label>
              
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Choose File
                  </Button>
                  {logoConfig.image && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeLogo}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {logoConfig.image && (
                  <div className="mt-2">
                    <img
                      src={logoConfig.image}
                      alt="Logo preview"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              {logoConfig.image && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="logo-shape">Logo Shape</Label>
                    <Select value={logoConfig.shape} onValueChange={handleLogoShapeChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round">Round</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="original">Original</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo-size">Logo Size (%)</Label>
                    <Input
                      id="logo-size"
                      type="number"
                      value={logoConfig.size}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0
                        setLogoConfig(prev => ({ ...prev, size: value }))
                      }}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value) || 0
                        handleLogoSizeChange(value)
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Range: 15-35% | Recommended: 20-25% for better QR code detection
                    </p>
                  </div>
                </>
              )}
            </div>

            <Button onClick={clearAll} variant="ghost" size="sm" className="w-full">
              Clear All
            </Button>
          </CardContent>
        </Card>

        {/* QR Code Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Preview
              </span>
              {qrImage && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2"
                  >
                    {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadQR}
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
            {qrImage ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <img
                    src={qrImage}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan this QR code with your phone&apos;s camera or QR code app
                </p>
              </div>
            ) : (
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">QR code will appear here...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customization Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Customization Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foreground">QR Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="foreground"
                  type="color"
                  value={customization.foreground}
                  onChange={(e) => setCustomization({ ...customization, foreground: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={customization.foreground}
                  onChange={(e) => setCustomization({ ...customization, foreground: e.target.value })}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="background"
                  type="color"
                  value={customization.background}
                  onChange={(e) => setCustomization({ ...customization, background: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={customization.background}
                  onChange={(e) => setCustomization({ ...customization, background: e.target.value })}
                  placeholder="#FFFFFF"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (px)</Label>
              <Input
                id="size"
                type="number"
                min="128"
                max="512"
                value={customization.size}
                onChange={(e) => setCustomization({ ...customization, size: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <QrCode className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">Multiple Types</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate QR codes for URLs, text, email, phone numbers, and WiFi networks with one click.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Palette className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold">Customizable</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Customize colors, size, margins, and add your logo with different shapes (round, square, original).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Download className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">Instant Download</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Download your QR codes as high-quality PNG files or copy them to clipboard instantly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 