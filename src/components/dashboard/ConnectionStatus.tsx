'use client'

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'reconnecting'
  className?: string
}

export function ConnectionStatus({ status, className = '' }: ConnectionStatusProps) {
  const configs = {
    connected: {
      color: 'bg-emerald-500',
      text: 'Live',
      animate: true,
    },
    disconnected: {
      color: 'bg-zinc-400',
      text: 'Offline',
      animate: false,
    },
    reconnecting: {
      color: 'bg-amber-500',
      text: 'Reconnecting...',
      animate: true,
    },
  }

  const config = configs[status]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {config.animate && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.color}`} />
      </span>
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
        {config.text}
      </span>
    </div>
  )
}
