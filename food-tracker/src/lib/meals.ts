import { prisma } from "@/lib/prisma";
import { computeMealTotals } from "@/lib/calc";
import type { MealDTO } from "@/types";

const mealInclude = {
  ingredients: {
    include: { ingredient: true },
  },
} as const;

type MealWithIngredients = Awaited<ReturnType<typeof fetchMealById>>;

export async function fetchMealById(id: string) {
  return prisma.meal.findUnique({ where: { id }, include: mealInclude });
}

export async function fetchAllMeals() {
  return prisma.meal.findMany({ include: mealInclude, orderBy: { name: "asc" } });
}

export function toMealDTO(meal: NonNullable<MealWithIngredients>): MealDTO {
  const totals = computeMealTotals(
    meal.ingredients.map((line) => ({ grams: line.grams, ingredient: line.ingredient })),
    meal.portions
  );

  return {
    id: meal.id,
    name: meal.name,
    portions: meal.portions,
    createdAt: meal.createdAt.toISOString(),
    updatedAt: meal.updatedAt.toISOString(),
    ingredients: meal.ingredients.map((line) => ({
      ingredientId: line.ingredientId,
      grams: line.grams,
      ingredient: {
        ...line.ingredient,
        createdAt: line.ingredient.createdAt.toISOString(),
        updatedAt: line.ingredient.updatedAt.toISOString(),
      },
    })),
    ...totals,
  };
}
