import { useState } from 'react'
import { NUTRITION, READINESS_CHECKLIST } from '../data/workouts'

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded overflow-hidden mb-3" style={{ border: '1px solid #1A1A1A' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-4 py-3 flex justify-between items-center text-left"
        style={{ background: '#111111' }}
      >
        <span className="font-bold text-sm" style={{ color: '#F5F5F5' }}>{title}</span>
        <span style={{ color: '#C8A900' }}>{open ? '▼' : '▶'}</span>
      </button>
      {open && <div style={{ background: '#0F0F0F' }}>{children}</div>}
    </div>
  )
}

function ChecklistGroup({ title, items, color }) {
  const [checked, setChecked] = useState({})
  const count = Object.values(checked).filter(Boolean).length
  const total = items.length

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs font-bold tracking-widest" style={{ color }}>{title}</div>
        <div className="text-xs font-bold" style={{ color: count === total ? '#22C55E' : '#888' }}>
          {count}/{total}
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))}
            className="w-full text-left flex gap-3 items-start px-3 py-2 rounded"
            style={{ background: checked[i] ? '#22C55E11' : '#111111', border: `1px solid ${checked[i] ? '#22C55E44' : '#1A1A1A'}` }}
          >
            <div
              className="flex-shrink-0 w-5 h-5 rounded mt-0.5 flex items-center justify-center"
              style={{ background: checked[i] ? '#22C55E' : '#1A1A1A', border: `1px solid ${checked[i] ? '#22C55E' : '#333'}` }}
            >
              {checked[i] && <span className="text-xs font-bold" style={{ color: '#0A0A0A' }}>✓</span>}
            </div>
            <span className="text-xs leading-relaxed" style={{ color: checked[i] ? '#22C55E' : '#F5F5F5' }}>{item}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function NutritionScreen() {
  return (
    <div className="pb-20 min-h-screen" style={{ background: '#0A0A0A' }}>
      <div className="px-4 pt-6 pb-3">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: '#F5F5F5' }}>FUEL & READINESS</h1>
        <p className="text-xs mt-1" style={{ color: '#888' }}>Recomp protocol + Week 9 checklist</p>
      </div>

      <div className="px-4">
        {/* Recomp callout */}
        <div className="rounded p-4 mb-4" style={{ background: '#1A3A5C22', border: '1px solid #1A3A5C' }}>
          <div className="text-xs font-bold tracking-widest mb-1" style={{ color: '#C8A900' }}>GOAL: RECOMPOSITION</div>
          <p className="text-xs leading-relaxed" style={{ color: '#F5F5F5' }}>
            Lose fat, gain muscle simultaneously. At 70–80kg, the priority is getting protein consistently high and timing carbs around training. Track loosely for 2 weeks to calibrate.
          </p>
        </div>

        {/* Daily targets */}
        <Section title="📊 DAILY MACRO TARGETS" defaultOpen>
          <div className="px-4 py-3 space-y-3">
            {NUTRITION.dailyTargets.map(t => (
              <div key={t.macro} className="rounded p-3" style={{ background: '#111111' }}>
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold text-sm" style={{ color: '#C8A900' }}>{t.macro}</div>
                </div>
                <div className="flex gap-4 mb-1">
                  <div>
                    <div className="text-xs" style={{ color: '#555' }}>TRAINING DAY</div>
                    <div className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{t.training}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: '#555' }}>REST DAY</div>
                    <div className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{t.rest}</div>
                  </div>
                </div>
                <div className="text-xs" style={{ color: '#888' }}>{t.sources}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Meal timing */}
        <Section title="⏱ MEAL TIMING (MORNING SESSIONS)">
          <div className="px-4 py-3 space-y-3">
            {NUTRITION.mealTiming.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ background: '#C8A900' }} />
                <div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: '#C8A900' }}>{m.time}</div>
                  <div className="text-xs mb-0.5" style={{ color: '#F5F5F5' }}>{m.detail}</div>
                  <div className="text-xs" style={{ color: '#555' }}>{m.example}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Rules */}
        <Section title="⚡ PRACTICAL RULES">
          <div className="px-4 py-3 space-y-2">
            {NUTRITION.rules.map((r, i) => (
              <div key={i} className="flex gap-2 text-xs" style={{ color: '#F5F5F5' }}>
                <span style={{ color: '#C8A900' }}>—</span> {r}
              </div>
            ))}
          </div>
        </Section>

        {/* Week 9 Readiness Checklist */}
        <div className="mt-2 mb-3">
          <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#555' }}>WEEK 9 READINESS CHECKLIST</div>
          <div className="rounded p-4 mb-3" style={{ background: '#1A1A1A', border: '1px solid #333' }}>
            <p className="text-xs" style={{ color: '#888' }}>
              Use this at the end of Week 8. If you pass 80%+ of these markers — <span style={{ color: '#22C55E', fontWeight: 'bold' }}>you are ready to play.</span>
            </p>
          </div>
          <ChecklistGroup title="PHYSICAL PERFORMANCE" items={READINESS_CHECKLIST.performance} color="#C8A900" />
          <ChecklistGroup title="🔴 SHOULDER READINESS" items={READINESS_CHECKLIST.shoulder} color="#EF4444" />
          <ChecklistGroup title="🟡 ELBOW & FOREARM" items={READINESS_CHECKLIST.elbow} color="#F59E0B" />
          <ChecklistGroup title="GENERAL READINESS" items={READINESS_CHECKLIST.general} color="#888" />
        </div>
      </div>
    </div>
  )
}
