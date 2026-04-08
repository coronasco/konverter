export type ToolCategory = 'svg' | 'frontend'

export interface ToolDefinition {
  id: string
  href: string
  name: string
  shortName: string
  category: ToolCategory
  summary: string
  description: string
  status?: 'live' | 'coming-soon'
  featured?: boolean
  new?: boolean
}

export const toolCatalog: ToolDefinition[] = [
  {
    id: 'svg-converter',
    href: '/',
    name: 'SVG Converter',
    shortName: 'SVG Converter',
    category: 'svg',
    summary: 'Convert SVG into CSS, Base64, JSX, exports, and responsive assets in the browser.',
    description: 'Paste or upload SVG, optimize it, tweak colors, export code, and download ready-to-use assets.',
    featured: true,
  },
  {
    id: 'favicon-generator',
    href: '/favicon-generator',
    name: 'Favicon + PWA Asset Pack Generator',
    shortName: 'Favicon Generator',
    category: 'svg',
    summary: 'Generate favicons, app icons, a manifest, and HTML tags from one logo upload.',
    description: 'Build a complete browser and PWA icon set from SVG or PNG, with previews and a packaged export.',
    featured: true,
    new: true,
  },
  {
    id: 'svg-icon-pack-generator',
    href: '/svg-icon-pack-generator',
    name: 'SVG Icon Pack Generator',
    shortName: 'Icon Pack Generator',
    category: 'svg',
    summary: 'Turn a folder of SVGs into React components, Vue components, or a sprite sheet.',
    description: 'Normalize names, preserve viewBox data, batch export code, and ship icon packs faster.',
    featured: true,
    new: true,
  },
  {
    id: 'json-formatter',
    href: '/json-formatter',
    name: 'JSON Formatter',
    shortName: 'JSON Formatter',
    category: 'frontend',
    summary: 'Beautify, minify, validate, and convert JSON without leaving the browser.',
    description: 'Clean up payloads, inspect structures, and prepare JSON for docs, debugging, or production.',
    featured: true,
  },
  {
    id: 'css-minifier',
    href: '/css-minifier',
    name: 'CSS Minifier',
    shortName: 'CSS Minifier',
    category: 'frontend',
    summary: 'Compress stylesheets, trim whitespace, and export lighter CSS.',
    description: 'Minify CSS quickly, estimate savings, and copy or download production-ready output.',
  },
  {
    id: 'design-token-generator',
    href: '/design-token-generator',
    name: 'Design Token Generator',
    shortName: 'Design Token Generator',
    category: 'frontend',
    summary: 'Generate CSS variables, JSON tokens, and Tailwind-ready values from a simple style system.',
    description: 'Build practical token files for color, spacing, radius, shadows, and typography.',
    featured: true,
    new: true,
  },
  {
    id: 'color-generator',
    href: '/color-generator',
    name: 'Color Generator',
    shortName: 'Color Generator',
    category: 'frontend',
    summary: 'Extract practical palettes from images and copy them as CSS variables.',
    description: 'Pull dominant colors from screenshots, mockups, or artwork and drop them into frontend work.',
  },
  {
    id: 'base64-converter',
    href: '/base64-converter',
    name: 'Base64 Converter',
    shortName: 'Base64 Converter',
    category: 'frontend',
    summary: 'Encode and decode text or files to Base64 with quick copy and download actions.',
    description: 'Useful for data URIs, payload inspection, debugging, and small asset workflows.',
  },
  {
    id: 'password-generator',
    href: '/password-generator',
    name: 'Password Generator',
    shortName: 'Password Generator',
    category: 'frontend',
    summary: 'Generate stronger passwords with entropy and crack-time feedback.',
    description: 'Create practical passwords for development and operations work with live strength analysis.',
  },
  {
    id: 'qr-generator',
    href: '/qr-generator',
    name: 'QR Code Generator',
    shortName: 'QR Code Generator',
    category: 'frontend',
    summary: 'Create branded QR codes for URLs, WiFi, email, phone numbers, and more.',
    description: 'Customize colors, add a logo, and export QR codes without using a hosted dashboard.',
  },
  {
    id: 'url-shortener',
    href: '/url-shortener',
    name: 'URL Shortener',
    shortName: 'URL Shortener',
    category: 'frontend',
    summary: 'Shorten URLs, copy them fast, and send them straight into QR generation.',
    description: 'Useful when you need cleaner links for sharing, docs, or printed materials.',
  },
  {
    id: 'time-tracker',
    href: '/time-tracker',
    name: 'Time Tracker',
    shortName: 'Time Tracker',
    category: 'frontend',
    summary: 'Track sessions, rates, and totals locally in the browser.',
    description: 'A lightweight tracker for freelancers and solo work, stored in local browser storage.',
  },
]

export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/svg-tools', label: 'SVG Tools' },
  { href: '/frontend-tools', label: 'Frontend Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/support', label: 'Support' },
]

export function getToolByHref(href: string) {
  return toolCatalog.find((tool) => tool.href === href)
}

export function getToolById(id: string) {
  return toolCatalog.find((tool) => tool.id === id)
}

export function getToolsByCategory(category: ToolCategory) {
  return toolCatalog.filter((tool) => tool.category === category && tool.status !== 'coming-soon')
}

export function getFeaturedTools(limit?: number) {
  const featuredTools = toolCatalog.filter((tool) => tool.featured && tool.status !== 'coming-soon')
  return typeof limit === 'number' ? featuredTools.slice(0, limit) : featuredTools
}

export function getRelatedTools(currentHref: string, maxTools = 4) {
  const currentTool = getToolByHref(currentHref)
  if (!currentTool) {
    return toolCatalog
      .filter((tool) => tool.href !== currentHref && tool.status !== 'coming-soon')
      .slice(0, maxTools)
  }

  const sameCategory = toolCatalog.filter(
    (tool) =>
      tool.href !== currentHref &&
      tool.category === currentTool.category &&
      tool.status !== 'coming-soon'
  )
  const otherTools = toolCatalog.filter(
    (tool) =>
      tool.href !== currentHref &&
      tool.category !== currentTool.category &&
      tool.status !== 'coming-soon'
  )

  return [...sameCategory, ...otherTools].slice(0, maxTools)
}

export function getRouteLabel(pathname: string) {
  const tool = getToolByHref(pathname)
  if (tool) {
    return tool.shortName
  }

  const staticLabels: Record<string, string> = {
    '/blog': 'Blog',
    '/privacy': 'Privacy Policy',
    '/support': 'Support',
    '/svg-tools': 'SVG Tools',
    '/frontend-tools': 'Frontend Tools',
  }

  return staticLabels[pathname]
}
