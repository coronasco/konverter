export async function optimizeSvg(svgString: string, level: 'conservative' | 'balanced' | 'aggressive' | 'maximum' = 'balanced'): Promise<string> {
  try {
    console.log(`Starting SVG optimization with level: ${level}`)
    console.log('Input SVG length:', svgString.length)
    
    // Simple fallback optimization that always works
    let optimized = svgString
    
    // Conservative optimizations (all levels)
    optimized = optimized.replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    optimized = optimized.replace(/<\?xml[^>]*\?>/g, '') // Remove XML declaration
    optimized = optimized.replace(/<metadata[^>]*>[\s\S]*?<\/metadata>/g, '') // Remove metadata
    optimized = optimized.replace(/<title[^>]*>[\s\S]*?<\/title>/g, '') // Remove titles
    optimized = optimized.replace(/<desc[^>]*>[\s\S]*?<\/desc>/g, '') // Remove descriptions
    optimized = optimized.replace(/<!DOCTYPE[^>]*>/g, '') // Remove DOCTYPE
    
    // Clean up whitespace
    optimized = optimized.replace(/\s*=\s*"/g, '="')
    optimized = optimized.replace(/"\s+/g, '" ')
    optimized = optimized.replace(/\s+>/g, '>')
    optimized = optimized.replace(/<\s+/g, '<')
    optimized = optimized.replace(/\s{2,}/g, ' ')
    
    if (level === 'balanced' || level === 'aggressive' || level === 'maximum') {
      // Balanced optimizations
      optimized = optimized.replace(/\s+version="[^"]*"/g, '') // Remove version
      optimized = optimized.replace(/\s+xmlns:xlink="[^"]*"/g, '') // Remove unused xmlns
      optimized = optimized.replace(/\s+enable-background="[^"]*"/g, '') // Remove enable-background
      optimized = optimized.replace(/\s+xml:space="[^"]*"/g, '') // Remove xml:space
      
      // Remove .0 from numbers
      optimized = optimized.replace(/(\d+)\.0(?=\s|>|"|$)/g, '$1')
      optimized = optimized.replace(/(\d+)\.00(?=\s|>|"|$)/g, '$1')
      
      // Remove empty groups
      optimized = optimized.replace(/<g[^>]*>\s*<\/g>/g, '')
    }
    
    if (level === 'aggressive' || level === 'maximum') {
      // Aggressive optimizations
      optimized = optimized.replace(/\s+class="[^"]*"/g, '') // Remove classes
      optimized = optimized.replace(/\s+name="[^"]*"/g, '') // Remove names
      
      // Remove hidden elements
      optimized = optimized.replace(/<[^>]*display="none"[^>]*>[\s\S]*?<\/[^>]*>/g, '')
      optimized = optimized.replace(/<[^>]*visibility="hidden"[^>]*>[\s\S]*?<\/[^>]*>/g, '')
      
      // Remove empty elements
      optimized = optimized.replace(/<[^>]*>\s*<\/[^>]*>/g, '')
      
      // Clean up path data
      optimized = optimized.replace(/d="\s+/g, 'd="')
      optimized = optimized.replace(/\s+"/g, '"')
      
      // Simplify numbers in paths
      optimized = optimized.replace(/(\d+)\.(\d{3,})/g, (match: string, whole: string, decimal: string) => {
        return whole + '.' + decimal.substring(0, 2)
      })
    }
    
    if (level === 'maximum') {
      // Maximum optimizations
      optimized = optimized.replace(/\s+style="[^"]*"/g, '') // Remove inline styles
      optimized = optimized.replace(/\s+transform="[^"]*"/g, '') // Remove transforms
      optimized = optimized.replace(/\s+opacity="[^"]*"/g, '') // Remove opacity
      
      // Remove filters, clip-paths, masks
      optimized = optimized.replace(/\s+filter="[^"]*"/g, '')
      optimized = optimized.replace(/\s+clip-path="[^"]*"/g, '')
      optimized = optimized.replace(/\s+mask="[^"]*"/g, '')
      
      // Remove opacity="0" elements
      optimized = optimized.replace(/<[^>]*opacity="0"[^>]*>[\s\S]*?<\/[^>]*>/g, '')
      
      // Remove whitespace between tags
      optimized = optimized.replace(/>\s+</g, '><')
    }
    
    // Final cleanup
    optimized = optimized.trim()
    
    // Ensure we still have a valid SVG structure
    if (!optimized.includes('<svg') || !optimized.includes('</svg>')) {
      console.warn('SVG structure compromised, returning original')
      return svgString
    }
    
    console.log('SVG optimization completed')
    console.log('Output SVG length:', optimized.length)
    console.log('Reduction:', ((svgString.length - optimized.length) / svgString.length * 100).toFixed(1) + '%')
    
    return optimized
  } catch (error) {
    console.error('SVG optimization failed:', error)
    console.error('Error details:', error)
    return svgString
  }
}



export function urlEncodeSvg(svgString: string): string {
  // Ensure SVG has proper viewBox if missing
  let svg = svgString
  if (!svg.includes('viewBox') && svg.includes('width') && svg.includes('height')) {
    const widthMatch = svg.match(/width="([^"]*)"/)
    const heightMatch = svg.match(/height="([^"]*)"/)
    if (widthMatch && heightMatch) {
      const width = widthMatch[1]
      const height = heightMatch[1]
      svg = svg.replace(/<svg/, `<svg viewBox="0 0 ${width} ${height}"`)
    }
  }
  
  const encoded = svg
    .replace(/%/g, '%25')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/"/g, '%22')
    .replace(/'/g, '%27')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/\s+/g, ' ')
    .trim()
  
  return `background-image: url("data:image/svg+xml,${encoded}");`
}

export function base64EncodeSvg(svgString: string): string {
  // Ensure SVG has proper viewBox if missing
  let svg = svgString
  if (!svg.includes('viewBox') && svg.includes('width') && svg.includes('height')) {
    const widthMatch = svg.match(/width="([^"]*)"/)
    const heightMatch = svg.match(/height="([^"]*)"/)
    if (widthMatch && heightMatch) {
      const width = widthMatch[1]
      const height = heightMatch[1]
      svg = svg.replace(/<svg/, `<svg viewBox="0 0 ${width} ${height}"`)
    }
  }
  
  // Use a safe base64 encoding that handles Unicode characters
  const base64 = btoa(unescape(encodeURIComponent(svg)))
  return `background-image: url("data:image/svg+xml;base64,${base64}");`
}

export function convertToJsx(svgString: string): string {
  // Remove XML declaration and comments
  const jsx = svgString.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '')
  
  // Extract SVG attributes
  const svgMatch = jsx.match(/<svg([^>]*)>/)
  if (!svgMatch) {
    return `const MyIcon = (props) => (
  <svg {...props}>
    {/* Invalid SVG */}
  </svg>
);

export default MyIcon;`
  }
  
  const svgAttributes = svgMatch[1]
  
  // Extract content without the outer svg tag
  const content = jsx.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')
  
  // Parse SVG attributes
  const attributes = svgAttributes.match(/(\w+)="([^"]*)"/g) || []
  const configurableProps: string[] = []
  const fixedProps: string[] = []
  
  attributes.forEach(attr => {
    const [name, value] = attr.split('=')
    const cleanName = name.replace(/([a-z])-([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase())
    const cleanValue = value.replace(/"/g, '')
    
    // Make common props configurable
    if (['width', 'height', 'fill', 'stroke', 'className'].includes(cleanName)) {
      configurableProps.push(cleanName)
    } else {
      fixedProps.push(`${cleanName}="${cleanValue}"`)
    }
  })
  
  // Process inner elements to make colors configurable
  let jsxContent = content
    .replace(/([a-z])-([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase())
    .replace(/\bclass\b/g, 'className')
    .replace(/<([a-zA-Z][a-zA-Z0-9]*)([^>]*)\/>/g, '<$1$2 />')
  
  // Extract all color attributes from inner elements
  const colorMatches = jsxContent.match(/(fill|stroke)="([^"]*)"/g) || []
  const uniqueColors = new Set<string>()
  
  colorMatches.forEach(match => {
    const color = match.match(/"([^"]*)"/)?.[1]
    if (color && color !== 'none' && color !== 'currentColor') {
      uniqueColors.add(color)
    }
  })
  
  // Create color props
  const colorProps: string[] = []
  const colorMap = new Map<string, string>()
  
  Array.from(uniqueColors).forEach((color, index) => {
    const propName = `color${index}`
    colorProps.push(propName)
    colorMap.set(color, propName)
  })
  
  // Replace colors with props in content
  colorMap.forEach((propName, color) => {
    const colorRegex = new RegExp(`(fill|stroke)="${color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g')
    jsxContent = jsxContent.replace(colorRegex, `$1={${propName}}`)
  })
  
  // Create props interface
  const allProps = [...configurableProps, ...colorProps]
  const propsInterface = allProps.length > 0 
    ? `interface IconProps {
  ${allProps.map(prop => `${prop}?: string`).join('\n  ')}
  className?: string
  style?: React.CSSProperties
}` : ''

  // Create component
  const componentProps = allProps.length > 0 
    ? `{
  ${allProps.map(prop => `${prop},`).join('\n  ')}
  className,
  style,
  ...props
}` : 'props'

  const svgProps = allProps.length > 0 
    ? `${fixedProps.join('\n      ')}
      ${allProps.map(prop => `${prop}={${prop}}`).join('\n      ')}
      className={className}
      style={style}
      {...props}`
    : `${fixedProps.join('\n      ')}
      {...props}`

  return `import React from 'react'

${propsInterface}

const MyIcon: React.FC<${allProps.length > 0 ? 'IconProps' : 'any'}> = (${componentProps}) => {
  return (
    <svg
      ${svgProps}
    >
      ${jsxContent}
    </svg>
  )
}

export default MyIcon`
}

export function generateReactComponent(svgString: string, componentName: string = 'SvgIcon'): string {
  // Parse SVG to extract colors and create configurable component
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgElement = svgDoc.querySelector('svg')
  
  if (!svgElement) {
    return convertToJsx(svgString) // Fallback to simple conversion
  }

  // Extract all color elements
  const colorElements: Array<{id: string, type: 'fill' | 'stroke', originalColor: string, element: Element}> = []
  let idCounter = 0

  const allElements = svgElement.querySelectorAll('*')
  allElements.forEach((element) => {
    const fill = element.getAttribute('fill')
    const stroke = element.getAttribute('stroke')
    
    if (fill && fill !== 'none' && fill !== 'currentColor') {
      colorElements.push({
        id: `fill-${idCounter++}`,
        type: 'fill',
        originalColor: fill,
        element: element
      })
    }
    
    if (stroke && stroke !== 'none' && stroke !== 'currentColor') {
      colorElements.push({
        id: `stroke-${idCounter++}`,
        type: 'stroke',
        originalColor: stroke,
        element: element
      })
    }
  })

  // Create color props interface
  const colorProps = colorElements.map(el => {
    const propName = `${el.type}${el.id.replace(/^fill-|stroke-/, '')}`
    return `  ${propName}?: string`
  }).join('\n')

  // Create component with color props
  let componentCode = `import React from 'react'

interface ${componentName}Props {
  className?: string
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
${colorProps ? `\n  // Color customization props\n${colorProps}` : ''}
}

const ${componentName}: React.FC<${componentName}Props> = ({
  className = '',
  width,
  height,
  style,
${colorElements.map(el => `  ${el.type}${el.id.replace(/^fill-|stroke-/, '')} = '${el.originalColor}'`).join(',\n')}
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      style={style}
      viewBox="${svgElement.getAttribute('viewBox') || '0 0 24 24'}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
`

  // Process SVG content and replace colors with props
  let svgContent = svgString
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')

  // Replace colors with props
  colorElements.forEach(el => {
    const propName = `${el.type}${el.id.replace(/^fill-|stroke-/, '')}`
    const regex = new RegExp(`${el.type}="${el.originalColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g')
    svgContent = svgContent.replace(regex, `${el.type}={${propName}}`)
  })

  // Convert to JSX
  svgContent = svgContent
    .replace(/([a-z])-([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase())
    .replace(/\bclass\b/g, 'className')
    .replace(/<([a-zA-Z][a-zA-Z0-9]*)([^>]*)\/>/g, '<$1$2 />')

  componentCode += `      ${svgContent}
    </svg>
  )
}

export default ${componentName}
`

  return componentCode
}

export function validateSvg(svgString: string): { isValid: boolean; error?: string } {
  if (!svgString.trim()) {
    return { isValid: false, error: 'SVG input is empty' }
  }

  // Verifică dacă conține tag-ul SVG
  if (!svgString.includes('<svg')) {
    return { isValid: false, error: 'Input is not a valid SVG' }
  }

  // Verifică dacă are tag-ul de închidere
  if (!svgString.includes('</svg>')) {
    return { isValid: false, error: 'SVG is missing closing tag' }
  }

  // Verifică dacă are atributele de bază
  const hasViewBox = svgString.includes('viewBox') || svgString.includes('width') || svgString.includes('height')
  if (!hasViewBox) {
    return { isValid: false, error: 'SVG is missing required attributes (viewBox, width, or height)' }
  }

  // Verifică dacă conține elemente SVG valide
  const hasValidElements = svgString.includes('<path') || 
                          svgString.includes('<rect') || 
                          svgString.includes('<circle') || 
                          svgString.includes('<ellipse') || 
                          svgString.includes('<line') || 
                          svgString.includes('<polyline') || 
                          svgString.includes('<polygon') || 
                          svgString.includes('<text') || 
                          svgString.includes('<image') || 
                          svgString.includes('<g>') ||
                          svgString.includes('<use')
  
  if (!hasValidElements) {
    return { isValid: false, error: 'SVG must contain valid elements (path, rect, circle, etc.)' }
  }

  return { isValid: true }
} 