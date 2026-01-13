'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { NewsItem, CATEGORY_COLORS } from '@/lib/types/news'
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  MAP_TILE_DARK,
  MAP_TILE_LIGHT,
  MAP_ATTRIBUTION,
  createMarkerIcon,
} from '@/lib/utils/mapHelpers'
import { NewsMarkerPopup } from './NewsMarkerPopup'
import { createRoot } from 'react-dom/client'

interface NewsMapProps {
  newsItems: NewsItem[]
  isDarkMode?: boolean
  onMarkerClick?: (news: NewsItem) => void
  selectedNewsId?: string | null
  className?: string
}

export function NewsMap({
  newsItems,
  isDarkMode = true,
  onMarkerClick,
  selectedNewsId,
  className = '',
}: NewsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: DEFAULT_MAP_CENTER,
      zoom: DEFAULT_MAP_ZOOM,
      zoomControl: false,
      attributionControl: false,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    tileLayerRef.current = L.tileLayer(isDarkMode ? MAP_TILE_DARK : MAP_TILE_LIGHT, {
      maxZoom: 18,
    }).addTo(map)

    mapRef.current = map
    setIsMapReady(true)

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  }, [])

  useEffect(() => {
    if (!tileLayerRef.current || !mapRef.current) return
    tileLayerRef.current.setUrl(isDarkMode ? MAP_TILE_DARK : MAP_TILE_LIGHT)
  }, [isDarkMode])

  useEffect(() => {
    if (!mapRef.current || !isMapReady) return

    const map = mapRef.current
    const currentMarkers = markersRef.current
    const newMarkerIds = new Set(newsItems.map(n => n.id))

    currentMarkers.forEach((marker, id) => {
      if (!newMarkerIds.has(id)) {
        map.removeLayer(marker)
        currentMarkers.delete(id)
      }
    })

    newsItems.forEach(news => {
      if (currentMarkers.has(news.id)) return

      const marker = L.marker([news.location.lat, news.location.lng], {
        icon: createMarkerIcon(news.category, news.isBreaking),
      })

      const popupContainer = document.createElement('div')
      const root = createRoot(popupContainer)
      root.render(
        <NewsMarkerPopup
          news={news}
          onReadMore={() => onMarkerClick?.(news)}
        />
      )

      marker.bindPopup(popupContainer, {
        maxWidth: 300,
        className: 'news-popup',
      })

      marker.on('click', () => {
        onMarkerClick?.(news)
      })

      marker.addTo(map)
      currentMarkers.set(news.id, marker)

      if (news.isBreaking) {
        const el = marker.getElement()
        if (el) {
          el.style.animation = 'markerPop 0.3s ease-out'
        }
      }
    })
  }, [newsItems, isMapReady, onMarkerClick])

  useEffect(() => {
    if (!mapRef.current || !selectedNewsId) return

    const marker = markersRef.current.get(selectedNewsId)
    if (marker) {
      const latlng = marker.getLatLng()
      mapRef.current.flyTo(latlng, 6, { duration: 0.5 })
      marker.openPopup()
    }
  }, [selectedNewsId])

  const fitToMarkers = useCallback(() => {
    if (!mapRef.current || newsItems.length === 0) return

    const bounds = L.latLngBounds(
      newsItems.map(n => [n.location.lat, n.location.lng] as L.LatLngTuple)
    )
    mapRef.current.fitBounds(bounds, { padding: [50, 50] })
  }, [newsItems])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full rounded-lg overflow-hidden" />
      
      {newsItems.length > 0 && (
        <button
          onClick={fitToMarkers}
          className="absolute bottom-16 right-3 z-[1000] bg-white dark:bg-zinc-800 
                     p-2 rounded-lg shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 
                     transition-colors"
          title="Fit all markers"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      )}

      <div className="absolute bottom-3 left-3 z-[1000] flex gap-2 flex-wrap max-w-[200px]">
        {Object.entries(CATEGORY_COLORS).slice(0, 5).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1 text-xs bg-white/90 dark:bg-zinc-800/90 
                                         px-2 py-1 rounded-full shadow">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="capitalize text-zinc-700 dark:text-zinc-300">{category}</span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .news-popup .leaflet-popup-content-wrapper {
          background: var(--popup-bg, #1f2937);
          color: var(--popup-text, #f3f4f6);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .news-popup .leaflet-popup-tip {
          background: var(--popup-bg, #1f2937);
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        @keyframes markerPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
