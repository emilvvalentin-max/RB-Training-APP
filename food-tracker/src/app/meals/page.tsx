import Link from "next/link";
import { fetchAllMeals, toMealDTO } from "@/lib/meals";
import MealList from "@/components/MealList";

export default async function MealsPage() {
  const meals = (await fetchAllMeals()).map(toMealDTO);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Meals</h1>
        <Link
          href="/meals/new"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New meal
        </Link>
      </div>
      <MealList meals={meals} />
    </div>
  );
}
