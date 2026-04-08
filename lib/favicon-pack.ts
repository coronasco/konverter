export interface FaviconAssetDefinition {
  fileName: string
  size: number
  purpose?: 'any' | 'maskable'
}

export const faviconAssetDefinitions: FaviconAssetDefinition[] = [
  { fileName: 'favicon-16x16.png', size: 16 },
  { fileName: 'favicon-32x32.png', size: 32 },
  { fileName: 'apple-touch-icon.png', size: 180 },
  { fileName: 'android-chrome-192x192.png', size: 192 },
  { fileName: 'android-chrome-512x512.png', size: 512 },
  { fileName: 'maskable-icon-192x192.png', size: 192, purpose: 'maskable' },
  { fileName: 'maskable-icon-512x512.png', size: 512, purpose: 'maskable' },
]

export interface FaviconManifestOptions {
  appName: string
  shortName: string
  description: string
  themeColor: string
  backgroundColor: string
}

export function buildManifestJson({
  appName,
  shortName,
  description,
  themeColor,
  backgroundColor,
}: FaviconManifestOptions) {
  return JSON.stringify(
    {
      name: appName,
      short_name: shortName,
      description,
      start_url: '/',
      display: 'standalone',
      background_color: backgroundColor,
      theme_color: themeColor,
      icons: faviconAssetDefinitions
        .filter((asset) => asset.size >= 192)
        .map((asset) => ({
          src: `/${asset.fileName}`,
          sizes: `${asset.size}x${asset.size}`,
          type: 'image/png',
          ...(asset.purpose ? { purpose: asset.purpose } : {}),
        })),
    },
    null,
    2
  )
}

export function buildHtmlSnippet(themeColor: string) {
  return [
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />',
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    `<meta name="theme-color" content="${themeColor}" />`,
  ].join('\n')
}

export function guessAppName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function buildIcoFromPngs(entries: Array<{ size: number; data: Uint8Array }>) {
  const headerSize = 6
  const directorySize = 16 * entries.length
  let offset = headerSize + directorySize

  const totalLength =
    headerSize +
    directorySize +
    entries.reduce((sum, entry) => sum + entry.data.length, 0)

  const output = new Uint8Array(totalLength)
  const view = new DataView(output.buffer)

  view.setUint16(0, 0, true)
  view.setUint16(2, 1, true)
  view.setUint16(4, entries.length, true)

  entries.forEach((entry, index) => {
    const directoryOffset = headerSize + index * 16
    const width = entry.size >= 256 ? 0 : entry.size
    const height = entry.size >= 256 ? 0 : entry.size

    view.setUint8(directoryOffset, width)
    view.setUint8(directoryOffset + 1, height)
    view.setUint8(directoryOffset + 2, 0)
    view.setUint8(directoryOffset + 3, 0)
    view.setUint16(directoryOffset + 4, 1, true)
    view.setUint16(directoryOffset + 6, 32, true)
    view.setUint32(directoryOffset + 8, entry.data.length, true)
    view.setUint32(directoryOffset + 12, offset, true)

    output.set(entry.data, offset)
    offset += entry.data.length
  })

  return output
}
