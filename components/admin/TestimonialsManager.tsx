"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { TestimonialRow } from "@/lib/types/database";
import {
  deleteTestimonialAction,
  saveTestimonialAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { EmptyState, GlassPanel } from "@/components/admin/AdminUI";

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: TestimonialRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Partial<TestimonialRow> | null>(null);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.is_featured = form.get("is_featured") === "on";
    payload.rating = Number(payload.rating ?? 5);
    payload.display_order = Number(payload.display_order ?? 0);

    startTransition(async () => {
      try {
        await saveTestimonialAction(payload);
        toast.success("Testimonial saved");
        setEditing(null);
        router.refresh();
      } catch {
        toast.error("Failed to save");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete testimonial?")) return;
    startTransition(async () => {
      try {
        await deleteTestimonialAction(id);
        toast.success("Deleted");
        router.refresh();
      } catch {
        toast.error("Delete failed");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button type="button" onClick={() => setEditing({ rating: 5, is_featured: false })}>
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <EmptyState
          title="No testimonials"
          description="Add client reviews to display on the homepage."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {testimonials.map((t) => (
            <GlassPanel key={t.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{t.client_name}</p>
                  <p className="text-xs text-primary">{t.session_type}</p>
                  <p className="mt-3 text-sm italic text-foreground/70">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-foreground/40">
                    {t.rating} stars {t.is_featured && "· Featured"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => setEditing(t)} className="text-xs text-primary">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(t.id)} className="text-xs text-red-400/80">
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
          <form onSubmit={handleSave} className="w-full max-w-lg border border-foreground/15 bg-card p-6">
            <h3 className="mb-4 font-serif text-xl">Testimonial</h3>
            {editing.id && <input type="hidden" name="id" value={editing.id} />}
            <div className="grid gap-3">
              {[
                ["client_name", "Client Name", editing.client_name],
                ["session_type", "Session Type", editing.session_type],
                ["photo_url", "Photo URL (optional)", editing.photo_url],
                ["rating", "Rating", editing.rating ?? 5, "number"],
                ["display_order", "Display Order", editing.display_order ?? 0, "number"],
              ].map(([name, label, value, type]) => (
                <div key={name as string}>
                  <label className="mb-1 block text-xs uppercase text-foreground/40">{label as string}</label>
                  <input
                    name={name as string}
                    type={(type as string) || "text"}
                    defaultValue={String(value ?? "")}
                    className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                    required={name === "client_name" || name === "session_type"}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs uppercase text-foreground/40">Review</label>
                <textarea
                  name="review"
                  rows={4}
                  defaultValue={editing.review ?? ""}
                  className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input name="is_featured" type="checkbox" defaultChecked={editing.is_featured} />
                Featured on homepage
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit" disabled={pending}>Save</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
