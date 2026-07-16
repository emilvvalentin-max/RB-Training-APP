import Link from "next/link";
import type { MealDTO } from "@/types";

export default function MealList({ meals }: { meals: MealDTO[] }) {
  if (meals.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No meals yet. Create your first one.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {meals.map((meal) => (
        <Link
          key={meal.id}
          href={`/meals/${meal.id}`}
          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
        >
          <div>
            <p className="font-medium">{meal.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {meal.portions} portion{meal.portions === 1 ? "" : "s"} · {meal.ingredients.length}{" "}
              ingredient{meal.ingredients.length === 1 ? "" : "s"}
            </p>
          </div>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            ${meal.costPerPortion.toFixed(2)}
            <span className="ml-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
              /portion
            </span>
          </p>
        </Link>
      ))}
    </div>
  );
}
