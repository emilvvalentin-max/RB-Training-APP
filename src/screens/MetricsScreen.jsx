import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TRACKED_EXERCISES } from '../data/workouts'
import { useWorkoutData } from '../hooks/useWorkoutData'

const INJURY_REMINDERS = [
  {
    flag: 'shoulder',
    color: '#EF4444',
    title: '🔴 SHOULDER PROTOCOL',
    points: [
      'No behind-the-neck pressing or pulling',
      'Overhead press replaced with landmine press',
      'Band external rotation 3×15 every upper body session',
      'Face pulls and Y-T-W before any pressing',
      'If pain > 3/10 on a pushing movement — stop and sub',
    ],
  },
  {
    flag: 'elbow',
    color: '#F59E0B',
    title: '🟡 ELBOW PROTOCOL',
    points: [
      'Tyler Twist eccentric rehab Days 1, 4, 5 every week',
      'Reduce grip load if lateral epicondyle pain flares',
      'Use straps on deadlift variations if needed',
      'No forced reps on rows or pulldowns',
      'Monitor after every gripping session — note any aching',
    ],
  },
]

const COACHING_TIPS = [
  {
    phase: 'Foundation (Weeks 1–3)',
    color: '#1A3A5C',
    tips: [
      'Every lift at 60–70% 1RM — build patterns, not just load',
      'Log every session: this data becomes your baseline',
      'Shoulder and elbow rehab is not optional. It is training.',
      'Tempo runs should feel easy. You are building a base.',
    ],
  },
  {
    phase: 'Development (Weeks 4–6)',
    color: '#2A5C1A',
    tips: [
      'Load increases — but only if your form survived Foundation',
      'Plyometric volume doubles. Land like a cat, explode like a spring.',
      'Intervals are meant to be uncomfortable. Lean into it.',
      'Sleep deprivation kills adaptation. Guard your recovery.',
    ],
  },
  {
    phase: 'Peak (Weeks 7–8)',
    color: '#5C1A1A',
    tips: [
      'Taper to 3 sets — fatigue management is performance',
      'No new exercises. No experiments. Execute what you have built.',
      'Game-speed conditioning: every rep at true position speed',
      'Mental rehearsal counts. Visualize your first carry.',
    ],
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded px-3 py-2 text-xs" style={{ background: '#1A1A1A', border: '1px solid #333', color: '#F5F5F5' }}>
        <p className="font-bold">Day {label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: '#C8A900' }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function MetricsScreen() {
  const { getExerciseHistory } = useWorkoutData()
  const [selectedExercise, setSelectedExercise] = useState(TRACKED_EXERCISES[0])
  const [chartType, setChartType] = useState('line')
  const [openTip, setOpenTip] = useState(null)
  const [openInjury, setOpenInjury] = useState(null)

  const history = getExerciseHistory(selectedExercise)
  const chartData = history.map(h => ({
    day: h.day,
    weight: h.weight_kg ? parseFloat(h.weight_kg) : null,
    reps: h.reps ? parseInt(h.reps) : null,
  })).filter(d => d.weight !== null || d.reps !== null)

  const bestWeight = Math.max(0, ...chartData.map(d => d.weight || 0))
  const totalSessions = chartData.length
  const lastLogged = history.length ? `Day ${history[history.length - 1].day}` : '—'

  return (
    <div className="pb-20 min-h-screen" style={{ background: '#0A0A0A' }}>
      <div className="px-4 pt-6 pb-3">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: '#F5F5F5' }}>METRICS</h1>
        <p className="text-xs mt-1" style={{ color: '#888' }}>Track your progression</p>
      </div>

      {/* Exercise selector */}
      <div className="px-4 mb-4">
        <select
          value={selectedExercise}
          onChange={e => setSelectedExercise(e.target.value)}
          className="w-full px-3 py-3 rounded text-sm font-bold outline-none appearance-none"
          style={{ background: '#111111', color: '#F5F5F5', border: '1px solid #333' }}
        >
          {TRACKED_EXERCISES.map(ex => (
            <option key={ex} value={ex}>{ex}</option>
          ))}
        </select>
      </div>

      {/* Chart type toggle */}
      <div className="px-4 mb-4 flex gap-2">
        {['line', 'bar'].map(type => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className="flex-1 py-2 text-xs font-bold rounded tracking-widest"
            style={{
              background: chartType === type ? '#C8A900' : '#111111',
              color: chartType === type ? '#0A0A0A' : '#888',
              border: '1px solid #333',
            }}
          >
            {type === 'line' ? 'LINE (WEIGHT)' : 'BAR (REPS)'}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="px-4 mb-4">
        <div className="rounded p-4" style={{ background: '#111111', border: '1px solid #1A1A1A' }}>
          {chartData.length === 0 ? (
            <div className="text-center py-8 text-sm" style={{ color: '#555' }}>
              No data logged yet for {selectedExercise}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              {chartType === 'line' ? (
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#555', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="weight" stroke="#C8A900" strokeWidth={2} dot={{ fill: '#C8A900', r: 3 }} name="kg" connectNulls />
                </LineChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#555', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="reps" fill="#1A3A5C" name="reps" />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 mb-6 grid grid-cols-3 gap-2">
        {[
          { label: 'BEST WEIGHT', value: bestWeight ? `${bestWeight}kg` : '—' },
          { label: 'SESSIONS', value: totalSessions || '—' },
          { label: 'LAST LOGGED', value: lastLogged },
        ].map(stat => (
          <div key={stat.label} className="rounded p-3 text-center" style={{ background: '#111111' }}>
            <div className="text-lg font-black" style={{ color: '#C8A900' }}>{stat.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#555' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Injury flags */}
      <div className="px-4 mb-4">
        <div className="text-xs font-bold tracking-widest mb-2" style={{ color: '#555' }}>INJURY PROTOCOLS</div>
        <div className="space-y-2">
          {INJURY_REMINDERS.map(inj => (
            <div key={inj.flag} className="rounded overflow-hidden" style={{ border: `1px solid ${inj.color}44` }}>
              <button
                onClick={() => setOpenInjury(openInjury === inj.flag ? null : inj.flag)}
                className="w-full px-4 py-3 text-left flex justify-between items-center"
                style={{ background: `${inj.color}11` }}
              >
                <span className="font-bold text-sm" style={{ color: inj.color }}>{inj.title}</span>
                <span style={{ color: inj.color }}>{openInjury === inj.flag ? '▼' : '▶'}</span>
              </button>
              {openInjury === inj.flag && (
                <div className="px-4 pb-3" style={{ background: '#111111' }}>
                  <ul className="space-y-1 mt-2">
                    {inj.points.map((pt, i) => (
                      <li key={i} className="text-xs flex gap-2" style={{ color: '#F5F5F5' }}>
                        <span style={{ color: inj.color }}>—</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phase tips */}
      <div className="px-4 mb-4">
        <div className="text-xs font-bold tracking-widest mb-2" style={{ color: '#555' }}>PHASE COACHING TIPS</div>
        <div className="space-y-2">
          {COACHING_TIPS.map(tip => (
            <div key={tip.phase} className="rounded overflow-hidden" style={{ border: '1px solid #222' }}>
              <button
                onClick={() => setOpenTip(openTip === tip.phase ? null : tip.phase)}
                className="w-full px-4 py-3 text-left flex justify-between items-center"
                style={{ background: tip.color + '33' }}
              >
                <span className="font-bold text-sm" style={{ color: '#F5F5F5' }}>{tip.phase}</span>
                <span style={{ color: '#888' }}>{openTip === tip.phase ? '▼' : '▶'}</span>
              </button>
              {openTip === tip.phase && (
                <div className="px-4 pb-3" style={{ background: '#111111' }}>
                  <ul className="space-y-1 mt-2">
                    {tip.tips.map((t, i) => (
                      <li key={i} className="text-xs flex gap-2" style={{ color: '#F5F5F5' }}>
                        <span style={{ color: '#C8A900' }}>—</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
