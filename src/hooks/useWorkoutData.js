import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

const LS_COMPLETIONS = 'rb_completions'
const LS_LOGS = 'rb_logs'

function getLocalCompletions() {
  try { return JSON.parse(localStorage.getItem(LS_COMPLETIONS) || '{}') } catch { return {} }
}
function getLocalLogs() {
  try { return JSON.parse(localStorage.getItem(LS_LOGS) || '{}') } catch { return {} }
}
function setLocalCompletions(data) {
  localStorage.setItem(LS_COMPLETIONS, JSON.stringify(data))
}
function setLocalLogs(data) {
  localStorage.setItem(LS_LOGS, JSON.stringify(data))
}

export function useWorkoutData() {
  const { user } = useAuth()
  const [completions, setCompletions] = useState(getLocalCompletions)
  const [logs, setLogs] = useState(getLocalLogs)
  const [syncing, setSyncing] = useState(false)

  // Sync from Supabase on login
  useEffect(() => {
    if (!user || !isSupabaseConfigured) return
    syncFromSupabase()
  }, [user])

  async function syncFromSupabase() {
    setSyncing(true)
    try {
      const [{ data: compData }, { data: logData }] = await Promise.all([
        supabase.from('day_completions').select('day_number, completed_at').eq('user_id', user.id),
        supabase.from('workout_logs').select('*').eq('user_id', user.id),
      ])

      const compMap = {}
      compData?.forEach(c => { compMap[c.day_number] = c.completed_at })

      const logMap = {}
      logData?.forEach(l => {
        if (!logMap[l.day_number]) logMap[l.day_number] = []
        logMap[l.day_number].push(l)
      })

      setCompletions(compMap)
      setLogs(logMap)
      setLocalCompletions(compMap)
      setLocalLogs(logMap)
    } catch (e) {
      console.error('Sync failed:', e)
    } finally {
      setSyncing(false)
    }
  }

  const markDayComplete = useCallback(async (dayNumber) => {
    const now = new Date().toISOString()
    const updated = { ...completions, [dayNumber]: now }
    setCompletions(updated)
    setLocalCompletions(updated)

    if (user && isSupabaseConfigured) {
      await supabase.from('day_completions').upsert(
        { user_id: user.id, day_number: dayNumber, completed_at: now },
        { onConflict: 'user_id,day_number' }
      )
    }
  }, [completions, user])

  const saveSessionLog = useCallback(async (dayNumber, exerciseLogs) => {
    const now = new Date().toISOString()
    const updated = { ...logs, [dayNumber]: exerciseLogs }
    setLogs(updated)
    setLocalLogs(updated)

    if (user && isSupabaseConfigured) {
      const rows = exerciseLogs.map(ex => ({
        user_id: user.id,
        day_number: dayNumber,
        exercise_name: ex.name,
        weight_kg: ex.weight_kg || null,
        reps: ex.reps || null,
        duration_sec: ex.duration_sec || null,
        logged_at: now,
      }))
      await supabase.from('workout_logs').insert(rows)
    }

    await markDayComplete(dayNumber)
  }, [logs, user, markDayComplete])

  const isDayComplete = useCallback((dayNumber) => !!completions[dayNumber], [completions])

  const getStreak = useCallback(() => {
    let streak = 0
    const today = new Date()
    for (let i = 1; i <= 60; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - (streak))
      if (completions[i]) streak++
      else break
    }
    // simpler: count consecutive from end of completed days
    const completedDays = Object.keys(completions).map(Number).sort((a, b) => b - a)
    if (!completedDays.length) return 0
    let s = 0
    let expected = completedDays[0]
    for (const d of completedDays) {
      if (d === expected) { s++; expected-- } else break
    }
    return s
  }, [completions])

  const getDayLogs = useCallback((dayNumber) => logs[dayNumber] || [], [logs])

  const getExerciseHistory = useCallback((exerciseName) => {
    const history = []
    Object.entries(logs).forEach(([day, dayLogs]) => {
      if (!Array.isArray(dayLogs)) return
      dayLogs.forEach(log => {
        if (log.name === exerciseName || log.exercise_name === exerciseName) {
          history.push({ day: Number(day), ...log })
        }
      })
    })
    return history.sort((a, b) => a.day - b.day)
  }, [logs])

  return {
    completions,
    logs,
    syncing,
    markDayComplete,
    saveSessionLog,
    isDayComplete,
    getStreak,
    getDayLogs,
    getExerciseHistory,
    syncFromSupabase,
  }
}
