'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

export interface Toast {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

interface ToastProviderProps {
  children: React.ReactNode
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

let toastContext: ToastContextValue | null = null

export function useToast() {
  if (!toastContext) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return toastContext
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}`
    setToasts(prev => [...prev, { ...toast, id }])

    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, toast.duration || 4000)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  toastContext = { addToast, removeToast }

  const typeStyles: Record<Toast['type'], string> = {
    info: 'bg-blue-600',
    success: 'bg-emerald-600',
    warning: 'bg-amber-600',
    error: 'bg-red-600',
  }

  return (
    <>
      {children}
      {mounted && createPortal(
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`${typeStyles[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg 
                          flex items-center justify-between gap-3 animate-slide-in`}
            >
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

export function showToast(toast: Omit<Toast, 'id'>) {
  if (toastContext) {
    toastContext.addToast(toast)
  }
}
