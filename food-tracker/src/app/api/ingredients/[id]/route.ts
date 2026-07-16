import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateIngredientInput } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ingredient = await prisma.ingredient.findUnique({ where: { id } });
  if (!ingredient) {
    return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
  }
  return NextResponse.json(ingredient);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { data, error } = validateIngredientInput(body);
  if (error || !data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const existing = await prisma.ingredient.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
  }

  const ingredient = await prisma.ingredient.update({ where: { id }, data });
  return NextResponse.json(ingredient);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await prisma.ingredient.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
  }

  const usages = await prisma.mealIngredient.findMany({
    where: { ingredientId: id },
    include: { meal: true },
  });

  if (usages.length > 0) {
    return NextResponse.json(
      {
        error: `In use by ${usages.length} meal(s)`,
        meals: usages.map((u) => ({ id: u.meal.id, name: u.meal.name })),
      },
      { status: 409 }
    );
  }

  await prisma.ingredient.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
