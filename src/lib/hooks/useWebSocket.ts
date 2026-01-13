'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { NewsItem, WebSocketMessage, ConnectionStatus } from '@/lib/types/news'

interface UseWebSocketOptions {
  url?: string
  autoConnect?: boolean
  reconnectAttempts?: number
  reconnectDelay?: number
  onNewsReceived?: (news: NewsItem) => void
  onStatsUpdate?: (stats: unknown) => void
}

interface UseWebSocketReturn {
  status: ConnectionStatus
  connect: () => void
  disconnect: () => void
  sendMessage: (message: WebSocketMessage) => void
}

export function useWebSocket({
  url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  autoConnect = false,
  reconnectAttempts = 5,
  reconnectDelay = 3000,
  onNewsReceived,
  onStatsUpdate,
}: UseWebSocketOptions = {}): UseWebSocketReturn {
  const socketRef = useRef<Socket | null>(null)
  const reconnectCountRef = useRef(0)
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isReconnecting: false,
  })

  const handleMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'news':
        if (onNewsReceived && message.payload) {
          onNewsReceived(message.payload as NewsItem)
        }
        break
      case 'stats':
        if (onStatsUpdate && message.payload) {
          onStatsUpdate(message.payload)
        }
        break
      case 'ping':
        socketRef.current?.emit('message', {
          type: 'pong',
          timestamp: Date.now(),
        })
        break
    }
  }, [onNewsReceived, onStatsUpdate])

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return

    const socket = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: reconnectAttempts,
      reconnectionDelay: reconnectDelay,
    })

    socket.on('connect', () => {
      setStatus({
        isConnected: true,
        isReconnecting: false,
        lastConnected: new Date(),
      })
      reconnectCountRef.current = 0
    })

    socket.on('disconnect', () => {
      setStatus(prev => ({
        ...prev,
        isConnected: false,
      }))
    })

    socket.on('connect_error', (error) => {
      reconnectCountRef.current++
      setStatus({
        isConnected: false,
        isReconnecting: reconnectCountRef.current < reconnectAttempts,
        error: error.message,
      })
    })

    socket.on('message', handleMessage)

    socketRef.current = socket
  }, [url, reconnectAttempts, reconnectDelay, handleMessage])

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect()
    socketRef.current = null
    setStatus({
      isConnected: false,
      isReconnecting: false,
    })
  }, [])

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('message', message)
    }
  }, [])

  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [autoConnect, connect, disconnect])

  return {
    status,
    connect,
    disconnect,
    sendMessage,
  }
}
