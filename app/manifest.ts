import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Konverter | Frontend Tools',
    short_name: 'Konverter',
    description: 'Browser-based frontend tools for SVG workflows, asset prep, and code-ready utilities.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f3ec',
    theme_color: '#1d7c74',
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
    categories: ['developer', 'design', 'utilities'],
    lang: 'en',
    dir: 'ltr',
  }
}
