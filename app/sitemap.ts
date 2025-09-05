import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.konverter-online.com'
  const currentDate = new Date()
  
  // Static blog posts - add new ones manually
  const blogPosts = [
    'base64-converter-guide',
    'color-generator-guide', 
    'css-background-techniques',
    'css-minifier-guide',
    'json-formatter-guide',
    'qr-code-generator-guide',
    'secure-password-generation-guide',
    'svg-optimization-guide',
    'svg-to-jsx-guide',
    'svg-to-react-converter-guide',
    'url-shortener-guide'
  ]
  
  const blogUrls = blogPosts.map((postId) => ({
    url: `${baseUrl}/blog/${postId}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // Main tools - high priority
    {
      url: `${baseUrl}/json-formatter`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/css-minifier`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/color-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/base64-converter`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/password-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/qr-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/url-shortener`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Blog section
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Blog posts
    ...blogUrls,
    
    // Legal pages - lower priority
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
} 