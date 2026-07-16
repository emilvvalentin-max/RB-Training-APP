"use client";

import { useState } from "react";
import type { IngredientDTO, IngredientInput } from "@/types";
import BarcodeScanner from "@/components/BarcodeScanner";

const FIELDS: { key: keyof IngredientInput; label: string; suffix: string }[] = [
  { key: "caloriesPer100g", label: "Calories", suffix: "kcal/100g" },
  { key: "proteinPer100g", label: "Protein", suffix: "g/100g" },
  { key: "carbsPer100g", label: "Carbs", suffix: "g/100g" },
  { key: "fatPer100g", label: "Fat", suffix: "g/100g" },
  { key: "fiberPer100g", label: "Fiber", suffix: "g/100g" },
  { key: "pricePer100g", label: "Price", suffix: "$/100g" },
];

const emptyForm = {
  name: "",
  barcode: "",
  caloriesPer100g: "",
  proteinPer100g: "",
  carbsPer100g: "",
  fatPer100g: "",
  fiberPer100g: "",
  pricePer100g: "",
};

function toFormState(ingredient?: IngredientDTO) {
  if (!ingredient) return emptyForm;
  return {
    name: ingredient.name,
    barcode: ingredient.barcode ?? "",
    caloriesPer100g: String(ingredient.caloriesPer100g),
    proteinPer100g: String(ingredient.proteinPer100g),
    carbsPer100g: String(ingredient.carbsPer100g),
    fatPer100g: String(ingredient.fatPer100g),
    fiberPer100g: String(ingredient.fiberPer100g),
    pricePer100g: String(ingredient.pricePer100g),
  };
}

interface BarcodeLookupResponse {
  existingIngredient: { id: string; name: string } | null;
  off: {
    found: boolean;
    name?: string;
    caloriesPer100g?: number;
    proteinPer100g?: number;
    carbsPer100g?: number;
    fatPer100g?: number;
    fiberPer100g?: number;
  };
}

export default function IngredientForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: IngredientDTO;
  onSubmit: (data: IngredientInput) => Promise<string | void>;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState(toFormState(initial));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupNote, setLookupNote] = useState<string | null>(null);

  const isEdit = Boolean(initial);

  async function handleLookup(rawCode: string) {
    const code = rawCode.trim();
    if (!code) return;
    setError(null);
    setLookupNote(null);
    setLookingUp(true);
    try {
      const res = await fetch(`/api/barcode/${encodeURIComponent(code)}`);
      const body: BarcodeLookupResponse = await res.json();

      setForm((f) => ({ ...f, barcode: code }));

      if (body.existingIngredient) {
        setLookupNote(`Already in your list as "${body.existingIngredient.name}"`);
      }

      if (body.off.found) {
        setForm((f) => ({
          ...f,
          name: body.off.name ?? f.name,
          caloriesPer100g: String(body.off.caloriesPer100g ?? 0),
          proteinPer100g: String(body.off.proteinPer100g ?? 0),
          carbsPer100g: String(body.off.carbsPer100g ?? 0),
          fatPer100g: String(body.off.fatPer100g ?? 0),
          fiberPer100g: String(body.off.fiberPer100g ?? 0),
        }));
      } else {
        setError("No product found for that barcode — enter details manually.");
      }
    } catch {
      setError("Lookup failed — check your connection and try again.");
    } finally {
      setLookingUp(false);
    }
  }

  function handleDetected(code: string) {
    setScannerOpen(false);
    handleLookup(code);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.name.trim().length === 0) {
      setError("Name is required");
      return;
    }

    const numericValues: Record<string, number> = {};
    for (const field of FIELDS) {
      const raw = form[field.key];
      const value = Number(raw);
      if (raw.trim() === "" || Number.isNaN(value) || value < 0) {
        setError(`${field.label} must be a non-negative number`);
        return;
      }
      numericValues[field.key] = value;
    }

    setSaving(true);
    const submitError = await onSubmit({
      name: form.name.trim(),
      barcode: form.barcode.trim() || null,
      caloriesPer100g: numericValues.caloriesPer100g,
      proteinPer100g: numericValues.proteinPer100g,
      carbsPer100g: numericValues.carbsPer100g,
      fatPer100g: numericValues.fatPer100g,
      fiberPer100g: numericValues.fiberPer100g,
      pricePer100g: numericValues.pricePer100g,
    });
    setSaving(false);

    if (submitError) {
      setError(submitError);
      return;
    }

    if (!isEdit) {
      setForm(emptyForm);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. Chicken breast"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Barcode</label>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            value={form.barcode}
            onChange={(e) => setForm((f) => ({ ...f, barcode: e.target.value }))}
            placeholder="e.g. 5000112637922"
            className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
          <button
            type="button"
            onClick={() => handleLookup(form.barcode)}
            disabled={lookingUp || form.barcode.trim().length === 0}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {lookingUp ? "Looking up…" : "Look up"}
          </button>
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Scan
          </button>
        </div>
        {lookupNote && <p className="text-sm text-strava">{lookupNote}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FIELDS.map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {field.label} <span className="text-zinc-400">({field.suffix})</span>
            </label>
            <input
              type="number"
              step="any"
              inputMode="decimal"
              value={form[field.key]}
              onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
            {field.key === "fiberPer100g" && (
              <p className="text-xs text-zinc-400">
                Often missing from barcode lookups — may default to 0, double-check it.
              </p>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {scannerOpen && (
        <BarcodeScanner onDetected={handleDetected} onClose={() => setScannerOpen(false)} />
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-strava px-4 py-2 text-sm font-medium text-white hover:bg-strava-dark disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add ingredient"}
        </button>
        {isEdit && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
