'use client'

import { NewsItem, CATEGORY_COLORS } from '@/lib/types/news'

interface NewsMarkerPopupProps {
  news: NewsItem
  onReadMore?: () => void
}

export function NewsMarkerPopup({ news, onReadMore }: NewsMarkerPopupProps) {
  const categoryColor = CATEGORY_COLORS[news.category]
  const timeAgo = formatTimeAgo(new Date(news.publishedAt))

  return (
    <div className="w-64 p-0">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="px-2 py-0.5 text-xs font-medium rounded-full text-white capitalize"
          style={{ backgroundColor: categoryColor }}
        >
          {news.category}
        </span>
        {news.isBreaking && (
          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-600 text-white animate-pulse">
            BREAKING
          </span>
        )}
      </div>

      <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-zinc-100">
        {news.title}
      </h3>

      <p className="text-xs text-zinc-400 mb-2 line-clamp-2">
        {news.summary}
      </p>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{news.source.name}</span>
        <span>{timeAgo}</span>
      </div>

      <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{news.location.city}, {news.location.country}</span>
      </div>

      {onReadMore && (
        <button
          onClick={onReadMore}
          className="mt-3 w-full py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg transition-colors"
        >
          Read More
        </button>
      )}
    </div>
  )
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
