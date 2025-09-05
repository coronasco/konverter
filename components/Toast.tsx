'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Copy, Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface ToastAction {
  label: string
  onClick: () => void
  icon?: React.ComponentType<{ className?: string }>
}

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose?: () => void
  actions?: ToastAction[]
  persistent?: boolean
  title?: string
  isVisible?: boolean
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
}

const iconStyles = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
}

export default function Toast({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  actions = [],
  persistent = false,
  title,
  isVisible = true
}: ToastProps) {
  const [visible, setVisible] = useState(isVisible)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(100)

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, 300)
  }, [onClose])

  useEffect(() => {
    if (persistent || !visible) return

    let startTime = Date.now()
    let animationFrame: number

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, duration - elapsed)
      const progressPercent = (remaining / duration) * 100
      
      setProgress(progressPercent)
      
      if (remaining > 0) {
        animationFrame = requestAnimationFrame(updateProgress)
      } else {
        handleClose()
      }
    }

    animationFrame = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [duration, persistent, handleClose, visible])

  if (!visible) return null

  const Icon = icons[type]

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 rounded-lg border shadow-lg transition-all duration-300 max-w-md min-w-80 overflow-hidden',
        styles[type],
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      )}
    >
      {/* Progress bar */}
      {!persistent && (
        <div className="absolute top-0 left-0 h-1 bg-black/20 dark:bg-white/20 transition-all duration-100 ease-linear" 
             style={{ width: `${progress}%` }} />
      )}
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconStyles[type])} />
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-semibold mb-1">{title}</h4>
            )}
            <p className="text-sm leading-relaxed">{message}</p>
            
            {actions.length > 0 && (
              <div className="flex gap-2 mt-3">
                {actions.map((action, index) => {
                  const ActionIcon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={action.onClick}
                      className="h-7 text-xs bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80"
                    >
                      {ActionIcon && <ActionIcon className="h-3 w-3 mr-1" />}
                      {action.label}
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Toast manager pentru multiple toasts
class ToastManager {
  private toasts: Map<string, ToastProps> = new Map()
  private listeners: Set<() => void> = new Set()

  show(toast: Omit<ToastProps, 'onClose'>) {
    const id = Math.random().toString(36).substr(2, 9)
    this.toasts.set(id, {
      ...toast,
      onClose: () => this.remove(id)
    })
    this.notifyListeners()
    return id
  }

  remove(id: string) {
    this.toasts.delete(id)
    this.notifyListeners()
  }

  clear() {
    this.toasts.clear()
    this.notifyListeners()
  }

  getToasts() {
    return Array.from(this.toasts.entries())
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener())
  }
}

export const toast = new ToastManager()

// Convenience methods
export const showToast = {
  success: (message: string, options?: Partial<ToastProps>) => 
    toast.show({ message, type: 'success', ...options }),
  
  error: (message: string, options?: Partial<ToastProps>) => 
    toast.show({ message, type: 'error', ...options }),
  
  info: (message: string, options?: Partial<ToastProps>) => 
    toast.show({ message, type: 'info', ...options }),
  
  warning: (message: string, options?: Partial<ToastProps>) => 
    toast.show({ message, type: 'warning', ...options }),
  
  copied: (item: string = 'Content') => 
    toast.show({ 
      message: `${item} copied to clipboard!`, 
      type: 'success',
      duration: 2000
    }),
  
  exported: (format: string) => 
    toast.show({ 
      message: `Successfully exported as ${format}`, 
      type: 'success',
      duration: 3000
    })
}

// Toast Container Component
export function ToastContainer() {
  const [toasts, setToasts] = useState<Array<[string, ToastProps]>>([])

  useEffect(() => {
    const updateToasts = () => {
      setToasts(toast.getToasts())
    }

    const unsubscribe = toast.subscribe(updateToasts)
    updateToasts() // Initial load

    return unsubscribe
  }, [])

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map(([id, toastProps]) => (
        <Toast key={id} {...toastProps} />
      ))}
    </div>
  )
}