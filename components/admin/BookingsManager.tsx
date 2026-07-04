"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Booking, BookingStatus } from "@/lib/types/database";
import {
  deleteBookingAction,
  saveBookingAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";

const STATUSES: BookingStatus[] = [
  "New",
  "Contacted",
  "Booked",
  "Completed",
  "Cancelled",
];

type Props = {
  bookings: Booking[];
  total: number;
  page: number;
  search: string;
  status: string;
};

export function BookingsManager({
  bookings,
  total,
  page,
  search,
  status,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Booking | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / 10));

  const updateFilters = (next: Record<string, string>) => {
    const params = new URLSearchParams();
    if (next.search ?? search) params.set("search", next.search ?? search);
    if ((next.status ?? status) !== "all")
      params.set("status", next.status ?? status);
    if (next.page) params.set("page", next.page);
    router.push(`/admin/bookings?${params.toString()}`);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this booking?")) return;
    startTransition(async () => {
      try {
        await deleteBookingAction(id);
        toast.success("Booking deleted");
        router.refresh();
      } catch {
        toast.error("Failed to delete booking");
      }
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    startTransition(async () => {
      try {
        await saveBookingAction(editing?.id ?? null, payload);
        toast.success(editing ? "Booking updated" : "Booking created");
        setEditing(null);
        router.refresh();
      } catch {
        toast.error("Failed to save booking");
      }
    });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          defaultValue={search}
          placeholder="Search name, email, phone..."
          className="flex-1 border border-foreground/12 bg-background px-3 py-2 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilters({ search: (e.target as HTMLInputElement).value, page: "1" });
            }
          }}
        />
        <select
          defaultValue={status}
          onChange={(e) => updateFilters({ status: e.target.value, page: "1" })}
          className="border border-foreground/12 bg-background px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <Button type="button" onClick={() => setEditing({} as Booking)}>
          Add Booking
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-foreground/10 text-[10px] tracking-wider uppercase text-foreground/40">
              <th className="px-3 py-3">Client</th>
              <th className="px-3 py-3">Session</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-foreground/8">
                <td className="px-3 py-3">
                  <p>{booking.client_name}</p>
                  <p className="text-xs text-foreground/40">{booking.email}</p>
                </td>
                <td className="px-3 py-3">
                  <p>{booking.session_type}</p>
                  <p className="text-xs text-foreground/40">{booking.package}</p>
                </td>
                <td className="px-3 py-3">{booking.preferred_date}</td>
                <td className="px-3 py-3">
                  <span className="text-[10px] tracking-wider uppercase text-primary">
                    {booking.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(booking)}
                      className="text-xs text-foreground/55 hover:text-primary"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(booking.id)}
                      className="text-xs text-red-400/80 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-foreground/45">
        <span>
          Page {page} of {totalPages} · {total} total
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => updateFilters({ page: String(page - 1) })}
            className="border border-foreground/12 px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => updateFilters({ page: String(page + 1) })}
            className="border border-foreground/12 px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-foreground/15 bg-card p-6"
          >
            <h3 className="mb-4 font-serif text-xl">
              {editing.id ? "Edit Booking" : "New Booking"}
            </h3>
            <div className="grid gap-3">
              {[
                ["client_name", "Client Name", editing.client_name],
                ["email", "Email", editing.email],
                ["phone", "Phone", editing.phone],
                ["session_type", "Session Type", editing.session_type],
                ["package", "Package", editing.package],
                ["preferred_date", "Preferred Date", editing.preferred_date, "date"],
                ["location", "Location", editing.location],
                ["message", "Message", editing.message],
              ].map(([name, label, value, type]) => (
                <div key={name as string}>
                  <label className="mb-1 block text-xs uppercase tracking-wide text-foreground/40">
                    {label as string}
                  </label>
                  <input
                    name={name as string}
                    type={(type as string) || "text"}
                    defaultValue={(value as string) ?? ""}
                    className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-foreground/40">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editing.status ?? "New"}
                  className="w-full border border-foreground/12 bg-background px-3 py-2 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
              >
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
