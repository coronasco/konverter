'use client'

import { useEffect, useRef } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  fullWidth?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

let adCounter = 0

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidth = false,
  className = ''
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null)
  const adIdRef = useRef(`adsense-${++adCounter}-${adSlot}`)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
          // Verifică dacă elementul nu are deja reclama încărcată
          const hasAd = adRef.current.hasAttribute('data-adsbygoogle-status')
          const isEmpty = adRef.current.innerHTML.trim() === ''
          
          if (!hasAd && isEmpty) {
            window.adsbygoogle.push({})
          }
        }
      } catch (error) {
        // Suprima erorile duplicate - sunt normale în development
        const errorMessage = error instanceof Error ? error.message : String(error)
        if (!errorMessage.includes('already have ads')) {
          console.warn('AdSense warning:', error)
        }
      }
    }, 100) // Mic delay pentru a permite DOM-ului să se stabilizeze
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef}
        key={adIdRef.current}
        id={adIdRef.current}
        className="adsbygoogle"
        style={{ 
          display: 'block',
          width: fullWidth ? '100%' : 'auto',
          height: 'auto',
          minHeight: '250px'
        }}
        data-ad-client="ca-pub-7278381785440044"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  )
}

// Hook pentru gestionarea AdSense
function useAdSense() {
  useEffect(() => {
    // Încarcă scriptul AdSense dacă nu există
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      window.adsbygoogle = []
    }
  }, [])
}

// Componente pre-configurate pentru diferite tipuri de reclame
export function AdSenseBanner({ className = '' }: { className?: string }) {
  useAdSense()
  
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <AdSense 
        adSlot="1234567890"
        adFormat="auto"
        fullWidth={true}
        className="my-8 w-full max-w-4xl"
      />
    </div>
  )
}

export function AdSenseSquare({ className = '' }: { className?: string }) {
  useAdSense()
  
  return (
    <AdSense 
      adSlot="0987654321"
      adFormat="rectangle"
      className={`my-6 ${className}`}
    />
  )
}

export function AdSenseInArticle({ className = '' }: { className?: string }) {
  useAdSense()
  
  return (
    <div className={`flex justify-center my-8 px-4 ${className}`}>
      <AdSense 
        adSlot="1122334455"
        adFormat="auto"
        fullWidth={true}
        className="w-full max-w-lg"
      />
    </div>
  )
}

// Reclamă de navigare - sub hero sections
export function AdSenseNavigation({ className = '' }: { className?: string }) {
  useAdSense()
  
  return (
    <div className={`w-full bg-gray-50 dark:bg-gray-900/50 py-6 ${className}`}>
      <div className="container mx-auto px-4">
        <AdSense 
          adSlot="9988776655"
          adFormat="auto"
          fullWidth={true}
          className="w-full max-w-6xl mx-auto"
        />
      </div>
    </div>
  )
}

// Reclamă mică pentru sidebar sau spații înguste
export function AdSenseSidebar({ className = '' }: { className?: string }) {
  useAdSense()
  
  return (
    <div className={`flex justify-center ${className}`}>
      <AdSense 
        adSlot="5544332211"
        adFormat="rectangle"
        className="w-full max-w-xs"
      />
    </div>
  )
}
