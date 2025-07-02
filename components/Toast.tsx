'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const bgColor = type === 'success' 
    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
  
  const textColor = type === 'success' 
    ? 'text-green-800 dark:text-green-200' 
    : 'text-red-800 dark:text-red-200'
  
  const iconColor = type === 'success' 
    ? 'text-green-600' 
    : 'text-red-600'

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${bgColor}`}>
        {type === 'success' ? (
          <CheckCircle className={`h-5 w-5 ${iconColor}`} />
        ) : (
          <XCircle className={`h-5 w-5 ${iconColor}`} />
        )}
        <span className={`text-sm font-medium ${textColor}`}>
          {message}
        </span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>
  )
} 