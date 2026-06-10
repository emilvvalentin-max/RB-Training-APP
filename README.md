# RB Pre-Season Tracker

8-week (60-day) American football pre-season training tracker for a Running Back.

## Stack

- React + Vite
- Tailwind CSS v4
- Supabase (auth + cloud sync)
- Recharts (progress charts)
- LocalStorage (offline fallback)

## Setup

### 1. Install dependencies

```bash
cd rb-preseason-tracker
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

If you skip this step, the app runs in **offline mode** (data saved to localStorage only — no auth required).

### 3. Set up Supabase database

In your Supabase project, go to **SQL Editor** and paste + run the contents of `supabase-schema.sql`.

This creates:
- `workout_logs` — individual exercise logging per day
- `day_completions` — tracks which days are marked complete
- Row Level Security so users only access their own data

### 4. Run the dev server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## App Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Home | `/` | Daily quote, streak counter, current day CTA |
| Tracker | `/tracker` | All 60 days — scrollable, tap to open |
| Day Detail | `/day/:id` | Full workout, exercise logging, save session |
| Metrics | `/metrics` | Exercise progression charts + injury protocols |

## Program Structure

- **Weeks 1–3 (Foundation):** 3 sets, 60–70% 1RM, tempo conditioning
- **Weeks 4–6 (Development):** 4 sets, 75–85% 1RM, interval conditioning
- **Weeks 7–8 (Peak):** 3 sets (taper), 80%+ 1RM, game-speed work

Weekly split: Lower Strength / Upper Push / Speed & Agility / Lower Power / Upper Pull / Conditioning / REST

## Injury Flags

- 🔴 **SHOULDER** — monitor all pressing variations
- 🟡 **ELBOW** — gripping movements (deadlifts, rows, pulldowns)
- 🟢 **REHAB** — shoulder rehab, Tyler Twist, mobility work
