'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import NextImage from 'next/image'
import JSZip from 'jszip'
import { useDropzone } from 'react-dropzone'
import {
  AppWindowMac,
  Copy,
  Download,
  FileArchive,
  FolderOutput,
  ImageUp,
  Loader2,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { showToast } from '@/components/Toast'
import {
  buildHtmlSnippet,
  buildIcoFromPngs,
  buildManifestJson,
  faviconAssetDefinitions,
  guessAppName,
} from '@/lib/favicon-pack'

interface GeneratedAsset {
  fileName: string
  size: number
  purpose?: 'any' | 'maskable'
  dataUrl: string
  blob: Blob
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load the source image.'))
    image.src = source
  })
}

async function renderIcon(
  source: string,
  size: number,
  options: { backgroundColor: string; transparent: boolean; paddingPercent: number }
) {
  const image = await loadImage(source)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas is not available in this browser.')
  }

  canvas.width = size
  canvas.height = size

  if (!options.transparent) {
    context.fillStyle = options.backgroundColor
    context.fillRect(0, 0, size, size)
  }

  const paddingRatio = Math.min(Math.max(options.paddingPercent, 0), 40) / 100
  const targetSize = size * (1 - paddingRatio * 2)
  const imageRatio = image.width / image.height

  let drawWidth = targetSize
  let drawHeight = targetSize

  if (imageRatio > 1) {
    drawHeight = targetSize / imageRatio
  } else {
    drawWidth = targetSize * imageRatio
  }

  const offsetX = (size - drawWidth) / 2
  const offsetY = (size - drawHeight) / 2

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (file) => {
        if (file) {
          resolve(file)
          return
        }
        reject(new Error('Failed to generate icon output.'))
      },
      'image/png',
      1
    )
  })

  return {
    dataUrl: canvas.toDataURL('image/png'),
    blob,
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function FaviconPwaGenerator() {
  const [sourceName, setSourceName] = useState('')
  const [sourceDataUrl, setSourceDataUrl] = useState('')
  const [appName, setAppName] = useState('Konverter App')
  const [shortName, setShortName] = useState('Konverter')
  const [description, setDescription] = useState('A browser-based frontend toolset.')
  const [themeColor, setThemeColor] = useState('#1d7c74')
  const [backgroundColor, setBackgroundColor] = useState('#f7f3ec')
  const [transparentBackground, setTransparentBackground] = useState(false)
  const [paddingPercent, setPaddingPercent] = useState(12)
  const [maskablePaddingPercent, setMaskablePaddingPercent] = useState(20)
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const manifestJson = useMemo(
    () =>
      buildManifestJson({
        appName,
        shortName,
        description,
        themeColor,
        backgroundColor: transparentBackground ? '#ffffff' : backgroundColor,
      }),
    [appName, shortName, description, themeColor, backgroundColor, transparentBackground]
  )

  const htmlSnippet = useMemo(() => buildHtmlSnippet(themeColor), [themeColor])

  const generateAllAssets = useCallback(async (source: string) => {
    setIsGenerating(true)
    try {
      const nextAssets = await Promise.all(
        faviconAssetDefinitions.map(async (asset) => {
          const padding = asset.purpose === 'maskable' ? maskablePaddingPercent : paddingPercent
          const rendered = await renderIcon(source, asset.size, {
            backgroundColor,
            transparent: transparentBackground,
            paddingPercent: padding,
          })

          return {
            fileName: asset.fileName,
            size: asset.size,
            purpose: asset.purpose,
            dataUrl: rendered.dataUrl,
            blob: rendered.blob,
          } satisfies GeneratedAsset
        })
      )

      setGeneratedAssets(nextAssets)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate favicon assets.'
      showToast.error(message)
      setGeneratedAssets([])
    } finally {
      setIsGenerating(false)
    }
  }, [backgroundColor, maskablePaddingPercent, paddingPercent, transparentBackground])

  useEffect(() => {
    if (!sourceDataUrl) return
    void generateAllAssets(sourceDataUrl)
  }, [sourceDataUrl, generateAllAssets])

  const handleFile = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result !== 'string') {
        showToast.error('Failed to read the uploaded file.')
        return
      }

      setSourceName(file.name)
      setSourceDataUrl(result)
      const guessedName = guessAppName(file.name)
      setAppName(guessedName)
      setShortName(guessedName.slice(0, 12))
      setDescription(`${guessedName} web app icons and favicon assets.`)
    }
    reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    onDrop: (files) => {
      const file = files[0]
      if (file) {
        void handleFile(file)
      }
    },
  })

  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value)
    showToast.success(`${label} copied to clipboard.`)
  }

  const handleDownloadZip = async () => {
    if (!sourceDataUrl || generatedAssets.length === 0) {
      showToast.error('Upload a source logo first.')
      return
    }

    setIsExporting(true)

    try {
      const zip = new JSZip()

      generatedAssets.forEach((asset) => {
        zip.file(asset.fileName, asset.blob)
      })

      const icoSources = await Promise.all(
        [16, 32, 48].map(async (size) => {
          const rendered = await renderIcon(sourceDataUrl, size, {
            backgroundColor,
            transparent: transparentBackground,
            paddingPercent,
          })

          return {
            size,
            data: new Uint8Array(await rendered.blob.arrayBuffer()),
          }
        })
      )

      zip.file('favicon.ico', buildIcoFromPngs(icoSources))
      zip.file('site.webmanifest', manifestJson)
      zip.file('html-tags.txt', `${htmlSnippet}\n`)

      const archive = await zip.generateAsync({ type: 'blob' })
      const archiveName = `${shortName.toLowerCase().replace(/\s+/g, '-') || 'favicon'}-asset-pack.zip`
      downloadBlob(archive, archiveName)
      showToast.success('Favicon pack exported.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create the ZIP package.'
      showToast.error(message)
    } finally {
      setIsExporting(false)
    }
  }

  const previewAssets = useMemo(() => {
    return {
      favicon32: generatedAssets.find((asset) => asset.fileName === 'favicon-32x32.png'),
      appleTouch: generatedAssets.find((asset) => asset.fileName === 'apple-touch-icon.png'),
      maskable192: generatedAssets.find((asset) => asset.fileName === 'maskable-icon-192x192.png'),
    }
  }, [generatedAssets])

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageUp className="h-5 w-5" />
              Source logo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div
              {...getRootProps()}
              className={`rounded-[24px] border-2 border-dashed p-8 text-center transition ${
                isDragActive
                  ? 'border-[var(--brand-accent)] bg-[var(--surface-secondary)]'
                  : 'border-border/80 bg-white/70'
              }`}
            >
              <input {...getInputProps()} />
              <FolderOutput className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-foreground">
                Drop an SVG or PNG here
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                SVG is ideal. PNG, JPG, and WebP also work.
              </p>
            </div>

            {sourceName ? (
              <div className="rounded-[22px] border border-border/70 bg-white/75 px-4 py-3 text-sm text-muted-foreground">
                Loaded source: <span className="font-medium text-foreground">{sourceName}</span>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="app-name">App name</Label>
                <Input id="app-name" value={appName} onChange={(event) => setAppName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short-name">Short name</Label>
                <Input
                  id="short-name"
                  value={shortName}
                  maxLength={12}
                  onChange={(event) => setShortName(event.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Manifest description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="min-h-[110px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AppWindowMac className="h-5 w-5" />
              Output settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="theme-color">Theme color</Label>
                <div className="flex gap-2">
                  <Input
                    id="theme-color"
                    type="color"
                    value={themeColor}
                    onChange={(event) => setThemeColor(event.target.value)}
                    className="h-11 w-14 p-1"
                  />
                  <Input value={themeColor} onChange={(event) => setThemeColor(event.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="background-color">Background color</Label>
                <div className="flex gap-2">
                  <Input
                    id="background-color"
                    type="color"
                    value={backgroundColor}
                    disabled={transparentBackground}
                    onChange={(event) => setBackgroundColor(event.target.value)}
                    className="h-11 w-14 p-1"
                  />
                  <Input
                    value={backgroundColor}
                    disabled={transparentBackground}
                    onChange={(event) => setBackgroundColor(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3">
              <div>
                <p className="font-medium text-foreground">Transparent background</p>
                <p className="text-sm text-muted-foreground">Useful when the source logo already has its own shape.</p>
              </div>
              <Switch checked={transparentBackground} onCheckedChange={setTransparentBackground} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="padding">Standard padding (%)</Label>
                <Input
                  id="padding"
                  type="number"
                  min="0"
                  max="40"
                  value={paddingPercent}
                  onChange={(event) => setPaddingPercent(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maskable-padding">Maskable safe area (%)</Label>
                <Input
                  id="maskable-padding"
                  type="number"
                  min="10"
                  max="40"
                  value={maskablePaddingPercent}
                  onChange={(event) => setMaskablePaddingPercent(Number(event.target.value))}
                />
              </div>
            </div>

            <Button onClick={handleDownloadZip} className="w-full" disabled={isGenerating || isExporting || !sourceDataUrl}>
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileArchive className="h-4 w-4" />}
              Download ZIP package
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGenerating ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-[24px] border border-border/70 bg-white/70">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : sourceDataUrl ? (
              <div className="space-y-4">
                <div className="rounded-[24px] border border-border/70 bg-[#f8f4ec] p-5">
                  <p className="mb-3 text-sm font-medium text-foreground">Browser tab</p>
                  <div className="flex items-center gap-3 rounded-full border border-border/70 bg-white px-4 py-3">
              {previewAssets.favicon32 ? (
                      <NextImage src={previewAssets.favicon32.dataUrl} alt="" width={20} height={20} className="h-5 w-5 rounded" />
                    ) : null}
                    <span className="text-sm text-foreground">{shortName}</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                    <p className="mb-3 text-sm font-medium text-foreground">Apple touch icon</p>
                    <div className="flex min-h-[140px] items-center justify-center rounded-[24px] bg-[var(--surface-secondary)]">
                      {previewAssets.appleTouch ? (
                        <NextImage
                          src={previewAssets.appleTouch.dataUrl}
                          alt=""
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-[22px] shadow-md"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                    <p className="mb-3 text-sm font-medium text-foreground">Maskable icon safe area</p>
                    <div className="flex min-h-[140px] items-center justify-center rounded-[24px] bg-[#111827]">
                      {previewAssets.maskable192 ? (
                        <NextImage
                          src={previewAssets.maskable192.dataUrl}
                          alt=""
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-[22px]"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-[24px] border border-border/70 bg-white/70 text-sm text-muted-foreground">
                Upload a source logo to see previews.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated outputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-[24px] border border-border/70 bg-white/70">
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>File</span>
                <span>Size</span>
                <span>Type</span>
              </div>
              <div className="divide-y divide-border/70">
                {generatedAssets.map((asset) => (
                  <div key={asset.fileName} className="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-3 text-sm">
                    <span className="text-foreground">{asset.fileName}</span>
                    <span className="text-muted-foreground">{asset.size}x{asset.size}</span>
                    <span className="text-muted-foreground">{asset.purpose ?? 'any'}</span>
                  </div>
                ))}
                {generatedAssets.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-muted-foreground">No output yet.</div>
                ) : null}
              </div>
            </div>

            <Tabs defaultValue="snippet" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="snippet">HTML snippet</TabsTrigger>
                <TabsTrigger value="manifest">Manifest</TabsTrigger>
              </TabsList>
              <TabsContent value="snippet" className="space-y-3">
                <Textarea readOnly value={htmlSnippet} className="min-h-[180px] font-mono text-sm" />
                <Button variant="outline" onClick={() => void handleCopy(htmlSnippet, 'HTML snippet')}>
                  <Copy className="h-4 w-4" />
                  Copy snippet
                </Button>
              </TabsContent>
              <TabsContent value="manifest" className="space-y-3">
                <Textarea readOnly value={manifestJson} className="min-h-[180px] font-mono text-sm" />
                <Button variant="outline" onClick={() => void handleCopy(manifestJson, 'Manifest')}>
                  <Copy className="h-4 w-4" />
                  Copy manifest
                </Button>
              </TabsContent>
            </Tabs>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={() => downloadBlob(new Blob([manifestJson], { type: 'application/json' }), 'site.webmanifest')}
                disabled={!generatedAssets.length}
              >
                <Download className="h-4 w-4" />
                Download manifest
              </Button>
              <Button
                variant="outline"
                onClick={() => downloadBlob(new Blob([htmlSnippet], { type: 'text/plain' }), 'html-tags.txt')}
                disabled={!generatedAssets.length}
              >
                <Smartphone className="h-4 w-4" />
                Download snippet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
