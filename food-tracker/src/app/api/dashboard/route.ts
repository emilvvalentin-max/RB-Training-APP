import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchAllMeals, toMealDTO } from "@/lib/meals";

export async function GET() {
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

  const mealsByCost = [...mealDTOs]
    .sort((a, b) => a.costPerPortion - b.costPerPortion)
    .map((meal) => ({ id: meal.id, name: meal.name, costPerPortion: meal.costPerPortion }));

  return NextResponse.json({
    ingredientCount,
    mealCount,
    averageCostPerPortion,
    mealsByCost,
  });
}
