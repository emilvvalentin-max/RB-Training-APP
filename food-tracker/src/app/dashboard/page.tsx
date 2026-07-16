import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { fetchAllMeals, toMealDTO } from "@/lib/meals";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [ingredientCount, meals] = await Promise.all([
    prisma.ingredient.count(),
    fetchAllMeals(),
  ]);

  const mealDTOs = meals.map(toMealDTO);
  const mealCount = mealDTOs.length;
  const averageCostPerPortion =
    mealCount > 0
      ? mealDTOs.reduce((sum, meal) => sum + meal.costPerPortion, 0) / mealCount
      : 0;
  const mealsByCost = [...mealDTOs].sort((a, b) => a.costPerPortion - b.costPerPortion);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-bold">{ingredientCount}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ingredients</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-bold">{mealCount}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Meals</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-bold">${averageCostPerPortion.toFixed(2)}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Avg cost/portion</p>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Meals by cost per portion
        </h2>
        {mealsByCost.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No meals yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {mealsByCost.map((meal) => (
              <Link
                key={meal.id}
                href={`/meals/${meal.id}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 hover:border-strava/50 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span>{meal.name}</span>
                <span className="font-medium text-strava">
                  ${meal.costPerPortion.toFixed(2)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
