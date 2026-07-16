export interface OffLookupResult {
  found: boolean;
  name?: string;
  caloriesPer100g?: number;
  proteinPer100g?: number;
  carbsPer100g?: number;
  fatPer100g?: number;
  fiberPer100g?: number;
}

function numberOrZero(value: unknown): number {
  return typeof value === "number" && !Number.isNaN(value) ? value : 0;
}

export function parseOffResponse(json: unknown): OffLookupResult {
  if (typeof json !== "object" || json === null) return { found: false };
  const body = json as Record<string, unknown>;
  if (body.status !== 1 || typeof body.product !== "object" || body.product === null) {
    return { found: false };
  }

  const product = body.product as Record<string, unknown>;
  const nutriments = (product.nutriments as Record<string, unknown>) ?? {};
  const name =
    typeof product.product_name === "string" && product.product_name.trim().length > 0
      ? product.product_name.trim()
      : undefined;

  return {
    found: true,
    name,
    caloriesPer100g: numberOrZero(nutriments["energy-kcal_100g"]),
    proteinPer100g: numberOrZero(nutriments["proteins_100g"]),
    carbsPer100g: numberOrZero(nutriments["carbohydrates_100g"]),
    fatPer100g: numberOrZero(nutriments["fat_100g"]),
    fiberPer100g: numberOrZero(nutriments["fiber_100g"]),
  };
}

const OFF_USER_AGENT = process.env.OFF_USER_AGENT ?? "food-tracker/1.0 (personal single-user app)";

export async function lookupBarcode(barcode: string): Promise<OffLookupResult> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`,
      { headers: { "User-Agent": OFF_USER_AGENT }, cache: "no-store" }
    );
    if (!res.ok) return { found: false };
    const json = await res.json();
    return parseOffResponse(json);
  } catch {
    return { found: false };
  }
}
