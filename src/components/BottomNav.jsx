import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'HOME', icon: '⚡' },
  { path: '/tracker', label: 'TRACKER', icon: '📋' },
  { path: '/metrics', label: 'METRICS', icon: '📈' },
  { path: '/nutrition', label: 'FUEL', icon: '🥩' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex" style={{ background: '#111111', borderTop: '1px solid #1A1A1A', zIndex: 50 }}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="relative flex-1 flex flex-col items-center justify-center py-3 gap-0.5"
          style={{
            color: isActive(item.path) ? '#C8A900' : '#555',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span className="text-lg leading-none">{item.icon}</span>
          <span className="text-xs font-bold tracking-widest">{item.label}</span>
          {isActive(item.path) && (
            <div className="absolute bottom-0 w-8 h-0.5" style={{ background: '#C8A900', borderRadius: '1px 1px 0 0' }} />
          )}
        </button>
      ))}
    </nav>
  )
}
