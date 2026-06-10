import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import { isSupabaseConfigured } from './lib/supabase'
import { useAuth } from './lib/AuthContext'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import TrackerScreen from './screens/TrackerScreen'
import DayDetailScreen from './screens/DayDetailScreen'
import MetricsScreen from './screens/MetricsScreen'
import NutritionScreen from './screens/NutritionScreen'
import BottomNav from './components/BottomNav'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="text-2xl font-black tracking-widest" style={{ color: '#C8A900' }}>LOADING...</div>
      </div>
    )
  }

  if (isSupabaseConfigured && !user) {
    return <AuthScreen />
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100svh' }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/tracker" element={<TrackerScreen />} />
        <Route path="/day/:id" element={<DayDetailScreen />} />
        <Route path="/metrics" element={<MetricsScreen />} />
        <Route path="/nutrition" element={<NutritionScreen />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
