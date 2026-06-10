import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { WORKOUTS } from '../data/workouts'
import { useWorkoutData } from '../hooks/useWorkoutData'

const PHASE_COLORS = {
  Foundation: '#1A3A5C',
  Development: '#2A2A0A',
  Peak: '#3A1A1A',
}

function InjuryBadge({ flag }) {
  if (!flag) return null
  const config = {
    shoulder: { label: 'SHOULDER', color: '#EF4444' },
    elbow: { label: 'ELBOW', color: '#F59E0B' },
    rehab: { label: 'REHAB', color: '#22C55E' },
  }
  const c = config[flag]
  if (!c) return null
  return (
    <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: c.color + '22', color: c.color }}>
      {c.label}
    </span>
  )
}

export default function TrackerScreen() {
  const navigate = useNavigate()
  const { isDayComplete } = useWorkoutData()
  const todayRef = useRef(null)

  const completedCount = WORKOUTS.filter(w => isDayComplete(w.day)).length
  const currentDay = Math.min(completedCount + 1, 60)

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  return (
    <div className="pb-20" style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <div className="px-4 pt-6 pb-3">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: '#F5F5F5' }}>TRACKER</h1>
        <p className="text-xs mt-1" style={{ color: '#888' }}>{completedCount} of 60 days complete</p>
      </div>

      <div className="px-4 space-y-2">
        {WORKOUTS.map(day => {
          const complete = isDayComplete(day.day)
          const isCurrent = day.day === currentDay
          const isRest = day.isRest

          return (
            <div
              key={day.day}
              ref={isCurrent ? todayRef : null}
              onClick={() => !isRest && navigate(`/day/${day.day}`)}
              className="relative rounded overflow-hidden"
              style={{
                background: isRest ? '#0F0F0F' : complete ? '#111111' : '#111111',
                border: isCurrent ? '1px solid #C8A900' : complete ? '1px solid #222' : '1px solid #1A1A1A',
                opacity: complete && !isCurrent ? 0.65 : 1,
                cursor: isRest ? 'default' : 'pointer',
              }}
            >
              {/* Phase color strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: PHASE_COLORS[day.phase] || '#1A1A1A' }} />

              <div className="flex items-center pl-4 pr-3 py-3 gap-3">
                {/* Day number */}
                <div className="min-w-[44px]">
                  <div className="text-2xl font-black leading-none" style={{ color: isCurrent ? '#C8A900' : complete ? '#555' : '#F5F5F5' }}>
                    {day.day}
                  </div>
                  <div className="text-xs" style={{ color: '#555' }}>DAY</div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold tracking-wide mb-0.5" style={{ color: '#888' }}>
                    WK {day.week} — {day.phase.toUpperCase()}
                  </div>
                  <div className="text-sm font-bold truncate" style={{ color: isRest ? '#555' : '#F5F5F5' }}>
                    {isRest ? 'REST DAY' : day.sessionType}
                  </div>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  {complete ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#22C55E22' }}>
                      <span className="text-lg" style={{ color: '#22C55E' }}>✓</span>
                    </div>
                  ) : isCurrent ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#C8A90022', border: '1px solid #C8A900' }}>
                      <span className="text-xs font-bold" style={{ color: '#C8A900' }}>→</span>
                    </div>
                  ) : isRest ? (
                    <div className="text-xs font-bold" style={{ color: '#555' }}>ZZZ</div>
                  ) : (
                    <div className="w-8 h-8 rounded-full" style={{ border: '1px solid #333' }} />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
