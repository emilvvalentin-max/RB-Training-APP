import { prisma } from "@/lib/prisma";
import MealBuilder from "@/components/MealBuilder";
import type { IngredientDTO } from "@/types";

export default async function NewMealPage() {
  const ingredients = await prisma.ingredient.findMany({ orderBy: { name: "asc" } });
  const dtos: IngredientDTO[] = ingredients.map((ingredient) => ({
    ...ingredient,
    createdAt: ingredient.createdAt.toISOString(),
    updatedAt: ingredient.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">New meal</h1>
      {dtos.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Add some ingredients first before creating a meal.
        </p>
      ) : (
        <MealBuilder mode="create" allIngredients={dtos} />
      )}
    </div>
  );
}
