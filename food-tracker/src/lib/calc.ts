import type { MealTotals } from "@/types";

export interface NutritionLike {
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  pricePer100g: number;
}

export interface MealLine {
  grams: number;
  ingredient: NutritionLike;
}

export function computeMealTotals(lines: MealLine[], portions: number): MealTotals {
  const totals = lines.reduce(
    (acc, line) => {
      const factor = line.grams / 100;
      acc.totalCost += factor * line.ingredient.pricePer100g;
      acc.totalCalories += factor * line.ingredient.caloriesPer100g;
      acc.totalProtein += factor * line.ingredient.proteinPer100g;
      acc.totalCarbs += factor * line.ingredient.carbsPer100g;
      acc.totalFat += factor * line.ingredient.fatPer100g;
      acc.totalFiber += factor * line.ingredient.fiberPer100g;
      return acc;
    },
    {
      totalCost: 0,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
    }
  );

  const safePortions = portions > 0 ? portions : 1;

  return {
    ...totals,
    costPerPortion: totals.totalCost / safePortions,
    caloriesPerPortion: totals.totalCalories / safePortions,
    proteinPerPortion: totals.totalProtein / safePortions,
    carbsPerPortion: totals.totalCarbs / safePortions,
    fatPerPortion: totals.totalFat / safePortions,
    fiberPerPortion: totals.totalFiber / safePortions,
  };
}
