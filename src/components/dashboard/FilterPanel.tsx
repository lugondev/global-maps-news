'use client'

import { NewsCategory, CATEGORY_COLORS } from '@/lib/types/news'

const ALL_CATEGORIES: NewsCategory[] = [
  'breaking', 'politics', 'sports', 'technology', 'disaster',
  'economy', 'health', 'entertainment', 'science', 'world'
]

interface FilterPanelProps {
  selectedCategories: NewsCategory[]
  onCategoryToggle: (category: NewsCategory) => void
  onSelectAll: () => void
  onClearAll: () => void
  className?: string
}

export function FilterPanel({
  selectedCategories,
  onCategoryToggle,
  onSelectAll,
  onClearAll,
  className = ''
}: FilterPanelProps) {
  const allSelected = selectedCategories.length === ALL_CATEGORIES.length
  const noneSelected = selectedCategories.length === 0

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {selectedCategories.length} of {ALL_CATEGORIES.length} selected
        </span>
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            disabled={allSelected}
            className="text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            All
          </button>
          <button
            onClick={onClearAll}
            disabled={noneSelected}
            className="text-xs text-zinc-500 hover:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map(category => {
          const isSelected = selectedCategories.includes(category)
          const color = CATEGORY_COLORS[category]

          return (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all
                         border-2 capitalize
                         ${isSelected
                           ? 'text-white'
                           : 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
              style={{
                backgroundColor: isSelected ? color : 'transparent',
                borderColor: color,
              }}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}
