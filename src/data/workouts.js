// 60-Day RB Pre-Season Training Plan
// Source: RB_Preseason_8Week_Plan.docx
// Phases: Foundation (Wks 1–3), Development (Wks 4–6), Peak (Wks 7–8)

export const PHASE_KEY_POINTS = {
  Foundation: [
    "Rebuild movement quality — technique over load",
    "All compound lifts at 60–70% 1RM",
    "Shoulder rehab every upper body session — do not skip",
    "Tyler Twist forearm rehab at end of Day 1 every week",
    "Daily mobility warm-up is mandatory — non-negotiable",
    "Conditioning: low-intensity tempo runs to build aerobic base",
  ],
  Development: [
    "Intensity increases to 75–85% 1RM — maintain perfect form under load",
    "Plyometric volume doubles — add depth drops, unilateral bounds",
    "Interval conditioning: 40/20s, shuttle repeats, flying sprints",
    "Shoulder should feel noticeably more stable — continue all rehab",
    "Use lifting straps on all pulling movements",
    "Track times on field sessions — you should be getting faster",
  ],
  Peak: [
    "Maximum sport-specificity — reduce gym volume 20%, shift intensity to field",
    "Compounds at 80%+ 1RM — explosive concentric intent every rep",
    "Game-speed conditioning: 10–15 sec max burst / 35–45 sec rest × 15",
    "Shoulder assessed for contact — continue all rehab every session",
    "No new movements — execute what you have mastered",
    "Arrive at Week 9 feeling explosive and sharp",
  ],
}

// ─── PHASE 1 (Weeks 1–3) ────────────────────────────────────────────────────

