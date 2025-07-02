'use client'

import { Share2, Twitter, Facebook, Linkedin, Mail, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
  buttonText?: string
}

export default function ShareButton({ 
  title = 'Konverter - Advanced SVG to CSS & JSX Converter',
  text = 'Check out this amazing free tool for converting SVG to CSS and React components!',
  url = 'https://www.konverter-online.com',
  buttonText = 'Share Website'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-blue-400 hover:text-blue-500',
      action: () => {
        const shareText = `${title}\n\n${text}`
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
        window.open(shareUrl, '_blank')
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600 hover:text-blue-700',
      action: () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        window.open(shareUrl, '_blank')
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700 hover:text-blue-800',
      action: () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        window.open(shareUrl, '_blank')
      }
    },
    {
      name: 'Reddit',
      icon: ExternalLink,
      color: 'text-orange-500 hover:text-orange-600',
      action: () => {
        const shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        window.open(shareUrl, '_blank')
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-gray-600 hover:text-gray-700',
      action: () => {
        const subject = encodeURIComponent(title)
        const body = encodeURIComponent(`${text}\n\n${url}`)
        const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
        window.location.href = mailtoUrl
      }
    },
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'text-green-600 hover:text-green-700',
      action: async () => {
        try {
          await navigator.clipboard.writeText(url)
          alert('Link copied to clipboard!')
        } catch {
          // Fallback pentru browsere vechi
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Link copied to clipboard!')
        }
      }
    }
  ]

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors'
      >
        <Share2 className='h-4 w-4' />
        {buttonText}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 min-w-[200px]">
            <div className="p-2">
              {shareOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.action()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className={`h-4 w-4 ${option.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{option.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
} 