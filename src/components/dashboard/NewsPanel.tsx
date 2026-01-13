'use client'

import { NewsItem, CATEGORY_COLORS } from '@/lib/types/news'

interface NewsPanelProps {
  newsItems: NewsItem[]
  onSelectNews: (news: NewsItem) => void
  selectedNewsId?: string | null
  className?: string
}

export function NewsPanel({ newsItems, onSelectNews, selectedNewsId, className = '' }: NewsPanelProps) {
  if (newsItems.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-full text-zinc-500 ${className}`}>
        <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-sm">No news available</p>
        <p className="text-xs mt-1">Waiting for updates...</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {newsItems.map((news, index) => (
          <NewsCard
            key={news.id}
            news={news}
            isSelected={news.id === selectedNewsId}
            isNew={index < 3}
            onClick={() => onSelectNews(news)}
          />
        ))}
      </div>
    </div>
  )
}

interface NewsCardProps {
  news: NewsItem
  isSelected: boolean
  isNew: boolean
  onClick: () => void
}

function NewsCard({ news, isSelected, isNew, onClick }: NewsCardProps) {
  const categoryColor = CATEGORY_COLORS[news.category]
  const timeAgo = formatTimeAgo(new Date(news.publishedAt))

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all border
                  ${isSelected 
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500' 
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'}
                  ${isNew ? 'animate-fade-in' : ''}`}
    >
      <div className="flex items-start gap-2">
        <span
          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
          style={{ backgroundColor: categoryColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded text-white capitalize"
              style={{ backgroundColor: categoryColor }}
            >
              {news.category}
            </span>
            {news.isBreaking && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
                BREAKING
              </span>
            )}
          </div>
          <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 mb-1">
            {news.title}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {news.summary}
          </p>
          <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {news.location.city}
            </span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
