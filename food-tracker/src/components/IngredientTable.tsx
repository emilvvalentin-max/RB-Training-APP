"use client";

import type { IngredientDTO } from "@/types";
import IngredientForm from "@/components/IngredientForm";

export default function IngredientTable({
  ingredients,
  editingId,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: {
  ingredients: IngredientDTO[];
  editingId: string | null;
  onEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: Parameters<typeof IngredientForm>[0]["onSubmit"];
  onDelete: (id: string) => void;
}) {
  if (ingredients.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No ingredients yet. Add your first one above.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {ingredients.map((ingredient) => {
        if (editingId === ingredient.id) {
          return (
            <IngredientForm
              key={ingredient.id}
              initial={ingredient}
              onSubmit={onSaveEdit}
              onCancel={onCancelEdit}
            />
          );
        }

        return (
          <div
            key={ingredient.id}
            className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{ingredient.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {ingredient.caloriesPer100g} kcal · {ingredient.proteinPer100g}g protein ·{" "}
                {ingredient.carbsPer100g}g carbs · {ingredient.fatPer100g}g fat ·{" "}
                {ingredient.fiberPer100g}g fiber
                <span className="mx-1">·</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  ${ingredient.pricePer100g.toFixed(2)}/100g
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(ingredient.id)}
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(ingredient.id)}
                className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
