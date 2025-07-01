export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Konverter - Advanced SVG to CSS/JSX Converter",
    "description": "Free online tool to convert SVG files to optimized URL-encoded CSS, Base64, or React JSX components",
    "url": "https://www.konverter-online.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Daniel Zaharia",
      "url": "https://github.com/coronasco"
    },
    "creator": {
      "@type": "Person",
      "name": "Daniel Zaharia"
    },
    "publisher": {
      "@type": "Person",
      "name": "Daniel Zaharia"
    },
    "featureList": [
      "SVG to CSS conversion",
      "SVG to Base64 conversion", 
      "SVG to React JSX conversion",
      "SVG optimization",
      "Drag and drop upload",
      "Live preview",
      "Copy to clipboard"
    ],
    "screenshot": "https://www.konverter-online.com/og-image.svg",
    "softwareVersion": "1.0.0",
    "dateCreated": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "license": "https://opensource.org/licenses/MIT"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 