'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { NewsItem, NewsCategory, NewsStats } from '@/lib/types/news'
import { useNewsStream } from '@/lib/hooks/useNewsStream'
import { generateMockNewsList, generateMockStats } from '@/lib/utils/mockData'
import { NewsPanel } from '@/components/dashboard/NewsPanel'
import { FilterPanel } from '@/components/dashboard/FilterPanel'
import { StatsPanel } from '@/components/dashboard/StatsPanel'
import { ConnectionStatus } from '@/components/dashboard/ConnectionStatus'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ToastProvider, showToast } from '@/components/ui/Toast'

const NewsMap = dynamic(() => import('@/components/map/NewsMap').then(mod => ({ default: mod.NewsMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  ),
})

const ALL_CATEGORIES: NewsCategory[] = [
  'breaking', 'politics', 'sports', 'technology', 'disaster',
  'economy', 'health', 'entertainment', 'science', 'world'
]

export default function DashboardPage() {
  const [selectedCategories, setSelectedCategories] = useState<NewsCategory[]>(ALL_CATEGORIES)
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const initialNews = useMemo(() => generateMockNewsList(15), [])
  
  const { newsItems, connectionStatus } = useNewsStream({
    initialItems: initialNews,
    simulateRealtime: true,
    intervalMs: 4000,
    maxItems: 50,
  })

  const filteredNews = useMemo(() => {
    if (selectedCategories.length === 0) return newsItems
    return newsItems.filter(item => selectedCategories.includes(item.category))
  }, [newsItems, selectedCategories])

  const stats: NewsStats = useMemo(() => generateMockStats(newsItems), [newsItems])

  useEffect(() => {
    if (newsItems.length > 0) {
      const latest = newsItems[0]
      if (latest.isBreaking) {
        showToast({
          type: 'error',
          message: `BREAKING: ${latest.title}`,
          duration: 6000,
        })
      }
    }
  }, [newsItems.length])

  const handleCategoryToggle = (category: NewsCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleSelectNews = (news: NewsItem) => {
    setSelectedNewsId(news.id)
  }

  return (
    <ToastProvider>
      <div className="h-screen w-screen overflow-hidden bg-zinc-950 flex flex-col">
        <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-lg font-bold text-white">Global News Map</h1>
            </div>
            <ConnectionStatus status={connectionStatus} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors md:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 relative">
            <NewsMap
              newsItems={filteredNews}
              isDarkMode={isDarkMode}
              onMarkerClick={handleSelectNews}
              selectedNewsId={selectedNewsId}
            />

            <div className="absolute top-4 left-4 z-[1000] bg-zinc-900/90 backdrop-blur-sm rounded-lg p-3 border border-zinc-800">
              <div className="text-xs text-zinc-400 mb-1">Showing</div>
              <div className="text-2xl font-bold text-white">{filteredNews.length}</div>
              <div className="text-xs text-zinc-500">news items</div>
            </div>
          </main>

          <aside
            className={`w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col overflow-hidden transition-all duration-300
                       ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
                       fixed right-0 top-14 bottom-0 md:relative md:top-0 md:translate-x-0 z-[1001]`}
          >
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Filters
              </h2>
              <FilterPanel
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                onSelectAll={() => setSelectedCategories(ALL_CATEGORIES)}
                onClearAll={() => setSelectedCategories([])}
              />
            </div>

            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Statistics
              </h2>
              <StatsPanel stats={stats} />
            </div>

            <div className="flex-1 p-4 overflow-hidden flex flex-col">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                News Feed
              </h2>
              <NewsPanel
                newsItems={filteredNews}
                onSelectNews={handleSelectNews}
                selectedNewsId={selectedNewsId}
                className="flex-1"
              />
            </div>
          </aside>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[1000] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </ToastProvider>
  )
}
