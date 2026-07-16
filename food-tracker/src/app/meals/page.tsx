import Link from "next/link";
import { fetchAllMeals, toMealDTO } from "@/lib/meals";
import MealList from "@/components/MealList";

export const dynamic = "force-dynamic";

export default async function MealsPage() {
  const meals = (await fetchAllMeals()).map(toMealDTO);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Meals</h1>
        <Link
          href="/meals/new"
          className="rounded-md bg-strava px-3 py-1.5 text-sm font-medium text-white hover:bg-strava-dark"
        >
          + New meal
        </Link>
      </div>
      <MealList meals={meals} />
    </div>
  );
}
