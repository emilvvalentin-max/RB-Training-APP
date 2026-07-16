"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { IngredientDTO, MealDTO } from "@/types";
import { computeMealTotals } from "@/lib/calc";

interface Line {
  ingredientId: string;
  grams: string;
}

export default function MealBuilder({
  mode,
  mealId,
  initial,
  allIngredients,
}: {
  mode: "create" | "edit";
  mealId?: string;
  initial?: MealDTO;
  allIngredients: IngredientDTO[];
}) {
  const router = useRouter();
  const ingredientsById = useMemo(
    () => new Map(allIngredients.map((i) => [i.id, i])),
    [allIngredients]
  );

  const [name, setName] = useState(initial?.name ?? "");
  const [portions, setPortions] = useState(initial ? String(initial.portions) : "1");
  const [lines, setLines] = useState<Line[]>(
    initial?.ingredients.map((l) => ({ ingredientId: l.ingredientId, grams: String(l.grams) })) ?? []
  );
  const [pickerId, setPickerId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const availableToAdd = allIngredients.filter(
    (ing) => !lines.some((l) => l.ingredientId === ing.id)
  );

  const portionsNumber = Number(portions);
  const preview = useMemo(() => {
    const validLines = lines
      .map((l) => {
        const ingredient = ingredientsById.get(l.ingredientId);
        const grams = Number(l.grams);
        if (!ingredient || Number.isNaN(grams) || grams <= 0) return null;
        return { grams, ingredient };
      })
      .filter((l): l is { grams: number; ingredient: IngredientDTO } => l !== null);

    return computeMealTotals(validLines, portionsNumber > 0 ? portionsNumber : 1);
  }, [lines, ingredientsById, portionsNumber]);

  function addLine() {
    if (!pickerId) return;
    setLines((prev) => [...prev, { ingredientId: pickerId, grams: "100" }]);
    setPickerId("");
  }

  function updateGrams(ingredientId: string, grams: string) {
    setLines((prev) =>
      prev.map((l) => (l.ingredientId === ingredientId ? { ...l, grams } : l))
    );
  }

  function removeLine(ingredientId: string) {
    setLines((prev) => prev.filter((l) => l.ingredientId !== ingredientId));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length === 0) {
      setError("Name is required");
      return;
    }
    if (Number.isNaN(portionsNumber) || portionsNumber <= 0) {
      setError("Portions must be a positive number");
      return;
    }
    if (lines.length === 0) {
      setError("Add at least one ingredient");
      return;
    }
    for (const line of lines) {
      const grams = Number(line.grams);
      if (Number.isNaN(grams) || grams <= 0) {
        setError("Every ingredient needs a positive grams amount");
        return;
      }
    }

    setSaving(true);
    const payload = {
      name: name.trim(),
      portions: portionsNumber,
      ingredients: lines.map((l) => ({ ingredientId: l.ingredientId, grams: Number(l.grams) })),
    };

    const res = await fetch(mode === "create" ? "/api/meals" : `/api/meals/${mealId}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(body.error ?? "Failed to save meal");
      return;
    }

    router.push(`/meals/${body.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Meal name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chicken & rice bowl"
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Portions (servings this recipe yields)
          </label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            value={portions}
            onChange={(e) => setPortions(e.target.value)}
            className="w-32 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Ingredients</h3>

        {lines.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No ingredients added yet.</p>
        )}

        {lines.map((line) => {
          const ingredient = ingredientsById.get(line.ingredientId);
          const grams = Number(line.grams);
          const lineCost =
            ingredient && !Number.isNaN(grams) ? (grams / 100) * ingredient.pricePer100g : 0;
          return (
            <div key={line.ingredientId} className="flex items-center gap-2">
              <span className="flex-1 text-sm">{ingredient?.name ?? "Unknown"}</span>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                value={line.grams}
                onChange={(e) => updateGrams(line.ingredientId, e.target.value)}
                className="w-20 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
              <span className="w-10 text-xs text-zinc-500 dark:text-zinc-400">g</span>
              <span className="w-16 text-right text-xs text-zinc-600 dark:text-zinc-400">
                ${lineCost.toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => removeLine(line.ingredientId)}
                className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                Remove
              </button>
            </div>
          );
        })}

        <div className="flex items-center gap-2 pt-2">
          <select
            value={pickerId}
            onChange={(e) => setPickerId(e.target.value)}
            className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="">Select an ingredient…</option>
            {availableToAdd.map((ing) => (
              <option key={ing.id} value={ing.id}>
                {ing.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addLine}
            disabled={!pickerId}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Add
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
        <h3 className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
          Estimated per portion
        </h3>
        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          ${preview.costPerPortion.toFixed(2)}
        </p>
        <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
          {preview.caloriesPerPortion.toFixed(0)} kcal · {preview.proteinPerPortion.toFixed(1)}g
          protein · {preview.carbsPerPortion.toFixed(1)}g carbs · {preview.fatPerPortion.toFixed(1)}g
          fat · {preview.fiberPerPortion.toFixed(1)}g fiber
        </p>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving…" : mode === "create" ? "Save meal" : "Save changes"}
      </button>
    </form>
  );
}
