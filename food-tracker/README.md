# Food Cost Tracker

A personal tool for tracking ingredient prices and figuring out how much each meal costs per portion. Standalone Next.js app — unrelated to the training tracker at the repo root.

## Tabs

- **Ingredients** — add foods with calories/protein/carbs/fat/fiber/price per 100g. Edit or delete anytime. Scan a packaged product's barcode (camera, or type it in) to auto-fill nutrition from Open Food Facts — price always still needs to be entered manually since no nutrition database has it. Barcodes must be unique; scanning one already in your list points you to the existing ingredient instead of creating a duplicate.
- **Meals** — build a meal from your ingredients (grams each) plus a portion count. Cost and nutrition per portion are always computed from the *current* ingredient prices, so editing a price updates every meal that uses it.
- **Dashboard** — ingredient/meal counts, average cost per portion, and meals sorted by cost per portion.

## Local setup

Needs a Postgres database (local, Docker, or a free hosted one like Neon).

```bash
npm install
# set DATABASE_URL in .env (see .env.example) to point at your Postgres instance
npx prisma migrate deploy
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/ingredients`.

## Deploy to Vercel (to use on your phone)

Camera barcode scanning only works over HTTPS, so to use this on a phone you need a real deployment, not just `localhost`.

1. In Vercel, create a new project from this GitHub repo.
2. Set the project's **Root Directory** to `food-tracker` — the repo root has an unrelated Vite app, so this must be its own project, not mixed into that one.
3. In the project's **Storage** tab, add **Postgres**. This provisions the database and adds its connection string as an env var automatically.
4. Check what Vercel named that env var — if it isn't exactly `DATABASE_URL`, add a `DATABASE_URL` variable in the project's env var settings with the same (pooled) connection string as its value, since that's the name this app reads.
5. Deploy. The `vercel-build` script (`prisma migrate deploy && next build`) creates the database tables automatically on first deploy — no manual migration step needed.
6. Open the `*.vercel.app` URL Vercel gives you on your phone.

## Stack

Next.js (App Router) + Postgres via Prisma (`@prisma/adapter-pg` driver adapter). No auth — single-user tool.

Note: this app is a separate Vercel project from the Vite training-tracker app at the repo root — they don't share a build, a database, or a deployment.
