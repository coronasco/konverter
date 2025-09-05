import { logger } from './logger'

export interface SVGValidationResult {
  isValid: boolean
  error?: string
  warnings?: string[]
  info?: {
    hasViewBox: boolean
    dimensions: { width?: number; height?: number }
    elementCount: number
    fileSize: number
    hasScripts: boolean
    hasExternalReferences: boolean
    colorCount: number
    pathCount: number
  }
}

export interface SVGSanitizeOptions {
  removeScripts: boolean
  removeEventHandlers: boolean
  removeExternalReferences: boolean
  removeComments: boolean
  removeMetadata: boolean
  maxFileSize?: number // în bytes
  allowedElements?: string[]
}

/**
 * Validează și analizează un fișier SVG
 */
export function validateSvg(svgString: string, strict = false): SVGValidationResult {
  const warnings: string[] = []
  
  try {
    // Verificări de bază
    if (!svgString || typeof svgString !== 'string') {
      return { isValid: false, error: 'SVG input is empty or invalid' }
    }

    const trimmedSvg = svgString.trim()
    if (!trimmedSvg) {
      return { isValid: false, error: 'SVG input is empty' }
    }

    // Verifică dimensiunea fișierului
    const fileSize = new Blob([svgString]).size
    if (fileSize > 5 * 1024 * 1024) { // 5MB limit
      return { isValid: false, error: 'SVG file is too large (max 5MB allowed)' }
    }

    // Verifică dacă conține tag-ul SVG
    if (!trimmedSvg.includes('<svg')) {
      return { isValid: false, error: 'Input does not contain SVG element' }
    }

    // Verifică dacă are tag-ul de închidere
    if (!trimmedSvg.includes('</svg>')) {
      return { isValid: false, error: 'SVG is missing closing tag' }
    }

    // Verifică structura XML de bază
    if (!isWellFormedXML(trimmedSvg)) {
      return { isValid: false, error: 'SVG is not well-formed XML' }
    }

    // Parse SVG pentru analiză detaliată
    const parser = new DOMParser()
    const doc = parser.parseFromString(trimmedSvg, 'image/svg+xml')
    
    // Verifică pentru erori de parsing
    const parseError = doc.querySelector('parsererror')
    if (parseError) {
      return { isValid: false, error: 'SVG parsing error: Invalid XML structure' }
    }

    const svgElement = doc.querySelector('svg')
    if (!svgElement) {
      return { isValid: false, error: 'No SVG element found' }
    }

    // Analizează atributele SVG
    const hasViewBox = svgElement.hasAttribute('viewBox')
    const width = svgElement.getAttribute('width')
    const height = svgElement.getAttribute('height')
    
    if (!hasViewBox && !width && !height) {
      if (strict) {
        return { isValid: false, error: 'SVG must have viewBox, width, or height attributes' }
      } else {
        warnings.push('SVG should have viewBox, width, or height attributes for proper scaling')
      }
    }

    // Verifică pentru conținut periculos
    const hasScripts = trimmedSvg.includes('<script') || /on\w+\s*=/.test(trimmedSvg)
    if (hasScripts) {
      if (strict) {
        return { isValid: false, error: 'SVG contains potentially dangerous scripts or event handlers' }
      } else {
        warnings.push('SVG contains scripts or event handlers that will be removed')
      }
    }

    // Verifică pentru referințe externe
    const hasExternalReferences = /href\s*=\s*["']https?:\/\//.test(trimmedSvg) || 
                                  /src\s*=\s*["']https?:\/\//.test(trimmedSvg)
    if (hasExternalReferences) {
      warnings.push('SVG contains external references that may not load properly')
    }

    // Analizează elementele SVG
    const allElements = doc.querySelectorAll('*')
    const elementCount = allElements.length
    
    // Verifică pentru elemente nevalide
    const invalidElements = Array.from(allElements).filter(el => 
      !isValidSVGElement(el.tagName.toLowerCase())
    )
    
    if (invalidElements.length > 0 && strict) {
      return { 
        isValid: false, 
        error: `Invalid SVG elements found: ${invalidElements.map(el => el.tagName).join(', ')}` 
      }
    }

    // Verifică dacă conține elemente vizibile
    const visualElements = doc.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon, text, image, use, g')
    if (visualElements.length === 0) {
      warnings.push('SVG appears to be empty (no visible elements found)')
    }

    // Analizează culorile
    const colors = extractColors(trimmedSvg)
    const colorCount = colors.size

    // Analizează path-urile
    const paths = doc.querySelectorAll('path')
    const pathCount = paths.length

    // Verifică pentru path-uri invalide
    const invalidPaths = Array.from(paths).filter(path => {
      const d = path.getAttribute('d')
      return d && !isValidPathData(d)
    })

    if (invalidPaths.length > 0) {
      warnings.push(`${invalidPaths.length} path(s) have invalid data attributes`)
    }

    // Dimensiuni
    const dimensions: { width?: number; height?: number } = {}
    if (width) dimensions.width = parseFloat(width)
    if (height) dimensions.height = parseFloat(height)

    logger.debug('SVG validation completed', {
      fileSize,
      elementCount,
      colorCount,
      pathCount,
      hasWarnings: warnings.length > 0
    }, 'SVG_VALIDATOR')

    return {
      isValid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
      info: {
        hasViewBox,
        dimensions,
        elementCount,
        fileSize,
        hasScripts,
        hasExternalReferences,
        colorCount,
        pathCount
      }
    }

  } catch (error) {
    logger.error('SVG validation failed', error, 'SVG_VALIDATOR')
    return { 
      isValid: false, 
      error: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Curăță și sanitizează un SVG
 */
export function sanitizeSvg(svgString: string, options: SVGSanitizeOptions = {
  removeScripts: true,
  removeEventHandlers: true,
  removeExternalReferences: false,
  removeComments: true,
  removeMetadata: true
}): string {
  let sanitized = svgString

  if (options.removeComments) {
    sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '')
  }

  if (options.removeScripts) {
    sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  }

  if (options.removeEventHandlers) {
    sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
  }

  if (options.removeExternalReferences) {
    sanitized = sanitized.replace(/href\s*=\s*["']https?:\/\/[^"']*["']/gi, '')
    sanitized = sanitized.replace(/src\s*=\s*["']https?:\/\/[^"']*["']/gi, '')
  }

  if (options.removeMetadata) {
    sanitized = sanitized.replace(/<metadata[^>]*>[\s\S]*?<\/metadata>/gi, '')
    sanitized = sanitized.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    sanitized = sanitized.replace(/<desc[^>]*>[\s\S]*?<\/desc>/gi, '')
  }

  // Verifică dimensiunea după sanitizare
  if (options.maxFileSize) {
    const size = new Blob([sanitized]).size
    if (size > options.maxFileSize) {
      throw new Error(`Sanitized SVG exceeds maximum size limit (${options.maxFileSize} bytes)`)
    }
  }

  // Verifică elementele permise
  if (options.allowedElements) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(sanitized, 'image/svg+xml')
    const allElements = doc.querySelectorAll('*')
    
    const disallowedElements = Array.from(allElements).filter(el => 
      !options.allowedElements!.includes(el.tagName.toLowerCase())
    )

    if (disallowedElements.length > 0) {
      logger.warn('Disallowed elements found during sanitization', {
        elements: disallowedElements.map(el => el.tagName)
      }, 'SVG_VALIDATOR')
    }
  }

  return sanitized.trim()
}

/**
 * Verifică dacă XML-ul este well-formed
 */
function isWellFormedXML(xmlString: string): boolean {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, 'application/xml')
    return !doc.querySelector('parsererror')
  } catch {
    return false
  }
}

/**
 * Verifică dacă un element este valid în SVG
 */
function isValidSVGElement(tagName: string): boolean {
  const validElements = [
    'svg', 'g', 'defs', 'desc', 'metadata', 'title',
    'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
    'text', 'tspan', 'tref', 'textPath',
    'marker', 'pattern', 'clipPath', 'mask',
    'image', 'switch', 'foreignObject',
    'use', 'symbol',
    'linearGradient', 'radialGradient', 'stop',
    'animate', 'animateColor', 'animateMotion', 'animateTransform', 'set',
    'filter', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite',
    'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight',
    'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
    'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
    'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
    'feTurbulence', 'style'
  ]
  
  return validElements.includes(tagName)
}

/**
 * Extrage culorile din SVG
 */
function extractColors(svgString: string): Set<string> {
  const colors = new Set<string>()
  
  // Regex pentru culori hex, rgb, hsl, named colors
  const colorRegex = /(#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|hsl\([^)]+\)|rgba\([^)]+\)|hsla\([^)]+\)|\b(?:red|blue|green|yellow|black|white|gray|grey|orange|purple|pink|brown|cyan|magenta|lime|navy|teal|olive|maroon|silver|gold|violet|indigo|turquoise|coral|salmon|khaki|plum|orchid|tan|azure|beige|bisque|chocolate|crimson|fuchsia|lavender|linen|moccasin|peachpuff|seashell|thistle|tomato|wheat|aliceblue|antiquewhite|aqua|aquamarine|blanchedalmond|blueviolet|burlywood|cadetblue|chartreuse|cornflowerblue|cornsilk|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|goldenrod|greenyellow|honeydew|hotpink|indianred|ivory|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|navajowhite|oldlace|olivedrab|orangered|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|powderblue|rosybrown|royalblue|saddlebrown|sandybrown|seagreen|sienna|skyblue|slateblue|slategray|slategrey|springgreen|steelblue|yellowgreen)\b)/gi
  
  const matches = svgString.match(colorRegex)
  if (matches) {
    matches.forEach(color => colors.add(color.toLowerCase()))
  }
  
  return colors
}

/**
 * Verifică dacă datele path-ului sunt valide
 */
function isValidPathData(pathData: string): boolean {
  // Verificare simplă pentru comenzile path valide
  const validCommands = /^[MmLlHhVvCcSsQqTtAaZz0-9\s,.-]+$/
  return validCommands.test(pathData.trim())
}
