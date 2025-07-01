export async function optimizeSvg(svgString: string): Promise<string> {
  try {
    let optimized = svgString
    
    // Step 1: Remove only comments and metadata (conservative)
    optimized = optimized
      .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
      .replace(/<\?xml[^>]*\?>/g, '') // Remove XML declaration
      .replace(/<metadata[^>]*>[\s\S]*?<\/metadata>/g, '') // Remove metadata
      .replace(/<title[^>]*>[\s\S]*?<\/title>/g, '') // Remove title
      .replace(/<desc[^>]*>[\s\S]*?<\/desc>/g, '') // Remove desc
    
    // Step 2: Remove only truly unnecessary attributes
    optimized = optimized
      .replace(/\s+version="[^"]*"/g, '')
      .replace(/\s+xmlns:xlink="[^"]*"/g, '')
      .replace(/\s+enable-background="[^"]*"/g, '')
      .replace(/\s+space="[^"]*"/g, '')
    
    // Step 3: Conservative whitespace cleanup (keep structure)
    optimized = optimized
      .replace(/\s*=\s*"/g, '="') // Remove spaces around =
      .replace(/"\s+/g, '" ') // Normalize spaces after quotes
      .replace(/\s+>/g, '>') // Remove spaces before >
      .replace(/<\s+/g, '<') // Remove spaces after <
      .replace(/\s+/g, ' ') // Normalize all whitespace
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .replace(/\s+$/gm, '') // Remove trailing spaces
      .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
      .trim()
    
    // Step 4: Remove only completely empty groups
    optimized = optimized
      .replace(/<g[^>]*>\s*<\/g>/g, '') // Only empty groups
    
    // Step 5: Conservative number optimization
    optimized = optimized
      .replace(/(\d+)\.0/g, '$1') // Remove .0 from integers
      .replace(/(\d+)\.(\d{3,})\d+/g, (match, num, decimals) => {
        // Keep 2 decimal places for precision
        return num + '.' + decimals.substring(0, 2)
      })
    
    // Step 6: Final conservative cleanup
    optimized = optimized
      .replace(/\s{2,}/g, ' ') // Multiple spaces to single
      .trim()
    
    return optimized
  } catch {
    throw new Error('Failed to optimize SVG')
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
  
  const base64 = btoa(svg)
  return `background-image: url("data:image/svg+xml;base64,${base64}");`
}

export function convertToJsx(svgString: string): string {
  // Remove XML declaration
  let jsx = svgString.replace(/<\?xml[^>]*\?>/g, '')
  
  // Extract SVG attributes
  const svgMatch = jsx.match(/<svg([^>]*)>/)
  const svgAttributes = svgMatch ? svgMatch[1] : ''
  
  // Convert kebab-case attributes to camelCase
  jsx = jsx.replace(/([a-z])-([a-z])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase()
  })
  
  // Convert specific attributes
  jsx = jsx.replace(/\bclass\b/g, 'className')
  jsx = jsx.replace(/\bfor\b/g, 'htmlFor')
  jsx = jsx.replace(/\bmaxlength\b/g, 'maxLength')
  jsx = jsx.replace(/\breadonly\b/g, 'readOnly')
  jsx = jsx.replace(/\btabindex\b/g, 'tabIndex')
  
  // Remove self-closing tags and make them proper JSX
  jsx = jsx.replace(/<([a-zA-Z][a-zA-Z0-9]*)([^>]*)\/>/g, '<$1$2 />')
  
  // Extract content without the outer svg tag
  const content = jsx.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')
  
  // Convert SVG attributes to camelCase for the outer svg
  const convertedAttributes = svgAttributes
    .replace(/([a-z])-([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase())
    .replace(/\bclass\b/g, 'className')
  
  // Wrap in React component with preserved attributes
  return `const MyIcon = (props) => (
  <svg${convertedAttributes} {...props}>
    ${content}
  </svg>
);

export default MyIcon;`
} 