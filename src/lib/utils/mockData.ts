import { NewsItem, NewsCategory, NewsSource, GeoLocation } from '@/lib/types/news'

const NEWS_SOURCES: NewsSource[] = [
  { id: 'reuters', name: 'Reuters', url: 'https://reuters.com' },
  { id: 'bbc', name: 'BBC News', url: 'https://bbc.com/news' },
  { id: 'cnn', name: 'CNN', url: 'https://cnn.com' },
  { id: 'aljazeera', name: 'Al Jazeera', url: 'https://aljazeera.com' },
  { id: 'guardian', name: 'The Guardian', url: 'https://theguardian.com' },
  { id: 'nyt', name: 'New York Times', url: 'https://nytimes.com' },
  { id: 'wsj', name: 'Wall Street Journal', url: 'https://wsj.com' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com' },
]

const LOCATIONS: GeoLocation[] = [
  { lat: 40.7128, lng: -74.006, city: 'New York', country: 'USA', region: 'North America' },
  { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK', region: 'Europe' },
  { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', region: 'Europe' },
  { lat: 35.6762, lng: 139.6503, city: 'Tokyo', country: 'Japan', region: 'Asia' },
  { lat: 39.9042, lng: 116.4074, city: 'Beijing', country: 'China', region: 'Asia' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney', country: 'Australia', region: 'Oceania' },
  { lat: 55.7558, lng: 37.6173, city: 'Moscow', country: 'Russia', region: 'Europe' },
  { lat: 28.6139, lng: 77.209, city: 'New Delhi', country: 'India', region: 'Asia' },
  { lat: -23.5505, lng: -46.6333, city: 'São Paulo', country: 'Brazil', region: 'South America' },
  { lat: 31.2304, lng: 121.4737, city: 'Shanghai', country: 'China', region: 'Asia' },
  { lat: 52.52, lng: 13.405, city: 'Berlin', country: 'Germany', region: 'Europe' },
  { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', country: 'USA', region: 'North America' },
  { lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'Singapore', region: 'Asia' },
  { lat: 41.9028, lng: 12.4964, city: 'Rome', country: 'Italy', region: 'Europe' },
  { lat: 37.5665, lng: 126.978, city: 'Seoul', country: 'South Korea', region: 'Asia' },
  { lat: -34.6037, lng: -58.3816, city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
  { lat: 25.2048, lng: 55.2708, city: 'Dubai', country: 'UAE', region: 'Middle East' },
  { lat: 22.3193, lng: 114.1694, city: 'Hong Kong', country: 'China', region: 'Asia' },
  { lat: 59.3293, lng: 18.0686, city: 'Stockholm', country: 'Sweden', region: 'Europe' },
  { lat: 43.6532, lng: -79.3832, city: 'Toronto', country: 'Canada', region: 'North America' },
]

const CATEGORIES: NewsCategory[] = [
  'politics', 'sports', 'technology', 'disaster', 'economy',
  'health', 'entertainment', 'science', 'world', 'breaking'
]

const NEWS_TEMPLATES: Record<NewsCategory, { titles: string[], summaries: string[] }> = {
  politics: {
    titles: [
      'New Policy Reform Announced',
      'Election Results Shape Future',
      'International Summit Concludes',
      'Parliament Passes Historic Bill',
      'Diplomatic Relations Strengthen',
    ],
    summaries: [
      'Government officials unveiled new policy measures aimed at economic recovery.',
      'Voters turned out in record numbers for the landmark election.',
      'World leaders reached consensus on key global challenges.',
      'The legislation marks a significant shift in national policy.',
      'Bilateral talks resulted in new cooperation agreements.',
    ],
  },
  sports: {
    titles: [
      'Championship Finals Set',
      'Record-Breaking Performance',
      'Transfer Deal Confirmed',
      'Olympic Qualifier Results',
      'Historic Victory Celebrated',
    ],
    summaries: [
      'Top teams advance to the finals after intense semifinals.',
      'Athlete breaks long-standing world record in spectacular fashion.',
      'Major club announces signing of star player in record deal.',
      'Nations secure spots in upcoming Olympic games.',
      'Fans celebrate as underdog team claims unexpected victory.',
    ],
  },
  technology: {
    titles: [
      'AI Breakthrough Announced',
      'Tech Giant Launches New Product',
      'Cybersecurity Alert Issued',
      'Startup Raises Major Funding',
      'Innovation Hub Opens',
    ],
    summaries: [
      'Researchers achieve significant milestone in artificial intelligence.',
      'Company reveals next-generation device at annual event.',
      'Security experts warn of new vulnerability affecting millions.',
      'Venture capital firms invest in promising technology company.',
      'New facility aims to accelerate technological development.',
    ],
  },
  disaster: {
    titles: [
      'Emergency Response Activated',
      'Evacuation Orders Issued',
      'Relief Efforts Underway',
      'Disaster Zone Declared',
      'Recovery Operations Begin',
    ],
    summaries: [
      'Authorities mobilize resources in response to natural disaster.',
      'Residents urged to leave affected areas immediately.',
      'International aid organizations coordinate assistance.',
      'Government declares state of emergency in affected region.',
      'Teams begin assessing damage and providing assistance.',
    ],
  },
  economy: {
    titles: [
      'Markets React to Policy Changes',
      'Economic Growth Exceeds Expectations',
      'Central Bank Adjusts Rates',
      'Trade Agreement Finalized',
      'Industry Report Released',
    ],
    summaries: [
      'Stock indices fluctuate following government announcements.',
      'Quarterly figures show stronger than anticipated expansion.',
      'Monetary policy shifts in response to economic indicators.',
      'Nations complete negotiations on comprehensive trade deal.',
      'Analysis reveals trends in key economic sectors.',
    ],
  },
  health: {
    titles: [
      'Medical Breakthrough Achieved',
      'Health Advisory Issued',
      'Research Study Published',
      'Vaccination Campaign Expands',
      'Healthcare Reform Proposed',
    ],
    summaries: [
      'Scientists develop promising new treatment approach.',
      'Health officials recommend precautionary measures.',
      'Findings reveal important insights into disease prevention.',
      'Immunization efforts reach additional populations.',
      'Lawmakers consider changes to healthcare system.',
    ],
  },
  entertainment: {
    titles: [
      'Award Ceremony Highlights',
      'Box Office Records Broken',
      'Festival Lineup Announced',
      'Streaming Service Expands',
      'Cultural Event Draws Crowds',
    ],
    summaries: [
      'Stars gather for prestigious annual awards show.',
      'Film surpasses expectations in opening weekend.',
      'Organizers reveal performers for upcoming event.',
      'Platform launches in new markets with original content.',
      'Attendees flock to celebrate arts and culture.',
    ],
  },
  science: {
    titles: [
      'Space Mission Succeeds',
      'Climate Research Update',
      'Discovery Changes Understanding',
      'Laboratory Achievement Announced',
      'Environmental Study Released',
    ],
    summaries: [
      'Spacecraft completes objectives in milestone mission.',
      'Scientists present latest findings on environmental changes.',
      'New evidence challenges previous scientific theories.',
      'Researchers accomplish significant experimental goal.',
      'Report details impact of human activity on ecosystems.',
    ],
  },
  world: {
    titles: [
      'International Conference Opens',
      'Cross-Border Initiative Launched',
      'Global Partnership Formed',
      'Regional Tensions Ease',
      'Humanitarian Mission Expands',
    ],
    summaries: [
      'Delegates from around the world convene for discussions.',
      'Multiple nations collaborate on shared challenges.',
      'Organizations unite to address global issues.',
      'Diplomatic efforts lead to reduced conflict.',
      'Aid workers extend reach to additional areas.',
    ],
  },
  breaking: {
    titles: [
      'BREAKING: Major Development',
      'URGENT: Situation Developing',
      'ALERT: Immediate Updates',
      'BREAKING: Critical Announcement',
      'URGENT: Authorities Respond',
    ],
    summaries: [
      'Developing story with significant implications.',
      'Details emerging on rapidly evolving situation.',
      'Officials provide real-time information to public.',
      'Major announcement expected to have wide impact.',
      'Emergency services coordinate immediate response.',
    ],
  },
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateId(): string {
  return `news_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

function addRandomOffset(location: GeoLocation): GeoLocation {
  return {
    ...location,
    lat: location.lat + (Math.random() - 0.5) * 0.5,
    lng: location.lng + (Math.random() - 0.5) * 0.5,
  }
}

export function generateMockNewsItem(category?: NewsCategory): NewsItem {
  const selectedCategory = category || randomItem(CATEGORIES)
  const template = NEWS_TEMPLATES[selectedCategory]
  const location = addRandomOffset(randomItem(LOCATIONS))

  return {
    id: generateId(),
    title: randomItem(template.titles),
    summary: randomItem(template.summaries),
    category: selectedCategory,
    location,
    source: randomItem(NEWS_SOURCES),
    publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    isBreaking: selectedCategory === 'breaking' || Math.random() < 0.1,
    tags: [selectedCategory, location.region || 'Global'].filter(Boolean),
  }
}

export function generateMockNewsList(count: number): NewsItem[] {
  return Array.from({ length: count }, () => generateMockNewsItem())
}

export function generateMockStats(newsItems: NewsItem[]): {
  totalCount: number
  byCategory: Record<NewsCategory, number>
  byRegion: Record<string, number>
  recentCount: number
} {
  const byCategory = {} as Record<NewsCategory, number>
  const byRegion: Record<string, number> = {}
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  let recentCount = 0

  CATEGORIES.forEach(cat => { byCategory[cat] = 0 })

  newsItems.forEach(item => {
    byCategory[item.category] = (byCategory[item.category] || 0) + 1
    const region = item.location.region || 'Unknown'
    byRegion[region] = (byRegion[region] || 0) + 1
    if (new Date(item.publishedAt).getTime() > oneHourAgo) {
      recentCount++
    }
  })

  return {
    totalCount: newsItems.length,
    byCategory,
    byRegion,
    recentCount,
  }
}
