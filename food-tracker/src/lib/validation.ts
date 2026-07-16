import type { IngredientInput } from "@/types";

const NUMERIC_INGREDIENT_FIELDS = [
  "caloriesPer100g",
  "proteinPer100g",
  "carbsPer100g",
  "fatPer100g",
  "fiberPer100g",
  "pricePer100g",
] as const;

export function validateIngredientInput(body: unknown): { data?: IngredientInput; error?: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body" };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length === 0) {
    return { error: "Name is required" };
  }

  let barcode: string | null = null;
  if (b.barcode !== undefined && b.barcode !== null) {
    if (typeof b.barcode !== "string") {
      return { error: "Barcode must be a string" };
    }
    const trimmed = b.barcode.trim();
    barcode = trimmed.length > 0 ? trimmed : null;
  }

  for (const field of NUMERIC_INGREDIENT_FIELDS) {
    const value = b[field];
    if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
      return { error: `${field} must be a non-negative number` };
    }
  }

  return {
    data: {
      name: b.name.trim(),
      barcode,
      caloriesPer100g: b.caloriesPer100g as number,
      proteinPer100g: b.proteinPer100g as number,
      carbsPer100g: b.carbsPer100g as number,
      fatPer100g: b.fatPer100g as number,
      fiberPer100g: b.fiberPer100g as number,
      pricePer100g: b.pricePer100g as number,
    },
  };
}

export function validateMealInput(body: unknown): {
  data?: { name: string; portions: number; ingredients: { ingredientId: string; grams: number }[] };
  error?: string;
} {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body" };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length === 0) {
    return { error: "Name is required" };
  }
  if (typeof b.portions !== "number" || Number.isNaN(b.portions) || b.portions <= 0) {
    return { error: "Portions must be a positive number" };
  }
  if (!Array.isArray(b.ingredients) || b.ingredients.length === 0) {
    return { error: "At least one ingredient is required" };
  }

  const ingredients: { ingredientId: string; grams: number }[] = [];
  for (const line of b.ingredients) {
    if (
      typeof line !== "object" ||
      line === null ||
      typeof (line as Record<string, unknown>).ingredientId !== "string" ||
      typeof (line as Record<string, unknown>).grams !== "number" ||
      Number.isNaN((line as Record<string, unknown>).grams) ||
      ((line as Record<string, unknown>).grams as number) <= 0
    ) {
      return { error: "Each ingredient line needs an ingredientId and a positive grams amount" };
    }
    ingredients.push({
      ingredientId: (line as Record<string, unknown>).ingredientId as string,
      grams: (line as Record<string, unknown>).grams as number,
    });
  }

  return {
    data: {
      name: b.name.trim(),
      portions: b.portions,
      ingredients,
    },
  };
}
