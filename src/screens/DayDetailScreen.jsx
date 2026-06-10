import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WORKOUTS } from '../data/workouts'
import { useWorkoutData } from '../hooks/useWorkoutData'

function InjuryBadge({ flag }) {
  if (!flag) return null
  const map = {
    shoulder: { emoji: '🔴', label: 'SHOULDER', bg: '#EF444422', color: '#EF4444' },
    elbow: { emoji: '🟡', label: 'ELBOW', bg: '#F59E0B22', color: '#F59E0B' },
    rehab: { emoji: '🟢', label: 'REHAB', bg: '#22C55E22', color: '#22C55E' },
  }
  const m = map[flag]
  if (!m) return null
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded" style={{ background: m.bg, color: m.color }}>
      {m.emoji} {m.label}
    </span>
  )
}

function ExerciseCard({ exercise, value, onChange, previousLog }) {
  const [cueOpen, setCueOpen] = useState(false)

  const handleInput = (field, val) => {
    onChange({ ...value, [field]: val })
  }

  return (
    <div className="rounded p-4 space-y-3" style={{ background: '#111111', border: '1px solid #1A1A1A' }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="font-bold text-sm" style={{ color: '#F5F5F5' }}>{exercise.name}</div>
          <div className="text-xs mt-0.5" style={{ color: '#888' }}>
            {exercise.sets} × {exercise.reps} · Rest {exercise.rest}
          </div>
        </div>
        <InjuryBadge flag={exercise.injuryFlag} />
      </div>

      {/* Coaching cue */}
      <div>
        <button
          onClick={() => setCueOpen(o => !o)}
          className="text-xs flex items-center gap-1"
          style={{ color: '#C8A900' }}
        >
          {cueOpen ? '▼' : '▶'} COACHING CUE
        </button>
        {cueOpen && (
          <p className="mt-1 text-xs leading-relaxed" style={{ color: '#888' }}>{exercise.cue}</p>
        )}
      </div>

      {/* Log inputs */}
      <div className="flex gap-2">
        {exercise.inputType === 'weight' && (
          <>
            <div className="flex-1">
              <label className="text-xs block mb-1" style={{ color: '#555' }}>WEIGHT (kg)</label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={value?.weight_kg || ''}
                onChange={e => handleInput('weight_kg', e.target.value)}
                className="w-full px-3 py-2 rounded text-sm outline-none"
                style={{ background: '#1A1A1A', color: '#F5F5F5', border: '1px solid #333' }}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs block mb-1" style={{ color: '#555' }}>REPS</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={value?.reps || ''}
                onChange={e => handleInput('reps', e.target.value)}
                className="w-full px-3 py-2 rounded text-sm outline-none"
                style={{ background: '#1A1A1A', color: '#F5F5F5', border: '1px solid #333' }}
              />
            </div>
          </>
        )}
        {exercise.inputType === 'reps' && (
          <div className="flex-1">
            <label className="text-xs block mb-1" style={{ color: '#555' }}>REPS COMPLETED</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={value?.reps || ''}
              onChange={e => handleInput('reps', e.target.value)}
              className="w-full px-3 py-2 rounded text-sm outline-none"
              style={{ background: '#1A1A1A', color: '#F5F5F5', border: '1px solid #333' }}
            />
          </div>
        )}
        {exercise.inputType === 'duration' && (
          <div className="flex-1">
            <label className="text-xs block mb-1" style={{ color: '#555' }}>DURATION (sec)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={value?.duration_sec || ''}
              onChange={e => handleInput('duration_sec', e.target.value)}
              className="w-full px-3 py-2 rounded text-sm outline-none"
              style={{ background: '#1A1A1A', color: '#F5F5F5', border: '1px solid #333' }}
            />
          </div>
        )}
      </div>

      {/* Previous log */}
      {previousLog && (
        <div className="text-xs" style={{ color: '#555' }}>
          Last: {previousLog.weight_kg ? `${previousLog.weight_kg}kg` : ''} {previousLog.reps ? `${previousLog.reps} reps` : ''} {previousLog.duration_sec ? `${previousLog.duration_sec}s` : ''}
        </div>
      )}
    </div>
  )
}

export default function DayDetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dayNum = parseInt(id)
  const day = WORKOUTS[dayNum - 1]
  const { isDayComplete, markDayComplete, saveSessionLog, getDayLogs } = useWorkoutData()

  const [logs, setLogs] = useState(() => {
    const initial = {}
    day?.exercises.forEach(ex => { initial[ex.name] = {} })
    return initial
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!day) return <div className="p-6 text-center" style={{ color: '#888' }}>Day not found.</div>

  const complete = isDayComplete(dayNum)
  const prevLogs = getDayLogs(dayNum)

  const prevLogMap = {}
  prevLogs.forEach(l => { prevLogMap[l.name || l.exercise_name] = l })

  if (day.isRest) {
    return (
      <div className="pb-20 min-h-screen" style={{ background: '#0A0A0A' }}>
        <div className="px-4 pt-6 pb-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} style={{ color: '#888' }}>←</button>
          <div>
            <div className="text-xs tracking-widest" style={{ color: '#888' }}>WEEK {day.week} — {day.phase.toUpperCase()}</div>
            <h1 className="text-xl font-black" style={{ color: '#F5F5F5' }}>DAY {dayNum} — REST</h1>
          </div>
        </div>
        <div className="px-4">
          <div className="rounded p-6 text-center" style={{ background: '#111111' }}>
            <div className="text-4xl mb-3">💤</div>
            <div className="font-black text-xl mb-2" style={{ color: '#F5F5F5' }}>REST DAY</div>
            <p className="text-sm" style={{ color: '#888' }}>Recovery is training. Sleep 8+ hours. Hydrate. Let the adaptation happen.</p>
            {!complete && (
              <button
                onClick={async () => { await markDayComplete(dayNum); setSaved(true) }}
                className="mt-4 px-6 py-3 font-bold tracking-widest text-sm rounded"
                style={{ background: '#1A3A5C', color: '#F5F5F5' }}
              >
                {saved ? '✓ MARKED COMPLETE' : 'MARK REST DAY DONE'}
              </button>
            )}
            {complete && <div className="mt-4 font-bold text-sm" style={{ color: '#22C55E' }}>✓ COMPLETE</div>}
          </div>
        </div>
      </div>
    )
  }

  async function handleSave() {
    setSaving(true)
    const exerciseLogs = day.exercises.map(ex => ({
      name: ex.name,
      ...logs[ex.name],
    }))
    await saveSessionLog(dayNum, exerciseLogs)
    setSaving(false)
    setSaved(true)
  }

  async function handleMarkComplete() {
    await markDayComplete(dayNum)
    setSaved(true)
  }

  return (
    <div className="pb-28 min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-start gap-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
        <button onClick={() => navigate(-1)} className="mt-1" style={{ color: '#888' }}>←</button>
        <div>
          <div className="text-xs tracking-widest" style={{ color: '#C8A900' }}>WEEK {day.week} — {day.phase.toUpperCase()}</div>
          <h1 className="text-xl font-black leading-tight" style={{ color: '#F5F5F5' }}>DAY {dayNum}</h1>
          <p className="text-sm mt-0.5" style={{ color: '#888' }}>{day.sessionType}</p>
        </div>
        {complete && (
          <div className="ml-auto mt-1 text-sm font-bold" style={{ color: '#22C55E' }}>✓ DONE</div>
        )}
      </div>

      {/* Phase key points */}
      <div className="px-4 py-4">
        <div className="rounded p-4" style={{ background: '#111111', borderLeft: '3px solid #1A3A5C' }}>
          <div className="text-xs font-bold tracking-widest mb-2" style={{ color: '#888' }}>PHASE NOTES — {day.phase.toUpperCase()}</div>
          <ul className="space-y-1">
            {day.phaseKeyPoints.map((pt, i) => (
              <li key={i} className="text-xs flex gap-2" style={{ color: '#F5F5F5' }}>
                <span style={{ color: '#C8A900' }}>—</span> {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exercises */}
      <div className="px-4 space-y-3">
        <div className="text-xs font-bold tracking-widest" style={{ color: '#555' }}>EXERCISES</div>
        {day.exercises.map(ex => (
          <ExerciseCard
            key={ex.name}
            exercise={ex}
            value={logs[ex.name] || {}}
            onChange={val => setLogs(prev => ({ ...prev, [ex.name]: val }))}
            previousLog={prevLogMap[ex.name]}
          />
        ))}
      </div>

      {/* Save buttons */}
      {!saved && !complete && (
        <div className="fixed bottom-16 left-0 right-0 px-4 py-3 flex gap-3" style={{ background: '#0A0A0A', borderTop: '1px solid #1A1A1A' }}>
          <button
            onClick={handleMarkComplete}
            className="flex-1 py-3 text-sm font-bold rounded tracking-wide"
            style={{ background: '#1A1A1A', color: '#888', border: '1px solid #333' }}
          >
            MARK DONE (NO LOG)
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 text-sm font-black rounded tracking-widest"
            style={{ background: '#C8A900', color: '#0A0A0A', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'SAVING...' : 'SAVE SESSION'}
          </button>
        </div>
      )}
      {(saved || complete) && (
        <div className="fixed bottom-16 left-0 right-0 px-4 py-3" style={{ background: '#0A0A0A', borderTop: '1px solid #1A1A1A' }}>
          <div className="text-center font-bold text-sm py-3 rounded" style={{ background: '#22C55E22', color: '#22C55E', border: '1px solid #22C55E44' }}>
            ✓ SESSION COMPLETE — STAY HARD
          </div>
        </div>
      )}
    </div>
  )
}
