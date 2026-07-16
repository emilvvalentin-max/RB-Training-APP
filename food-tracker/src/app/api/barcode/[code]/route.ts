import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { lookupBarcode } from "@/lib/off";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const barcode = decodeURIComponent(code).trim();
  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  const [existing, off] = await Promise.all([
    prisma.ingredient.findUnique({ where: { barcode } }),
    lookupBarcode(barcode),
  ]);

  return NextResponse.json({
    barcode,
    existingIngredient: existing ? { id: existing.id, name: existing.name } : null,
    off,
  });
}
