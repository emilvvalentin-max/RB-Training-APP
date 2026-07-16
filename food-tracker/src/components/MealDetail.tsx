import type { MealDTO } from "@/types";

export default function MealDetail({ meal }: { meal: MealDTO }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
        <h3 className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
          Cost per portion ({meal.portions} portion{meal.portions === 1 ? "" : "s"} total)
        </h3>
        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
          ${meal.costPerPortion.toFixed(2)}
        </p>
        <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
          Total meal cost: ${meal.totalCost.toFixed(2)}
        </p>
        <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
          {meal.caloriesPerPortion.toFixed(0)} kcal · {meal.proteinPerPortion.toFixed(1)}g protein ·{" "}
          {meal.carbsPerPortion.toFixed(1)}g carbs · {meal.fatPerPortion.toFixed(1)}g fat ·{" "}
          {meal.fiberPerPortion.toFixed(1)}g fiber (per portion)
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Ingredients
        </h3>
        <div className="flex flex-col gap-2">
          {meal.ingredients.map((line) => (
            <div key={line.ingredientId} className="flex items-center justify-between text-sm">
              <span>{line.ingredient.name}</span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {line.grams}g · ${((line.grams / 100) * line.ingredient.pricePer100g).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
