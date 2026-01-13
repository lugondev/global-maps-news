# Global News Map

An interactive real-time news visualization dashboard that displays global news events on an interactive map with live updates.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Interactive World Map** - Leaflet-powered map with custom markers for news events
- **Real-time Updates** - Simulated WebSocket stream with live news updates every 4 seconds
- **Category Filtering** - Filter news by category (Politics, Sports, Technology, Disaster, etc.)
- **Country Boundaries** - Hover over countries to see highlighted borders and region names
- **Statistics Dashboard** - Live analytics showing news distribution by category and region
- **News Feed Panel** - Scrollable list of latest news with click-to-locate functionality
- **Dark/Light Theme** - Toggle between dark and light modes
- **Responsive Design** - Works on desktop and mobile devices
- **Breaking News Alerts** - Toast notifications for breaking news

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **Real-time**: [Socket.IO Client](https://socket.io/) (ready for backend integration)
- **Grid Layout**: [Gridstack.js](https://gridstackjs.com/) (available for drag-drop panels)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/global-maps-news.git
cd global-maps-news

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── map/
│   │   ├── NewsMap.tsx     # Leaflet map with markers & country borders
│   │   └── NewsMarkerPopup.tsx
│   ├── dashboard/
│   │   ├── NewsPanel.tsx   # News feed sidebar
│   │   ├── FilterPanel.tsx # Category filters
│   │   ├── StatsPanel.tsx  # Statistics display
│   │   └── ConnectionStatus.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Toast.tsx
│       └── ThemeToggle.tsx
└── lib/
    ├── types/
    │   └── news.ts         # TypeScript interfaces
    ├── hooks/
    │   ├── useNewsStream.ts    # Simulated real-time hook
    │   └── useWebSocket.ts     # Socket.IO integration
    └── utils/
        ├── mockData.ts     # Demo data generator
        └── mapHelpers.ts   # Map utilities
```

## Configuration

### Environment Variables

Create a `.env.local` file for custom configuration:

```env
# WebSocket server URL (optional - uses simulation by default)
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Customization

- **News Categories**: Edit `src/lib/types/news.ts` to add/modify categories
- **Map Tiles**: Change tile providers in `src/lib/utils/mapHelpers.ts`
- **Mock Data**: Customize locations and templates in `src/lib/utils/mockData.ts`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F` | Fit map to all markers |

## API Integration

The app is ready for real WebSocket integration. To connect to a real news API:

1. Set `NEXT_PUBLIC_WS_URL` in environment variables
2. Use the `useWebSocket` hook in `src/lib/hooks/useWebSocket.ts`
3. Expected message format:

```typescript
interface WebSocketMessage {
  type: 'news' | 'update' | 'delete' | 'stats'
  payload: NewsItem | NewsItem[] | NewsStats
  timestamp: number
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Map tiles by [CARTO](https://carto.com/)
- Country boundaries from [Natural Earth](https://www.naturalearthdata.com/)
- Icons inspired by [Lucide](https://lucide.dev/)
