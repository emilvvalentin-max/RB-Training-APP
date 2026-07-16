# Food Cost Tracker

A personal tool for tracking ingredient prices and figuring out how much each meal costs per portion. Standalone Next.js app — unrelated to the training tracker at the repo root.

## Tabs

- **Ingredients** — add foods with calories/protein/carbs/fat/fiber/price per 100g. Edit or delete anytime.
- **Meals** — build a meal from your ingredients (grams each) plus a portion count. Cost and nutrition per portion are always computed from the *current* ingredient prices, so editing a price updates every meal that uses it.
- **Dashboard** — ingredient/meal counts, average cost per portion, and meals sorted by cost per portion.

## Setup

```bash
npm install
npx prisma migrate dev   # creates dev.db and applies the schema
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/ingredients`.

## Stack

Next.js (App Router) + SQLite via Prisma (`@prisma/adapter-better-sqlite3` driver adapter). No auth — single-user local tool.

Note: this app runs on its own dev server (default port 3000), independent of the Vite training-tracker app at the repo root.
