import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fetchMealById, toMealDTO } from "@/lib/meals";
import MealDetailView from "@/components/MealDetailView";
import type { IngredientDTO } from "@/types";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [meal, ingredients] = await Promise.all([
    fetchMealById(id),
    prisma.ingredient.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!meal) {
    notFound();
  }

  const dtos: IngredientDTO[] = ingredients.map((ingredient) => ({
    ...ingredient,
    createdAt: ingredient.createdAt.toISOString(),
    updatedAt: ingredient.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">{meal.name}</h1>
      <MealDetailView meal={toMealDTO(meal)} allIngredients={dtos} />
    </div>
  );
}
