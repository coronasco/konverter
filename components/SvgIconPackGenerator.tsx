'use client'

import { useMemo, useState } from 'react'
import JSZip from 'jszip'
import { useDropzone } from 'react-dropzone'
import {
  Check,
  Code2,
  Copy,
  Download,
  FileArchive,
  FolderUp,
  Layers3,
  Package2,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { showToast } from '@/components/Toast'
import {
  generateReactComponent,
  generateReactIndex,
  generateSprite,
  generateVueComponent,
  generateVueIndex,
  parseIconFiles,
} from '@/lib/svg-icon-pack'

interface UploadedIcon {
  name: string
  content: string
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

export default function SvgIconPackGenerator() {
  const [uploadedIcons, setUploadedIcons] = useState<UploadedIcon[]>([])
  const [selectedIconId, setSelectedIconId] = useState('')
  const [useCurrentColor, setUseCurrentColor] = useState(true)
  const [includeReact, setIncludeReact] = useState(true)
  const [includeVue, setIncludeVue] = useState(true)
  const [includeSprite, setIncludeSprite] = useState(true)
  const [includeIndexFiles, setIncludeIndexFiles] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  const parsedIcons = useMemo(
    () => parseIconFiles(uploadedIcons, useCurrentColor),
    [uploadedIcons, useCurrentColor]
  )

  const selectedIcon = useMemo(
    () => parsedIcons.find((icon) => icon.id === selectedIconId) ?? parsedIcons[0],
    [parsedIcons, selectedIconId]
  )

  const reactPreview = selectedIcon ? generateReactComponent(selectedIcon) : ''
  const vuePreview = selectedIcon ? generateVueComponent(selectedIcon) : ''
  const spritePreview = parsedIcons.length > 0 ? generateSprite(parsedIcons) : ''

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      'image/svg+xml': ['.svg'],
    },
    onDrop: async (files) => {
      const nextFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          content: await file.text(),
        }))
      )

      setUploadedIcons(nextFiles)
      setSelectedIconId('')
    },
  })

  const handleCopy = async (value: string, label: string) => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    showToast.success(`${label} copied to clipboard.`)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const handleZipExport = async () => {
    if (parsedIcons.length === 0) {
      showToast.error('Upload one or more SVG files first.')
      return
    }

    if (!includeReact && !includeVue && !includeSprite) {
      showToast.error('Choose at least one output format.')
      return
    }

    setIsExporting(true)

    try {
      const zip = new JSZip()

      if (includeReact) {
        const reactFolder = zip.folder('react')
        parsedIcons.forEach((icon) => {
          reactFolder?.file(`${icon.componentName}.tsx`, generateReactComponent(icon))
        })
        if (includeIndexFiles) {
          reactFolder?.file('index.ts', generateReactIndex(parsedIcons))
        }
      }

      if (includeVue) {
        const vueFolder = zip.folder('vue')
        parsedIcons.forEach((icon) => {
          vueFolder?.file(`${icon.componentName}.vue`, generateVueComponent(icon))
        })
        if (includeIndexFiles) {
          vueFolder?.file('index.ts', generateVueIndex(parsedIcons))
        }
      }

      if (includeSprite) {
        zip.file('sprite.svg', generateSprite(parsedIcons))
      }

      zip.file(
        'manifest.json',
        JSON.stringify(
          parsedIcons.map((icon) => ({
            fileName: icon.fileName,
            componentName: icon.componentName,
            viewBox: icon.viewBox,
          })),
          null,
          2
        )
      )

      const blob = await zip.generateAsync({ type: 'blob' })
      downloadBlob(blob, 'svg-icon-pack.zip')
      showToast.success('Icon pack exported.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export the icon pack.'
      showToast.error(message)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderUp className="h-5 w-5" />
              Upload SVG icons
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
              <Package2 className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-foreground">Drop multiple SVG files here</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Upload an icon set and export React components, Vue components, a sprite, or a combined ZIP package.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3">
                <div>
                  <p className="font-medium text-foreground">Convert fills and strokes to currentColor</p>
                  <p className="text-sm text-muted-foreground">Helpful for icon systems that inherit text color by default.</p>
                </div>
                <Switch checked={useCurrentColor} onCheckedChange={setUseCurrentColor} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground">
                  React components
                  <Switch checked={includeReact} onCheckedChange={setIncludeReact} />
                </label>
                <label className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground">
                  Vue components
                  <Switch checked={includeVue} onCheckedChange={setIncludeVue} />
                </label>
                <label className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground">
                  SVG sprite
                  <Switch checked={includeSprite} onCheckedChange={setIncludeSprite} />
                </label>
                <label className="flex items-center justify-between rounded-[22px] border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground">
                  Index exports
                  <Switch checked={includeIndexFiles} onCheckedChange={setIncludeIndexFiles} />
                </label>
              </div>
            </div>

            <Button onClick={handleZipExport} className="w-full" disabled={isExporting || parsedIcons.length === 0}>
              {isExporting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <FileArchive className="h-4 w-4" />}
              Download icon pack ZIP
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[24px] border border-border/70 bg-white/70">
              <div className="grid grid-cols-[1.1fr_1fr_auto] gap-3 border-b border-border/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>Original file</span>
                <span>Component name</span>
                <span>ViewBox</span>
              </div>
              <div className="divide-y divide-border/70">
                {parsedIcons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setSelectedIconId(icon.id)}
                    className={`grid w-full grid-cols-[1.1fr_1fr_auto] gap-3 px-4 py-3 text-left text-sm ${
                      selectedIcon?.id === icon.id ? 'bg-[var(--surface-secondary)]' : 'bg-transparent'
                    }`}
                  >
                    <span className="text-foreground">{icon.fileName}.svg</span>
                    <span className="text-muted-foreground">{icon.componentName}</span>
                    <span className="text-muted-foreground">{icon.viewBox}</span>
                  </button>
                ))}
                {parsedIcons.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-muted-foreground">No icons uploaded yet.</div>
                ) : null}
              </div>
            </div>

            {selectedIcon ? (
              <div className="grid gap-4 md:grid-cols-[160px_minmax(0,1fr)]">
                <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                  <p className="mb-3 text-sm font-medium text-foreground">Preview</p>
                  <div
                    className="flex min-h-[110px] items-center justify-center rounded-[18px] border border-dashed border-border/80 bg-[var(--surface-secondary)] p-4"
                    dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                  />
                </div>
                <div className="rounded-[24px] border border-border/70 bg-white/75 p-5">
                  <p className="text-sm font-medium text-foreground">Normalization</p>
                  <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    <p>File name: <span className="font-medium text-foreground">{selectedIcon.fileName}.svg</span></p>
                    <p>Component: <span className="font-medium text-foreground">{selectedIcon.componentName}</span></p>
                    <p>ViewBox: <span className="font-medium text-foreground">{selectedIcon.viewBox}</span></p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Layers3 className="h-5 w-5" />
              Output preview
            </CardTitle>
            <Button
              variant="outline"
              onClick={() =>
                void handleCopy(
                  reactPreview || vuePreview || spritePreview,
                  selectedIcon ? `${selectedIcon.componentName} output` : 'Output'
                )
              }
              disabled={!parsedIcons.length}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy output'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="react" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="react" disabled={!includeReact}>
                React
              </TabsTrigger>
              <TabsTrigger value="vue" disabled={!includeVue}>
                Vue
              </TabsTrigger>
              <TabsTrigger value="sprite" disabled={!includeSprite}>
                Sprite
              </TabsTrigger>
            </TabsList>
            <TabsContent value="react">
              <div className="space-y-3">
                <Label>React component preview</Label>
                <Textarea readOnly value={reactPreview} className="min-h-[360px] font-mono text-sm" />
              </div>
            </TabsContent>
            <TabsContent value="vue">
              <div className="space-y-3">
                <Label>Vue component preview</Label>
                <Textarea readOnly value={vuePreview} className="min-h-[360px] font-mono text-sm" />
              </div>
            </TabsContent>
            <TabsContent value="sprite">
              <div className="space-y-3">
                <Label>Sprite preview</Label>
                <Textarea readOnly value={spritePreview} className="min-h-[360px] font-mono text-sm" />
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid gap-3 md:grid-cols-3">
            <Button
              variant="outline"
              disabled={!reactPreview}
              onClick={() => downloadBlob(new Blob([reactPreview], { type: 'text/plain' }), `${selectedIcon?.componentName ?? 'Icon'}.tsx`)}
            >
              <Code2 className="h-4 w-4" />
              Download React file
            </Button>
            <Button
              variant="outline"
              disabled={!vuePreview}
              onClick={() => downloadBlob(new Blob([vuePreview], { type: 'text/plain' }), `${selectedIcon?.componentName ?? 'Icon'}.vue`)}
            >
              <Download className="h-4 w-4" />
              Download Vue file
            </Button>
            <Button
              variant="outline"
              disabled={!spritePreview}
              onClick={() => downloadBlob(new Blob([spritePreview], { type: 'image/svg+xml' }), 'sprite.svg')}
            >
              <Layers3 className="h-4 w-4" />
              Download sprite
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
