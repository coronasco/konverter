import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Konverter - Advanced SVG to CSS/JSX Converter',
    short_name: 'Konverter',
    description: 'Free online tool to convert SVG to CSS, Base64, and React JSX components',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    categories: ['developer', 'productivity', 'utilities'],
    lang: 'en',
    dir: 'ltr',
  }
} 