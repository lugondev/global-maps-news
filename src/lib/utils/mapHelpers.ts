import { NewsCategory, CATEGORY_COLORS } from '@/lib/types/news'
import L from 'leaflet'

export function createMarkerIcon(category: NewsCategory, isBreaking = false): L.DivIcon {
  const color = CATEGORY_COLORS[category]
  const size = isBreaking ? 16 : 12
  const pulseClass = isBreaking ? 'animate-pulse' : ''

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative ${pulseClass}">
        <div 
          class="rounded-full border-2 border-white shadow-lg"
          style="
            width: ${size}px; 
            height: ${size}px; 
            background-color: ${color};
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "
        ></div>
        ${isBreaking ? `
          <div 
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"
          ></div>
        ` : ''}
      </div>
    `,
    iconSize: [size + 4, size + 4],
    iconAnchor: [(size + 4) / 2, (size + 4) / 2],
    popupAnchor: [0, -size / 2],
  })
}

export const DEFAULT_MAP_CENTER: L.LatLngExpression = [20, 0]
export const DEFAULT_MAP_ZOOM = 2

export const MAP_TILE_DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
export const MAP_TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lng).toFixed(2)}°${lngDir}`
}

export function calculateBounds(coordinates: Array<{ lat: number; lng: number }>): L.LatLngBounds | null {
  if (coordinates.length === 0) return null
  
  const lats = coordinates.map(c => c.lat)
  const lngs = coordinates.map(c => c.lng)
  
  return L.latLngBounds(
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)]
  )
}
