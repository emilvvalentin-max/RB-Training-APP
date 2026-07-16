import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateMealInput } from "@/lib/validation";
import { fetchAllMeals, fetchMealById, toMealDTO } from "@/lib/meals";

export async function GET() {
  const meals = await fetchAllMeals();
  return NextResponse.json(meals.map(toMealDTO));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data, error } = validateMealInput(body);
  if (error || !data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const ingredientIds = data.ingredients.map((line) => line.ingredientId);
  const foundCount = await prisma.ingredient.count({ where: { id: { in: ingredientIds } } });
  if (foundCount !== new Set(ingredientIds).size) {
    return NextResponse.json({ error: "One or more ingredients do not exist" }, { status: 400 });
  }

  const created = await prisma.meal.create({
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
  });

  const meal = await fetchMealById(created.id);
  return NextResponse.json(toMealDTO(meal!), { status: 201 });
}
