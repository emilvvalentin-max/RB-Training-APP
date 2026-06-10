import { useNavigate } from 'react-router-dom'
import { QUOTES, WORKOUTS } from '../data/workouts'
import { useWorkoutData } from '../hooks/useWorkoutData'

function AthleteIllustration() {
  return (
    <svg viewBox="0 0 300 280" className="w-full max-w-xs mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground */}
      <line x1="30" y1="260" x2="270" y2="260" stroke="#333" strokeWidth="2"/>
      {/* Runner silhouette — geometric stencil art */}
      {/* Torso */}
      <rect x="135" y="100" width="30" height="55" rx="3" fill="#F5F5F5" opacity="0.9"/>
      {/* Head */}
      <ellipse cx="150" cy="82" rx="18" ry="20" fill="#F5F5F5"/>
      {/* Neck */}
      <rect x="145" y="98" width="10" height="8" fill="#F5F5F5"/>
      {/* Left arm — pumping back */}
      <line x1="135" y1="108" x2="100" y2="140" stroke="#F5F5F5" strokeWidth="10" strokeLinecap="round"/>
      <line x1="100" y1="140" x2="112" y2="165" stroke="#F5F5F5" strokeWidth="8" strokeLinecap="round"/>
      {/* Right arm — driving forward */}
      <line x1="165" y1="108" x2="198" y2="120" stroke="#F5F5F5" strokeWidth="10" strokeLinecap="round"/>
      <line x1="198" y1="120" x2="210" y2="100" stroke="#F5F5F5" strokeWidth="8" strokeLinecap="round"/>
      {/* Hips */}
      <rect x="132" y="150" width="36" height="18" rx="3" fill="#F5F5F5" opacity="0.85"/>
      {/* Left leg — drive phase */}
      <line x1="145" y1="168" x2="120" y2="210" stroke="#F5F5F5" strokeWidth="12" strokeLinecap="round"/>
      <line x1="120" y1="210" x2="108" y2="258" stroke="#F5F5F5" strokeWidth="10" strokeLinecap="round"/>
      {/* Right leg — power phase */}
      <line x1="158" y1="168" x2="175" y2="205" stroke="#F5F5F5" strokeWidth="12" strokeLinecap="round"/>
      <line x1="175" y1="205" x2="200" y2="240" stroke="#F5F5F5" strokeWidth="10" strokeLinecap="round"/>
      {/* Shoe left */}
      <ellipse cx="105" cy="260" rx="18" ry="6" fill="#C8A900"/>
      {/* Shoe right */}
      <ellipse cx="203" cy="242" rx="16" ry="6" fill="#C8A900"/>
      {/* Speed lines */}
      <line x1="60" y1="130" x2="90" y2="130" stroke="#C8A900" strokeWidth="2" opacity="0.6"/>
      <line x1="50" y1="145" x2="85" y2="145" stroke="#C8A900" strokeWidth="1.5" opacity="0.4"/>
      <line x1="65" y1="160" x2="88" y2="160" stroke="#C8A900" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { isDayComplete, getStreak } = useWorkoutData()

  // Determine current program day based on first completion or day 1
  const completedDays = WORKOUTS.filter(w => isDayComplete(w.day))
  const currentDayNum = Math.min(completedDays.length + 1, 60)
  const today = WORKOUTS[currentDayNum - 1]
  const streak = getStreak()

  const quoteIndex = (currentDayNum - 1) % 60
  const quote = QUOTES[quoteIndex]

  const todayComplete = isDayComplete(currentDayNum)

  return (
    <div className="flex flex-col min-h-full pb-20" style={{ background: '#0A0A0A' }}>
      {/* Not-done banner */}
      {!todayComplete && (
        <div className="flex items-center gap-2 px-4 py-3 text-sm font-bold tracking-wide" style={{ background: '#1A3A5C', color: '#F5F5F5' }}>
          <span style={{ color: '#C8A900' }}>●</span>
          Day {currentDayNum} not done yet. Stay hard.
        </div>
      )}

      {/* Hero section */}
      <div className="flex flex-col items-center px-6 pt-8 pb-4">
        <AthleteIllustration />

        {/* STAY HARD masthead */}
        <div className="mt-4 text-center">
          <div className="text-5xl font-black tracking-tighter leading-none" style={{ color: '#C8A900' }}>STAY HARD</div>
          <div className="text-xs tracking-widest mt-1" style={{ color: '#555' }}>RB PRE-SEASON TRACKER</div>
        </div>
      </div>

      {/* Day / Week info */}
      <div className="px-4 py-4">
        <div className="rounded p-4 flex items-center justify-between" style={{ background: '#111111' }}>
          <div>
            <div className="text-4xl font-black leading-none" style={{ color: '#F5F5F5' }}>DAY {currentDayNum}</div>
            <div className="text-sm mt-1" style={{ color: '#888' }}>WEEK {today?.week} — <span style={{ color: '#C8A900' }}>{today?.phase?.toUpperCase()}</span></div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black" style={{ color: '#C8A900' }}>{streak}</div>
            <div className="text-xs tracking-wide" style={{ color: '#888' }}>DAY STREAK</div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="px-4 py-2">
        <div className="rounded p-4" style={{ background: '#111111', borderLeft: '3px solid #C8A900' }}>
          <p className="text-sm font-bold leading-relaxed" style={{ color: '#F5F5F5' }}>"{quote}"</p>
          <p className="text-xs mt-2 tracking-widest" style={{ color: '#C8A900' }}>— DAY {currentDayNum} OF 60</p>
        </div>
      </div>

      {/* Session type */}
      <div className="px-4 py-2">
        <div className="rounded p-4" style={{ background: '#1A1A1A' }}>
          <div className="text-xs tracking-widest mb-1" style={{ color: '#888' }}>TODAY'S SESSION</div>
          <div className="font-bold text-base" style={{ color: '#F5F5F5' }}>{today?.sessionType || '—'}</div>
          {todayComplete && (
            <div className="mt-2 text-xs font-bold tracking-wide" style={{ color: '#22C55E' }}>✓ COMPLETED</div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-4 mt-auto">
        <button
          onClick={() => navigate(`/day/${currentDayNum}`)}
          className="w-full py-4 font-black tracking-widest text-sm rounded"
          style={{ background: '#C8A900', color: '#0A0A0A' }}
        >
          GO TO TODAY →
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 pb-4">
        <div className="flex justify-between text-xs mb-1" style={{ color: '#555' }}>
          <span>PROGRAM PROGRESS</span>
          <span>{completedDays.length}/60</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1A1A1A' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(completedDays.length / 60) * 100}%`, background: '#C8A900' }}
          />
        </div>
      </div>
    </div>
  )
}
