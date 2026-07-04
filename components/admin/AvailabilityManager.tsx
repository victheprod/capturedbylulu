"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { AvailabilityBlock } from "@/lib/types/database";
import {
  deleteAvailabilityAction,
  saveAvailabilityAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/admin/AdminUI";

export function AvailabilityManager({ blocks }: { blocks: AvailabilityBlock[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [date, setDate] = useState("");
  const [type, setType] = useState<"blocked" | "vacation" | "booked">("blocked");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!date) return;
    startTransition(async () => {
      try {
        await saveAvailabilityAction({ block_date: date, block_type: type, note });
        toast.success("Date blocked");
        setDate("");
        setNote("");
        router.refresh();
      } catch {
        toast.error("Failed to block date");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteAvailabilityAction(id);
        toast.success("Removed");
        router.refresh();
      } catch {
        toast.error("Failed to remove");
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <GlassPanel>
        <h3 className="mb-4 font-serif text-xl">Block a Date</h3>
        <div className="space-y-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm [color-scheme:dark]"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
          >
            <option value="blocked">Blocked</option>
            <option value="vacation">Vacation</option>
            <option value="booked">Booked</option>
          </select>
          <input
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
          />
          <Button type="button" onClick={handleAdd} disabled={pending || !date} fullWidth>
            Add Block
          </Button>
        </div>
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-4 font-serif text-xl">Blocked Dates</h3>
        {blocks.length === 0 ? (
          <p className="text-sm text-foreground/45">No blocked dates yet.</p>
        ) : (
          <ul className="space-y-2">
            {blocks.map((block) => (
              <li
                key={block.id}
                className="flex items-center justify-between border border-foreground/10 px-4 py-3 text-sm"
              >
                <div>
                  <p>{block.block_date}</p>
                  <p className="text-xs capitalize text-foreground/40">
                    {block.block_type}
                    {block.note ? ` · ${block.note}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(block.id)}
                  className="text-xs text-red-400/80"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </GlassPanel>
    </div>
  );
}
