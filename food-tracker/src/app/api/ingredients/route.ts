import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateIngredientInput } from "@/lib/validation";

export async function GET() {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(ingredients);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data, error } = validateIngredientInput(body);
  if (error || !data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (data.barcode) {
    const dupe = await prisma.ingredient.findUnique({ where: { barcode: data.barcode } });
    if (dupe) {
      return NextResponse.json(
        { error: `Barcode already used by "${dupe.name}"` },
        { status: 409 }
      );
    }
  }

  const ingredient = await prisma.ingredient.create({ data });
  return NextResponse.json(ingredient, { status: 201 });
}
