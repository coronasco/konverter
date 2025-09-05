export default function ReviewSchema() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Konverter Online - Developer Tools",
    "description": "Free online developer tools for SVG conversion, JSON formatting, and more",
    "brand": {
      "@type": "Brand",
      "name": "Konverter Online"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Daniel Zaharia"
        },
        "reviewBody": "Amazing tool! Converted my SVG to React components in seconds. The optimization feature reduced file size by 60%. Highly recommended for developers.",
        "datePublished": "2025-07-01"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Mariela"
        },
        "reviewBody": "Perfect for my workflow. The JSON formatter saved me hours of debugging. Clean interface and lightning fast performance.",
        "datePublished": "2025-8-5"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "George Popescu"
        },
        "reviewBody": "Great collection of tools. The password generator is particularly useful with customizable options. Would love to see more export formats.",
        "datePublished": "2025-08-21"
      }
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  )
}
