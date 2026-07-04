"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { PortfolioImage } from "@/lib/types/database";
import {
  deletePortfolioAction,
  savePortfolioAction,
  uploadFileAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { EmptyState, GlassPanel } from "@/components/admin/AdminUI";

const CATEGORIES = [
  "Portraits",
  "Families",
  "Weddings",
  "Events",
];

export function PortfolioManager({ images }: { images: PortfolioImage[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Partial<PortfolioImage> | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "portfolio");

    startTransition(async () => {
      try {
        const asset = await uploadFileAction(formData);
        if (!asset) return;
        setEditing({
          title: file.name.replace(/\.[^.]+$/, ""),
          category: "Portraits",
          storage_path: asset.storage_path,
          public_url: asset.public_url,
          display_order: images.length,
          height: 800,
        });
        toast.success("Image uploaded — add details and save");
      } catch {
        toast.error("Upload failed");
      }
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.is_featured = form.get("is_featured") === "on";
    payload.display_order = Number(payload.display_order ?? 0);
    payload.height = Number(payload.height ?? 800);
    payload.tags = String(payload.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        await savePortfolioAction(editing?.id ?? null, payload);
        toast.success("Portfolio image saved");
        setEditing(null);
        router.refresh();
      } catch {
        toast.error("Failed to save");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this image?")) return;
    startTransition(async () => {
      try {
        await deletePortfolioAction(id);
        toast.success("Deleted");
        router.refresh();
      } catch {
        toast.error("Delete failed");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <label className="cursor-pointer border border-primary px-4 py-2 text-sm text-primary">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      {images.length === 0 ? (
        <EmptyState
          title="No portfolio images"
          description="Upload images to manage the portfolio gallery on the public site."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((img) => (
            <GlassPanel key={img.id} className="p-0 overflow-hidden">
              <div className="relative aspect-[4/3] bg-card">
                <Image
                  src={img.public_url}
                  alt={img.alt_text ?? img.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{img.title}</p>
                    <p className="text-xs text-foreground/40">{img.category}</p>
                  </div>
                  {img.is_featured && (
                    <span className="text-[10px] uppercase text-primary">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditing(img)}
                    className="text-xs text-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="text-xs text-red-400/80"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-foreground/15 bg-card p-6"
          >
            <h3 className="mb-4 font-serif text-xl">Portfolio Details</h3>
            <input type="hidden" name="storage_path" value={editing.storage_path ?? ""} />
            <input type="hidden" name="public_url" value={editing.public_url ?? ""} />
            <div className="grid gap-3">
              {[
                ["title", "Title", editing.title],
                ["location", "Location", editing.location],
                ["alt_text", "Alt Text", editing.alt_text],
                ["tags", "Tags (comma-separated)", (editing.tags ?? []).join(", ")],
                ["display_order", "Display Order", editing.display_order ?? 0, "number"],
                ["height", "Height", editing.height ?? 800, "number"],
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
                    required={name === "title"}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs uppercase text-foreground/40">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editing.category ?? "Portraits"}
                  className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  name="is_featured"
                  type="checkbox"
                  defaultChecked={editing.is_featured}
                />
                Featured on homepage
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
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
