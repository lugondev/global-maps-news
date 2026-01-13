'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { NewsItem } from '@/lib/types/news'
import { generateMockNewsItem } from '@/lib/utils/mockData'

interface UseNewsStreamOptions {
  initialItems?: NewsItem[]
  simulateRealtime?: boolean
  intervalMs?: number
  maxItems?: number
}

interface UseNewsStreamReturn {
  newsItems: NewsItem[]
  isConnected: boolean
  isReconnecting: boolean
  addNewsItem: (item: NewsItem) => void
  removeNewsItem: (id: string) => void
  clearNews: () => void
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting'
}

export function useNewsStream({
  initialItems = [],
  simulateRealtime = true,
  intervalMs = 5000,
  maxItems = 100,
}: UseNewsStreamOptions = {}): UseNewsStreamReturn {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialItems)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const addNewsItem = useCallback((item: NewsItem) => {
    setNewsItems(prev => {
      const updated = [item, ...prev]
      return updated.slice(0, maxItems)
    })
  }, [maxItems])

  const removeNewsItem = useCallback((id: string) => {
    setNewsItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const clearNews = useCallback(() => {
    setNewsItems([])
  }, [])

  const simulateConnection = useCallback(() => {
    setConnectionStatus('connected')

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (Math.random() < 0.05) {
        setConnectionStatus('reconnecting')
        
        reconnectTimeoutRef.current = setTimeout(() => {
          setConnectionStatus('connected')
        }, 2000)
        return
      }

      const newsCount = Math.random() < 0.3 ? 2 : 1
      for (let i = 0; i < newsCount; i++) {
        const newItem = generateMockNewsItem()
        addNewsItem(newItem)
      }
    }, intervalMs)
  }, [intervalMs, addNewsItem])

  useEffect(() => {
    if (!simulateRealtime) return

    const initialDelay = setTimeout(() => {
      simulateConnection()
    }, 1000)

    return () => {
      clearTimeout(initialDelay)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [simulateRealtime, simulateConnection])

  return {
    newsItems,
    isConnected: connectionStatus === 'connected',
    isReconnecting: connectionStatus === 'reconnecting',
    addNewsItem,
    removeNewsItem,
    clearNews,
    connectionStatus,
  }
}
