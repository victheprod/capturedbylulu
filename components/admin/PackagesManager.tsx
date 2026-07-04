"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { PackageCategoryRow, PackageRow } from "@/lib/types/database";
import {
  deletePackageAction,
  savePackageAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/admin/AdminUI";

type Props = {
  categories: PackageCategoryRow[];
  packages: PackageRow[];
};

export function PackagesManager({ categories, packages }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editingPkg, setEditingPkg] = useState<Partial<PackageRow> | null>(null);

  const handleSavePackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.is_popular = form.get("is_popular") === "on";
    payload.is_active = form.get("is_active") === "on";
    payload.display_order = Number(payload.display_order ?? 0);
    payload.features = String(payload.features ?? "")
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        await savePackageAction(payload);
        toast.success("Package saved");
        setEditingPkg(null);
        router.refresh();
      } catch {
        toast.error("Failed to save package");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete package?")) return;
    startTransition(async () => {
      try {
        await deletePackageAction(id);
        toast.success("Deleted");
        router.refresh();
      } catch {
        toast.error("Delete failed");
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            setEditingPkg({
              id: `pkg-${Date.now()}`,
              category_id: categories[0]?.id ?? "portraits",
              is_active: true,
            })
          }
        >
          Add Package
        </Button>
      </div>

      {categories.map((cat) => {
        const catPackages = packages.filter((p) => p.category_id === cat.id);
        return (
          <GlassPanel key={cat.id}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl">{cat.name}</h3>
                <p className="text-xs text-foreground/40">
                  {cat.is_active ? "Active" : "Inactive"} · Order {cat.display_order}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {catPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between border border-foreground/10 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">
                      {pkg.name}{" "}
                      <span className="text-primary">{pkg.price}</span>
                      {pkg.is_popular && (
                        <span className="ml-2 text-[10px] uppercase text-primary">
                          Popular
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-foreground/40">{pkg.duration}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(pkg)}
                      className="text-xs text-primary"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(pkg.id)}
                      className="text-xs text-red-400/80"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {catPackages.length === 0 && (
                <p className="text-sm text-foreground/40">No packages in this category.</p>
              )}
            </div>
          </GlassPanel>
        );
      })}

      {editingPkg && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSavePackage}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-foreground/15 bg-card p-6"
          >
            <h3 className="mb-4 font-serif text-xl">Edit Package</h3>
            <div className="grid gap-3">
              <input name="id" type="hidden" value={editingPkg.id} />
              <div>
                <label className="mb-1 block text-xs uppercase text-foreground/40">
                  Category
                </label>
                <select
                  name="category_id"
                  defaultValue={editingPkg.category_id}
                  className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {[
                ["name", "Name", editingPkg.name],
                ["price", "Price", editingPkg.price],
                ["duration", "Duration", editingPkg.duration],
                ["description", "Description", editingPkg.description],
                ["display_order", "Display Order", editingPkg.display_order ?? 0, "number"],
              ].map(([name, label, value, type]) => (
                <div key={name as string}>
                  <label className="mb-1 block text-xs uppercase text-foreground/40">
                    {label as string}
                  </label>
                  <input
                    name={name as string}
                    type={(type as string) || "text"}
                    defaultValue={String(value ?? "")}
                    className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                    required={name === "name" || name === "price"}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs uppercase text-foreground/40">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  rows={4}
                  defaultValue={(editingPkg.features ?? []).join("\n")}
                  className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input name="is_popular" type="checkbox" defaultChecked={editingPkg.is_popular} />
                Popular
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input name="is_active" type="checkbox" defaultChecked={editingPkg.is_active ?? true} />
                Active
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditingPkg(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
