export type NewsCategory =
  | 'politics'
  | 'sports'
  | 'technology'
  | 'disaster'
  | 'economy'
  | 'health'
  | 'entertainment'
  | 'science'
  | 'world'
  | 'breaking'

export interface GeoLocation {
  lat: number
  lng: number
  city?: string
  country?: string
  region?: string
}

export interface NewsSource {
  id: string
  name: string
  url?: string
  logo?: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  content?: string
  category: NewsCategory
  location: GeoLocation
  source: NewsSource
  imageUrl?: string
  publishedAt: Date | string
  updatedAt?: Date | string
  url?: string
  isBreaking?: boolean
  relevanceScore?: number
  tags?: string[]
}

export interface NewsFilter {
  categories?: NewsCategory[]
  dateFrom?: Date
  dateTo?: Date
  search?: string
  region?: string
}

export interface NewsStats {
  totalCount: number
  byCategory: Record<NewsCategory, number>
  byRegion: Record<string, number>
  recentCount: number
}

export interface WebSocketMessage {
  type: 'news' | 'update' | 'delete' | 'stats' | 'ping' | 'pong'
  payload: NewsItem | NewsItem[] | NewsStats | { id: string }
  timestamp: number
}

export interface ConnectionStatus {
  isConnected: boolean
  isReconnecting: boolean
  lastConnected?: Date
  error?: string
}

export const CATEGORY_COLORS: Record<NewsCategory, string> = {
  politics: '#3B82F6',
  sports: '#10B981',
  technology: '#8B5CF6',
  disaster: '#EF4444',
  economy: '#F59E0B',
  health: '#EC4899',
  entertainment: '#F97316',
  science: '#06B6D4',
  world: '#6366F1',
  breaking: '#DC2626',
}

export const CATEGORY_ICONS: Record<NewsCategory, string> = {
  politics: 'landmark',
  sports: 'trophy',
  technology: 'cpu',
  disaster: 'alert-triangle',
  economy: 'trending-up',
  health: 'heart-pulse',
  entertainment: 'film',
  science: 'flask-conical',
  world: 'globe',
  breaking: 'zap',
}

export interface DashboardPanel {
  id: string
  type: 'map' | 'news-feed' | 'filters' | 'stats'
  title: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

export interface DashboardLayout {
  panels: DashboardPanel[]
  columns: number
  rowHeight: number
}

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}
