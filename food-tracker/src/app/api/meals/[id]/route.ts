import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateMealInput } from "@/lib/validation";
import { fetchMealById, toMealDTO } from "@/lib/meals";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const meal = await fetchMealById(id);
  if (!meal) {
    return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  }
  return NextResponse.json(toMealDTO(meal));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { data, error } = validateMealInput(body);
  if (error || !data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const existing = await prisma.meal.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  }

  const ingredientIds = data.ingredients.map((line) => line.ingredientId);
  const foundCount = await prisma.ingredient.count({ where: { id: { in: ingredientIds } } });
  if (foundCount !== new Set(ingredientIds).size) {
    return NextResponse.json({ error: "One or more ingredients do not exist" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.mealIngredient.deleteMany({ where: { mealId: id } }),
    prisma.meal.update({
      where: { id },
      data: {
        name: data.name,
        portions: data.portions,
        ingredients: {
          create: data.ingredients.map((line) => ({
            ingredientId: line.ingredientId,
            grams: line.grams,
          })),
        },
      },
    }),
  ]);

  const meal = await fetchMealById(id);
  return NextResponse.json(toMealDTO(meal!));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = await prisma.meal.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  }

  await prisma.meal.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
