import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  headerActions?: ReactNode
}

export function Card({ children, className = '', title, headerActions }: CardProps) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 
                     dark:border-zinc-800 overflow-hidden ${className}`}>
      {(title || headerActions) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          {title && (
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          )}
          {headerActions && (
            <div className="flex items-center gap-2">{headerActions}</div>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}

interface CardSkeletonProps {
  lines?: number
  className?: string
}

export function CardSkeleton({ lines = 3, className = '' }: CardSkeletonProps) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 
                     dark:border-zinc-800 p-4 animate-pulse ${className}`}>
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 mb-4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  )
}
