"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IngredientDTO, MealDTO } from "@/types";
import MealDetail from "@/components/MealDetail";
import MealBuilder from "@/components/MealBuilder";

export default function MealDetailView({
  meal,
  allIngredients,
}: {
  meal: MealDTO;
  allIngredients: IngredientDTO[];
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    const res = await fetch(`/api/meals/${meal.id}`, { method: "DELETE" });
    if (res.status === 204) {
      router.push("/meals");
      router.refresh();
      return;
    }
    const body = await res.json();
    setDeleting(false);
    setError(body.error ?? "Failed to delete meal");
  }

  if (isEditing) {
    return (
      <MealBuilder
        mode="edit"
        mealId={meal.id}
        initial={meal}
        allIngredients={allIngredients}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <MealDetail meal={meal} />

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          {deleting ? "Deleting…" : "Delete meal"}
        </button>
      </div>
    </div>
  );
}
