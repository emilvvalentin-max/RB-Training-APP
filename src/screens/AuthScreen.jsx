import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'

export default function AuthScreen() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const fn = mode === 'login' ? signIn : signUp
      const { error: err } = await fn(email, password)
      if (err) setError(err.message)
      else if (mode === 'signup') setMessage('Check your email to confirm your account.')
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0A0A0A' }}>
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl font-black tracking-tighter mb-2" style={{ color: '#C8A900' }}>STAY HARD</div>
          <div className="text-xs tracking-widest mb-8" style={{ color: '#888' }}>RB PRE-SEASON TRACKER</div>
          <div className="rounded p-4 mb-6 text-sm" style={{ background: '#1A3A5C', color: '#F5F5F5' }}>
            <p className="font-bold mb-1">Supabase not configured</p>
            <p style={{ color: '#888' }}>Create a <code className="px-1 rounded text-xs" style={{ background: '#0A0A0A' }}>.env</code> file with your Supabase keys. App will run in offline mode (localStorage only).</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-3 font-bold tracking-widest text-sm rounded"
            style={{ background: '#C8A900', color: '#0A0A0A' }}
          >
            CONTINUE OFFLINE
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0A0A0A' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl font-black tracking-tighter mb-1" style={{ color: '#C8A900' }}>STAY HARD</div>
          <div className="text-xs tracking-widest" style={{ color: '#888' }}>RB PRE-SEASON TRACKER</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none"
            style={{ background: '#1A1A1A', color: '#F5F5F5', border: '1px solid #333' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none"
            style={{ background: '#1A1A1A', color: '#F5F5F5', border: '1px solid #333' }}
          />
          {error && <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>}
          {message && <p className="text-sm" style={{ color: '#22C55E' }}>{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-bold tracking-widest text-sm rounded"
            style={{ background: '#C8A900', color: '#0A0A0A', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '...' : mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <button
          onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
          className="w-full mt-4 py-2 text-sm"
          style={{ color: '#888' }}
        >
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}
