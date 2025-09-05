interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

// Helper pentru generarea breadcrumbs
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const baseUrl = "https://www.konverter-online.com"
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: baseUrl }
  ]

  const pathSegments = pathname.split('/').filter(segment => segment)
  
  const toolNames: Record<string, string> = {
    'json-formatter': 'JSON Formatter',
    'css-minifier': 'CSS Minifier', 
    'password-generator': 'Password Generator',
    'qr-generator': 'QR Code Generator',
    'color-generator': 'Color Generator',
    'base64-converter': 'Base64 Converter',
    'url-shortener': 'URL Shortener',
    'blog': 'Blog'
  }

  pathSegments.forEach((segment, index) => {
    const url = baseUrl + '/' + pathSegments.slice(0, index + 1).join('/')
    const name = toolNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ name, url })
  })

  return breadcrumbs
}
