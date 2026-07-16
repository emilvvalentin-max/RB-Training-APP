"use client";

import { useState } from "react";
import type { IngredientDTO, IngredientInput } from "@/types";
import IngredientForm from "@/components/IngredientForm";
import IngredientTable from "@/components/IngredientTable";

export default function IngredientsManager({
  initialIngredients,
}: {
  initialIngredients: IngredientDTO[];
}) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleCreate(data: IngredientInput) {
    const res = await fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) return body.error ?? "Failed to save ingredient";

    setIngredients((prev) =>
      [...prev, body as IngredientDTO].sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  async function handleUpdate(data: IngredientInput) {
    if (!editingId) return "No ingredient selected";
    const res = await fetch(`/api/ingredients/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) return body.error ?? "Failed to update ingredient";

    setIngredients((prev) =>
      prev
        .map((ing) => (ing.id === editingId ? (body as IngredientDTO) : ing))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    setDeleteError(null);
    const res = await fetch(`/api/ingredients/${id}`, { method: "DELETE" });
    if (res.status === 204) {
      setIngredients((prev) => prev.filter((ing) => ing.id !== id));
      if (editingId === id) setEditingId(null);
      return;
    }
    const body = await res.json();
    if (res.status === 409) {
      const mealNames = (body.meals as { name: string }[]).map((m) => m.name).join(", ");
      setDeleteError(`Can't delete — used by: ${mealNames}. Remove it from those meals first.`);
    } else {
      setDeleteError(body.error ?? "Failed to delete ingredient");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Add ingredient
        </h2>
        <IngredientForm onSubmit={handleCreate} />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Your ingredients ({ingredients.length})
        </h2>
        {deleteError && (
          <p className="mb-2 text-sm text-red-600 dark:text-red-400">{deleteError}</p>
        )}
        <IngredientTable
          ingredients={ingredients}
          editingId={editingId}
          onEdit={setEditingId}
          onCancelEdit={() => setEditingId(null)}
          onSaveEdit={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