const P1_DAY1 = {
  sessionType: "Lower Body Strength + Plyometrics",
  exercises: [
    // Warm-Up
    { name: "Hip 90/90 Rotations", sets: 1, reps: "60 sec/side", rest: "—", cue: "Sit tall, drive knee to floor", type: "warmup", inputType: "duration", injuryFlag: "rehab" },
    { name: "Leg Swings (Fwd + Lateral)", sets: 1, reps: "15 each", rest: "—", cue: "Controlled pendulum, hold wall for balance", type: "warmup", inputType: "reps", injuryFlag: null },
    { name: "Banded Clamshells", sets: 2, reps: "15/side", rest: "30 sec", cue: "Squeeze glute at top, don't rotate pelvis", type: "warmup", inputType: "reps", injuryFlag: "rehab" },
    { name: "Glute Bridges (Bodyweight)", sets: 2, reps: "15", rest: "30 sec", cue: "Drive hips through fully, pause at top", type: "warmup", inputType: "reps", injuryFlag: null },
    { name: "World's Greatest Stretch", sets: 1, reps: "5/side", rest: "—", cue: "Thoracic rotation — reach tall at the top", type: "warmup", inputType: "reps", injuryFlag: "rehab" },
    // Main Work
    { name: "Back Squat", sets: 3, reps: "6", rest: "3 min", cue: "Brace hard, knees track toes, sit into hips — 70% 1RM", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Trap Bar Deadlift", sets: 3, reps: "5", rest: "3 min", cue: "Hinge at hips, neutral spine, explosive drive through floor", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Bulgarian Split Squat", sets: 3, reps: "8/side", rest: "2 min", cue: "Front foot out, keep torso upright, sink deep", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Seated Leg Curl", sets: 3, reps: "12", rest: "90 sec", cue: "Full range, slow eccentric (3 sec)", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Box Jump (Low Box)", sets: 4, reps: "4", rest: "90 sec", cue: "Max intent on jump — land soft and absorb, step down between reps", type: "power", inputType: "reps", injuryFlag: null },
    { name: "Broad Jump", sets: 3, reps: "3", rest: "90 sec", cue: "Swing arms aggressively, stick landing for 2 sec", type: "power", inputType: "reps", injuryFlag: null },
    // Forearm Rehab
    { name: "Tyler Twist — Eccentric Wrist Extension", sets: 3, reps: "15", rest: "60 sec", cue: "Theraband FlexBar or resistance band — slow 4-sec lower is the medicine", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Forearm Stretch (Extended Elbow)", sets: 2, reps: "30 sec/arm", rest: "—", cue: "Palm down, pull fingers back gently", type: "rehab", inputType: "duration", injuryFlag: "rehab" },
  ],
}

const P1_DAY2 = {
  sessionType: "Upper Body Push + Shoulder Rehab",
  exercises: [
    // Warm-Up / Shoulder Rehab (before any loading)
    { name: "Band Pull-Aparts", sets: 3, reps: "20", rest: "30 sec", cue: "Pinch shoulder blades at end range, hold 1 sec", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Face Pulls (Cable, Low Weight)", sets: 3, reps: "15", rest: "45 sec", cue: "Elbows high, pull to ears, external rotate at end range", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Scapular Wall Slides", sets: 2, reps: "12", rest: "30 sec", cue: "Back flat to wall, slide arms up — keep contact throughout", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Prone Y/T/W Raises (Light)", sets: 2, reps: "10 each", rest: "45 sec", cue: "Tiny range — feel mid-back engage, not traps. No shrugging.", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    // Main Work — NO overhead pressing
    { name: "Flat DB Bench Press", sets: 3, reps: "8", rest: "2.5 min", cue: "Controlled descent, drive up explosively, keep shoulder blades packed into bench", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Landmine Press (Kneeling, Bilateral)", sets: 3, reps: "10/side", rest: "2 min", cue: "Drive from shoulder blade, not just arm — excellent shoulder-safe pressing angle", type: "strength", inputType: "weight", injuryFlag: "rehab" },
    { name: "Cable Chest Fly (Low-to-Mid)", sets: 3, reps: "12", rest: "90 sec", cue: "Slight elbow bend, squeeze pecs at centre — avoid going behind body", type: "strength", inputType: "weight", injuryFlag: "shoulder" },
    { name: "Push-Up + Serratus Reach", sets: 3, reps: "10", rest: "90 sec", cue: "At top of push-up, push chest AWAY from floor — activates serratus anterior", type: "strength", inputType: "reps", injuryFlag: "rehab" },
    { name: "Tricep Rope Pushdown", sets: 3, reps: "12", rest: "60 sec", cue: "Elbows locked at sides, full extension at bottom", type: "accessory", inputType: "weight", injuryFlag: null },
    // Shoulder Finisher
    { name: "External Rotation (Cable/Band, Elbow at 90°)", sets: 3, reps: "15/side", rest: "45 sec", cue: "Elbow stays glued to side, rotate outward slowly — feel the rotator cuff work", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Serratus Anterior Punches (Light DB)", sets: 2, reps: "15", rest: "45 sec", cue: "On back, arm vertical — punch ceiling and protract shoulder fully", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
  ],
}

const P1_DAY3 = {
  sessionType: "Speed & Agility (Field)",
  exercises: [
    // Dynamic Warm-Up
    { name: "Hip Circle Walks + High Knees", sets: 1, reps: "20m × 3", rest: "—", cue: "Drive knees up to 90°, stay on balls of feet", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "A-Skips", sets: 1, reps: "20m × 3", rest: "—", cue: "Rhythmic, consistent ground contact — cycle the leg", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "Lateral Shuffle + Crossover Step", sets: 1, reps: "10m × 4", rest: "—", cue: "Stay low, don't cross feet on shuffle portion", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "Build-Up Runs (50% → 70% → 90%)", sets: 3, reps: "30m each", rest: "90 sec", cue: "Accelerate through the full distance — feel velocity build", type: "warmup", inputType: "duration", injuryFlag: null },
    // Speed & Cut Work (Wks 1–3: mechanics focus)
    { name: "5-10-5 Shuttle (Pro Agility)", sets: 6, reps: "1 rep", rest: "2 min", cue: "Plant outside foot hard, drive off instep — chest over toes into the cut", type: "agility", inputType: "duration", injuryFlag: null },
    { name: "L-Drill", sets: 4, reps: "1 rep", rest: "2 min", cue: "Tight turns — reduce radius by leaning into the cut, stay low", type: "agility", inputType: "duration", injuryFlag: null },
    { name: "Lateral Bound → Sprint Transition", sets: 5, reps: "3 bounds + 10m sprint", rest: "2 min", cue: "Bound laterally, plant, explode forward — simulate cut to the gap", type: "speed", inputType: "duration", injuryFlag: null },
    { name: "Backpedal → Break → Sprint", sets: 6, reps: "1 rep", rest: "90 sec", cue: "Eyes up, sink hips in backpedal, snap hips forward on the break", type: "speed", inputType: "duration", injuryFlag: null },
    // Conditioning (Wks 1–3)
    { name: "Tempo Run — 100m @ 65%", sets: 10, reps: "100m", rest: "60 sec walk back", cue: "Consistent pace, relaxed upper body, breathe rhythmically — build the base", type: "conditioning", inputType: "duration", injuryFlag: null },
  ],
}

const P1_DAY4 = {
  sessionType: "Lower Body Power + Posterior Chain",
  exercises: [
    // Warm-Up
    { name: "Romanian DL (Empty Bar / Light)", sets: 2, reps: "10", rest: "—", cue: "Hinge until hamstring tension — this IS mobility work, not a warm-up set", type: "warmup", inputType: "reps", injuryFlag: "rehab" },
    { name: "Hip Thrust (Bodyweight)", sets: 2, reps: "15", rest: "—", cue: "Drive through heel, squeeze glute at top", type: "warmup", inputType: "reps", injuryFlag: null },
    { name: "Ankle Circles + Calf Raises", sets: 1, reps: "15 each way", rest: "—", cue: "Controlled, full range both directions", type: "warmup", inputType: "reps", injuryFlag: null },
    // Main Work
    { name: "Barbell Hip Thrust", sets: 4, reps: "8", rest: "2.5 min", cue: "Bar at hip crease (pad it), full extension at top, pause 1 sec and squeeze", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2 min", cue: "Slow descent (3 sec), feel hamstring stretch, drive hips forward at top", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Single-Leg Press", sets: 3, reps: "10/side", rest: "2 min", cue: "Full depth, drive through heel — mimics the force of a cut", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Nordic Hamstring Curl (Eccentric Only)", sets: 3, reps: "5", rest: "2.5 min", cue: "Lower as slowly as possible (aim 5 sec), catch yourself at bottom — don't rush", type: "strength", inputType: "reps", injuryFlag: null },
    { name: "Sled Push (Moderate Load)", sets: 4, reps: "20m", rest: "2 min", cue: "Stay low, push from hips — drive legs through full extension", type: "conditioning", inputType: "duration", injuryFlag: null },
    { name: "Lateral Band Walks", sets: 3, reps: "15/side", rest: "60 sec", cue: "Tension throughout, slight squat position — feel the glute med working", type: "activation", inputType: "reps", injuryFlag: "rehab" },
  ],
}

const P1_DAY5 = {
  sessionType: "Upper Body Pull + Shoulder Stability",
  exercises: [
    // Warm-Up (same shoulder rehab as Day 2)
    { name: "Band Pull-Aparts", sets: 3, reps: "20", rest: "30 sec", cue: "Full retraction at end, hold 1 sec", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Face Pulls", sets: 3, reps: "15", rest: "45 sec", cue: "Elbows high, external rotation at end range", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Prone Y/T/W", sets: 2, reps: "10 each", rest: "45 sec", cue: "Light — feel mid-traps / lower traps / rhomboids, not upper traps", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    // Main Work — use lifting straps on all pulling
    { name: "Lat Pulldown (Wide Grip, Use Straps)", sets: 4, reps: "10", rest: "2 min", cue: "Pull elbows to ribs, slight lean back — no shrugging at top", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Seated Cable Row (Neutral Grip, Use Straps)", sets: 3, reps: "10", rest: "2 min", cue: "Chest stays tall, row to sternum, squeeze 1 sec at end range", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Single-Arm DB Row (Use Strap)", sets: 3, reps: "10/side", rest: "90 sec", cue: "Brace on bench, row to hip — don't rotate excessively", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Incline Rear Delt Fly", sets: 3, reps: "15", rest: "90 sec", cue: "Light weight — feel posterior delt, not traps. Slight bend in elbow.", type: "accessory", inputType: "weight", injuryFlag: "rehab" },
    { name: "Band External Rotation (Supine)", sets: 3, reps: "15/side", rest: "60 sec", cue: "Slow and controlled — key rotator cuff strengthener", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Chin-Up (Neutral Grip, Use Straps)", sets: 3, reps: "Max (cap 8)", rest: "2 min", cue: "Full hang to chin over bar — pack shoulder at start of each rep", type: "strength", inputType: "reps", injuryFlag: "elbow" },
  ],
}

const P1_DAY6 = {
  sessionType: "Conditioning + Full Mobility",
  exercises: [
    // Conditioning
    { name: "Easy Jog", sets: 1, reps: "20–25 min", rest: "—", cue: "Conversational pace — if you can't talk, slow down. Build the base.", type: "conditioning", inputType: "duration", injuryFlag: null },
    // Full Mobility Circuit
    { name: "Supine Hip Flexor Stretch", sets: 2, reps: "60 sec/side", rest: "—", cue: "Posterior pelvic tilt — breathe into the stretch, don't arch low back", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Pigeon Pose (or Figure-4 on Back)", sets: 2, reps: "90 sec/side", rest: "—", cue: "Relax glute fully into the stretch — don't force it", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Standing Hamstring Stretch (PNF)", sets: 3, reps: "20 sec contract / 30 sec stretch", rest: "—", cue: "Push leg into floor for 6 sec, then deepen the stretch — PNF gives bigger gains", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Thoracic Foam Roll", sets: 1, reps: "60 sec", rest: "—", cue: "Work from mid-back up to shoulder blades — pause on each segment", type: "recovery", inputType: "duration", injuryFlag: "rehab" },
    { name: "Hip 90/90 with Forward Fold", sets: 2, reps: "60 sec/side", rest: "—", cue: "Drive front hip into floor, fold torso over front leg", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Deep Squat Hold (Add Weight if Needed)", sets: 3, reps: "45 sec", rest: "60 sec", cue: "Heels down, hands pressed out on knees — breathe and sink deeper each round", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Doorway Chest Stretch (Shoulder Caution)", sets: 2, reps: "30 sec/side", rest: "—", cue: "Arm at 90° ONLY — do not go behind-body position", type: "mobility", inputType: "duration", injuryFlag: "shoulder" },
  ],
}

// ─── PHASE 2 (Weeks 4–6) ────────────────────────────────────────────────────

const P2_DAY1 = {
  sessionType: "Lower Body Strength + Advanced Plyometrics",
  exercises: [
    // Same warm-up as Phase 1 Day 1
    { name: "Hip 90/90 Rotations", sets: 2, reps: "60 sec/side", rest: "—", cue: "Sit tall, drive knee to floor — add a set from Phase 1", type: "warmup", inputType: "duration", injuryFlag: "rehab" },
    { name: "Banded Clamshells", sets: 2, reps: "15/side", rest: "30 sec", cue: "Squeeze glute at top, don't rotate pelvis", type: "warmup", inputType: "reps", injuryFlag: "rehab" },
    { name: "Glute Bridges (Bodyweight)", sets: 2, reps: "15", rest: "30 sec", cue: "Drive hips through, pause at top", type: "warmup", inputType: "reps", injuryFlag: null },
    { name: "World's Greatest Stretch", sets: 2, reps: "5/side", rest: "—", cue: "Thoracic rotation — reach tall at the top", type: "warmup", inputType: "reps", injuryFlag: "rehab" },
    // Main Work — heavier than Phase 1
    { name: "Back Squat", sets: 4, reps: "5", rest: "3 min", cue: "Heavier than Phase 1 — brace hard, no forward lean. 80% 1RM.", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Trap Bar Deadlift", sets: 4, reps: "4", rest: "3 min", cue: "Drive into the floor — max intent every rep", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Bulgarian Split Squat", sets: 3, reps: "8/side", rest: "2 min", cue: "Add load from Phase 1 — stay upright, depth over load", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Box Jump (Higher Box)", sets: 5, reps: "4", rest: "2 min", cue: "Step down between reps — full reset each jump. Max height intent.", type: "power", inputType: "reps", injuryFlag: null },
    { name: "Depth Drop → Broad Jump", sets: 4, reps: "3", rest: "2 min", cue: "Step off box, absorb landing, immediately broad jump — minimal ground contact time", type: "power", inputType: "reps", injuryFlag: null },
    { name: "Single-Leg Lateral Bound", sets: 4, reps: "5/side", rest: "90 sec", cue: "Stick each landing for 2 sec — build ankle stability and control", type: "power", inputType: "reps", injuryFlag: null },
    // Forearm Rehab
    { name: "Tyler Twist — Eccentric Wrist Extension", sets: 3, reps: "15", rest: "60 sec", cue: "Slow 4-sec lower — the eccentric phase is where healing happens", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
    { name: "Forearm Stretch (Extended Elbow)", sets: 2, reps: "30 sec/arm", rest: "—", cue: "Palm down, pull fingers back gently", type: "rehab", inputType: "duration", injuryFlag: "rehab" },
  ],
}

const P2_DAY2 = {
  // Same as Phase 1 Day 2 — shoulder rehab continues unchanged
  ...P1_DAY2,
  sessionType: "Upper Body Push + Shoulder Rehab",
}

const P2_DAY3 = {
  sessionType: "Speed & Agility — Interval Upgrade (Field)",
  exercises: [
    // Dynamic Warm-Up
    { name: "Hip Circle Walks + High Knees", sets: 1, reps: "20m × 3", rest: "—", cue: "Drive knees up to 90°, stay on balls of feet", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "A-Skips", sets: 1, reps: "20m × 3", rest: "—", cue: "Rhythmic, consistent ground contact", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "Lateral Shuffle + Crossover Step", sets: 1, reps: "10m × 4", rest: "—", cue: "Stay low, don't cross feet on shuffle", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "Build-Up Runs (50% → 70% → 90%)", sets: 3, reps: "30m each", rest: "90 sec", cue: "Accelerate through the full distance", type: "warmup", inputType: "duration", injuryFlag: null },
    // Speed & Cut Work — faster turns, more volume
    { name: "5-10-5 Shuttle (Pro Agility)", sets: 8, reps: "1 rep", rest: "90 sec", cue: "Faster turns — tighten the radius. Plant harder.", type: "agility", inputType: "duration", injuryFlag: null },
    { name: "L-Drill", sets: 6, reps: "1 rep", rest: "90 sec", cue: "Focus on transition at corners — stay low through the turn", type: "agility", inputType: "duration", injuryFlag: null },
    { name: "Resisted Sprint (Band or Sled Drag)", sets: 6, reps: "20m", rest: "2 min", cue: "Stay low, drive knees — resistance builds acceleration mechanics", type: "speed", inputType: "duration", injuryFlag: null },
    { name: "Flying Sprint (10m Build + 20m Max)", sets: 5, reps: "30m total", rest: "2.5 min", cue: "Hit max velocity by 10m mark, maintain through the 30m — time each rep", type: "speed", inputType: "duration", injuryFlag: null },
    // Conditioning — Weeks 4–6: interval-based
    { name: "40/20 Interval Runs", sets: 10, reps: "40 sec on / 20 sec off", rest: "—", cue: "Work at 80–85% max effort — this builds football conditioning. Don't jog on the 'on'.", type: "conditioning", inputType: "duration", injuryFlag: null },
  ],
}

const P2_DAY4 = {
  // Same exercises as Phase 1 Day 4 — load increases
  sessionType: "Lower Body Power + Posterior Chain",
  exercises: P1_DAY4.exercises.map(ex => ({
    ...ex,
    cue: ex.name === "Barbell Hip Thrust" ? "Add load from Phase 1 — full extension, 1-sec pause at top" :
         ex.name === "Romanian Deadlift" ? "Heavier than Phase 1 — maintain the 3-sec eccentric" :
         ex.cue,
  })),
}

const P2_DAY5 = {
  // Same exercises as Phase 1 Day 5 — load increases
  sessionType: "Upper Body Pull + Shoulder Stability",
  exercises: P1_DAY5.exercises,
}

const P2_DAY6 = {
  sessionType: "Conditioning Upgrade + Full Mobility",
  exercises: [
    // Interval Conditioning Block
    { name: "Shuttle Run (5-10-15)", sets: 8, reps: "1 rep", rest: "90 sec", cue: "Touch line each time — simulate in-game cuts and direction changes", type: "conditioning", inputType: "duration", injuryFlag: null },
    { name: "200m Repeats @ 85%", sets: 6, reps: "200m", rest: "90 sec", cue: "Maintain consistent times — note your time each rep. Don't blow out in rep 1.", type: "conditioning", inputType: "duration", injuryFlag: null },
    // Full Mobility Circuit (same as Phase 1 Day 6 — never drop this)
    { name: "Supine Hip Flexor Stretch", sets: 2, reps: "60 sec/side", rest: "—", cue: "Posterior pelvic tilt, breathe into the stretch", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Pigeon Pose (or Figure-4 on Back)", sets: 2, reps: "90 sec/side", rest: "—", cue: "Relax glute fully into the stretch", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Standing Hamstring Stretch (PNF)", sets: 3, reps: "20 sec contract / 30 sec stretch", rest: "—", cue: "Push leg into floor 6 sec, then deepen — bigger gains", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Thoracic Foam Roll", sets: 1, reps: "60 sec", rest: "—", cue: "Work from mid-back up to shoulder blades", type: "recovery", inputType: "duration", injuryFlag: "rehab" },
    { name: "Hip 90/90 with Forward Fold", sets: 2, reps: "60 sec/side", rest: "—", cue: "Drive front hip into floor, fold torso over front leg", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Deep Squat Hold", sets: 3, reps: "45 sec", rest: "60 sec", cue: "Heels down, hands pressed out on knees", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Doorway Chest Stretch (Shoulder Caution)", sets: 2, reps: "30 sec/side", rest: "—", cue: "Arm at 90° ONLY — no behind-body position", type: "mobility", inputType: "duration", injuryFlag: "shoulder" },
  ],
}

// ─── PHASE 3 (Weeks 7–8) ────────────────────────────────────────────────────

const P3_DAY1 = {
  sessionType: "Explosive Lower Body — Reduced Volume, Max Intensity",
  exercises: [
    // Warm-Up (same, 1 set each)
    { name: "Hip 90/90 Rotations", sets: 1, reps: "60 sec/side", rest: "—", cue: "Sit tall, drive knee to floor", type: "warmup", inputType: "duration", injuryFlag: "rehab" },
    { name: "Banded Clamshells", sets: 2, reps: "15/side", rest: "30 sec", cue: "Squeeze glute at top, don't rotate pelvis", type: "warmup", inputType: "reps", injuryFlag: "rehab" },
    { name: "Glute Bridges (Bodyweight)", sets: 2, reps: "15", rest: "30 sec", cue: "Drive hips through fully, pause at top", type: "warmup", inputType: "reps", injuryFlag: null },
    // Main Work — 3 sets max, 80%+ 1RM
    { name: "Back Squat (80%+ 1RM)", sets: 3, reps: "4", rest: "3 min", cue: "Explosive concentric — speed is the goal. Quality over quantity.", type: "strength", inputType: "weight", injuryFlag: null },
    { name: "Trap Bar Deadlift (Heavy)", sets: 3, reps: "3", rest: "3 min", cue: "Max intent — this builds rate of force development. Each rep like a gunshot.", type: "strength", inputType: "weight", injuryFlag: "elbow" },
    { name: "Depth Drop → Sprint 10m", sets: 5, reps: "3", rest: "2 min", cue: "Absolute minimum ground contact — snap into the sprint immediately", type: "power", inputType: "reps", injuryFlag: null },
    { name: "Box Jump (Max Height Box)", sets: 4, reps: "3", rest: "2 min", cue: "Jump for max height, land in squat position — full reset between reps", type: "power", inputType: "reps", injuryFlag: null },
    { name: "Single-Leg Squat Jump", sets: 3, reps: "5/side", rest: "2 min", cue: "Lower into quarter squat, jump for max height, stick landing — build explosive single-leg power", type: "power", inputType: "reps", injuryFlag: null },
    // Forearm Rehab
    { name: "Tyler Twist — Eccentric Wrist Extension", sets: 3, reps: "15", rest: "60 sec", cue: "Never skip this — slow 4-sec lower", type: "rehab", inputType: "reps", injuryFlag: "rehab" },
  ],
}

const P3_DAY2 = {
  // Same exercises as Phase 1/2 Day 2 — continue all shoulder rehab
  ...P1_DAY2,
  sessionType: "Upper Body Push + Shoulder Rehab",
}

const P3_DAY3 = {
  sessionType: "Game-Speed Field Session — Play Simulation",
  exercises: [
    // Dynamic Warm-Up
    { name: "Hip Circle Walks + High Knees", sets: 1, reps: "20m × 3", rest: "—", cue: "Drive knees up to 90°, stay on balls of feet", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "A-Skips", sets: 1, reps: "20m × 3", rest: "—", cue: "Rhythmic, consistent ground contact", type: "warmup", inputType: "duration", injuryFlag: null },
    { name: "Build-Up Runs", sets: 3, reps: "40m each", rest: "90 sec", cue: "70% → 85% → 95% — feel real speed build up", type: "warmup", inputType: "duration", injuryFlag: null },
    // Play Simulation Circuit — most important session of the week
    { name: "Full-Speed Sprint + Plant + Cut (Cone Route)", sets: 10, reps: "1 rep", rest: "40 sec", cue: "Run at 100%, plant foot hard, cut at sharp angle — simulate RB reads. No jogging this.", type: "speed", inputType: "duration", injuryFlag: null },
    { name: "Juke Drill (Dummy or Cone)", sets: 8, reps: "1 rep", rest: "40 sec", cue: "Approach at speed, quick inside fake, burst outside — sell the fake", type: "agility", inputType: "duration", injuryFlag: null },
    { name: "Play-Sim Conditioning: Max Effort Bursts", sets: 15, reps: "10–15 sec max effort", rest: "35–45 sec", cue: "10–15 sec at absolute max intensity, walk back and repeat — this IS football fitness", type: "conditioning", inputType: "duration", injuryFlag: null },
    { name: "Flying 40m Sprint", sets: 4, reps: "40m", rest: "3 min", cue: "Full acceleration — time yourself every rep. This is your benchmark.", type: "speed", inputType: "duration", injuryFlag: null },
  ],
}

const P3_DAY4 = {
  sessionType: "Lower Body Power + Posterior Chain",
  exercises: P1_DAY4.exercises.map(ex => ({
    ...ex,
    cue: ex.name === "Barbell Hip Thrust" ? "Peak load — max weight with perfect form. Pause 1 sec at top." :
         ex.name === "Nordic Hamstring Curl (Eccentric Only)" ? "This is critical injury prevention — 5-sec lower, every rep." :
         ex.cue,
  })),
}

const P3_DAY5 = {
  // Same as Phase 1/2 Day 5 — shoulder rehab continues
  sessionType: "Upper Body Pull + Shoulder Stability",
  exercises: P1_DAY5.exercises,
}

const P3_DAY6 = {
  sessionType: "Game-Prep Conditioning + Full Mobility",
  exercises: [
    // Final-week conditioning
    { name: "Play-Sim Intervals (5-10-15 Shuttle)", sets: 6, reps: "1 rep", rest: "90 sec", cue: "Touch each line — fast, sharp, game-speed", type: "conditioning", inputType: "duration", injuryFlag: null },
    { name: "200m Repeats @ 90%", sets: 4, reps: "200m", rest: "90 sec", cue: "Maintain consistent times — taper slightly from Phase 2 volume", type: "conditioning", inputType: "duration", injuryFlag: null },
    // Full Mobility — never drop this
    { name: "Supine Hip Flexor Stretch", sets: 2, reps: "60 sec/side", rest: "—", cue: "Posterior pelvic tilt, breathe into the stretch", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Pigeon Pose (or Figure-4 on Back)", sets: 2, reps: "90 sec/side", rest: "—", cue: "Relax glute fully into the stretch", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Standing Hamstring Stretch (PNF)", sets: 3, reps: "20 sec contract / 30 sec stretch", rest: "—", cue: "Push leg into floor 6 sec, then deepen — don't skip the PNF", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Thoracic Foam Roll", sets: 1, reps: "60 sec", rest: "—", cue: "Work from mid-back up to shoulder blades", type: "recovery", inputType: "duration", injuryFlag: "rehab" },
    { name: "Hip 90/90 with Forward Fold", sets: 2, reps: "60 sec/side", rest: "—", cue: "Drive front hip into floor, fold torso over front leg", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
    { name: "Deep Squat Hold", sets: 2, reps: "45 sec", rest: "60 sec", cue: "Heels down — breathe and sink. Hips open for Season Week 1.", type: "mobility", inputType: "duration", injuryFlag: "rehab" },
  ],
}

// ─── Day lookup by [phase][dayOfWeek] ───────────────────────────────────────

const DAY_PLANS = {
  Foundation: {
    1: P1_DAY1, 2: P1_DAY2, 3: P1_DAY3,
    4: P1_DAY4, 5: P1_DAY5, 6: P1_DAY6,
  },
  Development: {
    1: P2_DAY1, 2: P2_DAY2, 3: P2_DAY3,
    4: P2_DAY4, 5: P2_DAY5, 6: P2_DAY6,
  },
  Peak: {
    1: P3_DAY1, 2: P3_DAY2, 3: P3_DAY3,
    4: P3_DAY4, 5: P3_DAY5, 6: P3_DAY6,
  },
}

function getPhase(week) {
  if (week <= 3) return "Foundation"
  if (week <= 6) return "Development"
  return "Peak"
}

function buildDay(dayNum) {
  const week = Math.ceil(dayNum / 7)
  const dayOfWeek = ((dayNum - 1) % 7) + 1
  const phase = getPhase(week)
  const phaseKeyPoints = PHASE_KEY_POINTS[phase]

  if (dayOfWeek === 7) {
    return { day: dayNum, week, phase, phaseKeyPoints, sessionType: "REST DAY", exercises: [], isRest: true }
  }

  const plan = DAY_PLANS[phase][dayOfWeek]
  return {
    day: dayNum,
    week,
    phase,
    phaseKeyPoints,
    sessionType: plan.sessionType,
    exercises: plan.exercises,
    isRest: false,
  }
}

export const WORKOUTS = Array.from({ length: 60 }, (_, i) => buildDay(i + 1))

export const QUOTES = [
  "You are not tired. You are soft. Get up.",
  "The pain you feel today is the weakness leaving your body.",
  "No one is coming to save you. That's on you.",
  "Your mind will quit a thousand times before your body does.",
  "Comfort is the enemy of growth. Stay uncomfortable.",
  "Most people quit at 40%. You haven't even started.",
  "Stop looking for shortcuts. There are none.",
  "You want it? Then earn it. Every single day.",
  "Suffering is the true test of character.",
  "When you think you're done, you're only 40% there.",
  "The people who succeed are the ones who don't quit when it gets hard.",
  "Excuses are lies you tell yourself. Stop lying.",
  "Do what others won't. That's how you get what others don't.",
  "Callous your mind. It takes reps just like your body.",
  "You will not outwork me. That is a fact.",
  "Your past does not define you. But your actions today do.",
  "Nobody cares about your feelings. Put in the work.",
  "Fear is the most powerful motivator. Use it.",
  "You have to be willing to go to war with yourself.",
  "Every day you don't push, someone else is.",
  "Pain is just weakness having a conversation with you.",
  "If you want to be uncommon, you have to do uncommon things.",
  "Greatness is not born. It is built in the dark.",
  "Stop waiting for motivation. It doesn't come first. Action does.",
  "The only person you need to be better than is who you were yesterday.",
  "Hard work, dedication — those are not optional. They are the price.",
  "When it gets dark, that's when you find out who you are.",
  "I don't stop when I'm tired. I stop when I'm done.",
  "Your excuses are someone else's fuel.",
  "You chose this. Now finish it.",
  "Half of you is already gone. Which half stays?",
  "The easy path leads nowhere you actually want to go.",
  "There is no trophy for almost.",
  "You don't rise to the occasion. You fall to your level of preparation.",
  "Discipline is the bridge between your goals and your results.",
  "Embrace the suck. It means you're doing it right.",
  "Nobody is going to hand you anything. Take it.",
  "The body will do what the mind commands — so command it.",
  "You are one decision away from a completely different life.",
  "Weakness doesn't survive here. Neither does excuses.",
  "You are in a war. The enemy is the version of you that wants to quit.",
  "If it doesn't break you, it didn't mean anything.",
  "Six weeks in. You think you're tired? You're just beginning.",
  "Every rep is a vote for the athlete you're becoming.",
  "Stop surviving. Start dominating.",
  "The scoreboard doesn't lie. Put up numbers.",
  "Season is coming. Are you coming with it?",
  "You chose to be an athlete. Now act like one.",
  "Two weeks left. Everything you've built is about to be tested.",
  "This is the hard part. This is exactly where champions are made.",
  "One week out. Every rep matters more than ever now.",
  "You know what you're capable of. Go prove it.",
  "The preparation ends. The performance begins.",
  "There are no more excuses. The clock is at zero. Go.",
  "The work is done. Now it's time to be the weapon you built.",
  "You either prepared or you didn't. You know which one.",
  "Day 57. Leave nothing in the tank. Nothing.",
  "Two days. Every session has led to this moment.",
  "Last day of prep. Tomorrow you play. Go be a problem.",
  "Season starts now. Stay hard. Stay relentless. Take what's yours.",
]

export const TRACKED_EXERCISES = [
  "Back Squat",
  "Trap Bar Deadlift",
  "Barbell Hip Thrust",
  "Romanian Deadlift",
  "Bulgarian Split Squat",
  "Lat Pulldown (Wide Grip, Use Straps)",
  "Flat DB Bench Press",
  "Nordic Hamstring Curl (Eccentric Only)",
]

export const NUTRITION = {
  dailyTargets: [
    { macro: "Protein", training: "160–175g", rest: "160–175g", why: "Muscle retention & growth during recomp", sources: "Chicken, eggs, Greek yogurt, protein shake" },
    { macro: "Carbohydrates", training: "250–300g", rest: "150–180g", why: "Fuel for explosive sessions", sources: "Rice, oats, sweet potato, fruit" },
    { macro: "Fat", training: "70–90g", rest: "70–90g", why: "Hormones, joint health, recovery", sources: "Olive oil, avocado, nuts, salmon" },
    { macro: "Total Calories", training: "~2500–2800 kcal", rest: "~2000–2200 kcal", why: "Slight surplus on training days", sources: "Track loosely for 2 weeks to calibrate" },
  ],
  mealTiming: [
    { time: "Pre-Training (45–60 min before)", detail: "30–40g carbs + 20g protein. Easy to digest.", example: "Banana + protein shake, or rice cakes + eggs" },
    { time: "Intra-Training", detail: "Water + creatine (3–5g). Take daily — timing doesn't matter much.", example: "Creatine monohydrate, consistent every day" },
    { time: "Post-Training (within 60 min)", detail: "40–50g carbs + 35–40g protein. Biggest meal of the day.", example: "Rice + chicken + vegetables" },
    { time: "Evening Meal", detail: "High protein, moderate fat, lower carbs.", example: "Salmon + salad + olive oil" },
    { time: "Before Bed", detail: "20–30g slow protein.", example: "Cottage cheese or Greek yogurt with nuts" },
  ],
  rules: [
    "Hit 160g+ protein every single day without exception — everything else is secondary",
    "If you miss a meal, don't skip protein — grab a shake",
    "Prioritize whole food sources — shakes fill gaps only",
    "Hydration: 3–4 litres/day, add 0.5L on field days",
    "Alcohol: avoid completely during this 8-week block if recomp is the goal",
  ],
}

export const READINESS_CHECKLIST = {
  performance: [
    "Can complete 15× 10-sec max bursts with 40-sec rest without failing",
    "5-10-5 shuttle improved from Week 1 time",
    "Box jump height increased from baseline",
    "Can sprint 40m three times in a row without significant speed drop",
    "Squat load increased from Week 1 with same or better technique",
  ],
  shoulder: [
    "No sharp pain during any gym pushing movement",
    "Can perform landmine press for 3×10 pain-free",
    "Shoulder feels stable during lateral bounds and direction changes",
    "Physio has cleared or progressed you for contact work",
    "Can perform a tackling simulation drill at low intensity without pain",
  ],
  elbow: [
    "Can grip a barbell without pain or warm-up modification needed",
    "Tyler Twist test: 3×15 eccentric reps with no sharp pain",
    "No constant background ache during or after sessions",
  ],
  general: [
    "Body weight stable or trending in right direction (recomp takes 8–12+ weeks to fully show)",
    "Hips feel noticeably more mobile in squat and lateral movements",
    "Energy levels are high going into sessions — not dreading them",
    "Sleep and nutrition consistency is at least 80% of what the plan calls for",
  ],
}
