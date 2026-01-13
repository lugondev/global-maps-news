'use client'

import { NewsStats, NewsCategory, CATEGORY_COLORS } from '@/lib/types/news'

interface StatsPanelProps {
  stats: NewsStats | null
  className?: string
}

export function StatsPanel({ stats, className = '' }: StatsPanelProps) {
  if (!stats) {
    return (
      <div className={`space-y-3 animate-pulse ${className}`}>
        <div className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
        <div className="h-24 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
      </div>
    )
  }

  const topCategories = Object.entries(stats.byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const maxCount = Math.max(...Object.values(stats.byCategory), 1)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Total News"
          value={stats.totalCount}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          }
        />
        <StatCard
          label="Last Hour"
          value={stats.recentCount}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          highlight={stats.recentCount > 0}
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Top Categories
        </h4>
        {topCategories.map(([category, count]) => (
          <CategoryBar
            key={category}
            category={category as NewsCategory}
            count={count}
            maxCount={maxCount}
          />
        ))}
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          By Region
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(stats.byRegion)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([region, count]) => (
              <span
                key={region}
                className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded-full
                          text-zinc-600 dark:text-zinc-300"
              >
                {region}: {count}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  highlight?: boolean
}

function StatCard({ label, value, icon, highlight }: StatCardProps) {
  return (
    <div className={`p-3 rounded-lg border transition-colors
                    ${highlight 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'}`}>
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${highlight ? 'text-blue-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
        {value}
      </p>
    </div>
  )
}

interface CategoryBarProps {
  category: NewsCategory
  count: number
  maxCount: number
}

function CategoryBar({ category, count, maxCount }: CategoryBarProps) {
  const percentage = (count / maxCount) * 100
  const color = CATEGORY_COLORS[category]

  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-xs text-zinc-600 dark:text-zinc-300 capitalize truncate">
        {category}
      </span>
      <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-6 text-xs text-zinc-500 dark:text-zinc-400 text-right">
        {count}
      </span>
    </div>
  )
}
