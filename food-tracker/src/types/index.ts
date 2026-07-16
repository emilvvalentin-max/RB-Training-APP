export interface IngredientDTO {
  id: string;
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  pricePer100g: number;
  createdAt: string;
  updatedAt: string;
}

export interface IngredientInput {
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  pricePer100g: number;
}

export interface MealIngredientLineDTO {
  ingredientId: string;
  grams: number;
  ingredient: IngredientDTO;
}

export interface MealTotals {
  totalCost: number;
  costPerPortion: number;
  totalCalories: number;
  caloriesPerPortion: number;
  totalProtein: number;
  proteinPerPortion: number;
  totalCarbs: number;
  carbsPerPortion: number;
  totalFat: number;
  fatPerPortion: number;
  totalFiber: number;
  fiberPerPortion: number;
}

export interface MealDTO extends MealTotals {
  id: string;
  name: string;
  portions: number;
  createdAt: string;
  updatedAt: string;
  ingredients: MealIngredientLineDTO[];
}

export interface MealInput {
  name: string;
  portions: number;
  ingredients: { ingredientId: string; grams: number }[];
}
