import { getRouteLabel } from '@/lib/tool-catalog'

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
  let currentPath = ''

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const url = `${baseUrl}${currentPath}`
    const name =
      getRouteLabel(currentPath) ||
      segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    breadcrumbs.push({ name, url })
  })

  return breadcrumbs
}
