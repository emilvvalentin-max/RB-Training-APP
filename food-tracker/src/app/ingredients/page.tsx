import { prisma } from "@/lib/prisma";
import IngredientsManager from "@/components/IngredientsManager";
import type { IngredientDTO } from "@/types";

export const dynamic = "force-dynamic";

export default async function IngredientsPage() {
  const ingredients = await prisma.ingredient.findMany({ orderBy: { name: "asc" } });

  const dtos: IngredientDTO[] = ingredients.map((ingredient) => ({
    ...ingredient,
    createdAt: ingredient.createdAt.toISOString(),
    updatedAt: ingredient.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Ingredients</h1>
      <IngredientsManager initialIngredients={dtos} />
    </div>
  );
}
