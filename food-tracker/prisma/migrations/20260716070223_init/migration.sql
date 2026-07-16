-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "caloriesPer100g" REAL NOT NULL,
    "proteinPer100g" REAL NOT NULL,
    "carbsPer100g" REAL NOT NULL,
    "fatPer100g" REAL NOT NULL,
    "fiberPer100g" REAL NOT NULL,
    "pricePer100g" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "portions" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MealIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mealId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "grams" REAL NOT NULL,
    CONSTRAINT "MealIngredient_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MealIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MealIngredient_mealId_ingredientId_key" ON "MealIngredient"("mealId", "ingredientId");
