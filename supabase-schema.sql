-- RB Pre-Season Tracker — Supabase Schema
-- Paste this into the Supabase SQL Editor and run it.

-- workout_logs: stores individual exercise data per session
create table if not exists public.workout_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number integer not null,
  exercise_name text not null,
  weight_kg numeric,
  reps integer,
  duration_sec integer,
  logged_at timestamptz default now() not null
);

-- day_completions: marks a day as fully complete
create table if not exists public.day_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number integer not null,
  completed_at timestamptz default now() not null,
  unique(user_id, day_number)
);

-- Row Level Security
alter table public.workout_logs enable row level security;
alter table public.day_completions enable row level security;

create policy "Users can manage own workout logs"
  on public.workout_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage own day completions"
  on public.day_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Indexes
create index if not exists workout_logs_user_day on public.workout_logs(user_id, day_number);
create index if not exists day_completions_user on public.day_completions(user_id);
