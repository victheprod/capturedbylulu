import type { Booking } from "@/lib/types/database";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export type BookingFilters = {
  search?: string;
  status?: Booking["status"] | "all";
  page?: number;
  pageSize?: number;
};

export async function listBookings(filters: BookingFilters = {}): Promise<{
  data: Booking[];
  count: number;
}> {
  const supabase = await createClient();
  if (!supabase) return { data: [], count: 0 };

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.search) {
    query = query.or(
      `client_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`,
    );
  }

  const { data, count, error } = await query;
  if (error) throw error;
  return { data: (data as Booking[]) ?? [], count: count ?? 0 };
}

export async function getBooking(id: string) {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Booking;
}

export async function createBookingFromInquiry(input: {
  client_name: string;
  email: string;
  phone: string;
  session_type: string;
  package: string;
  preferred_date: string;
  location?: string;
  message?: string;
}) {
  const supabase = createServiceClient() ?? (await createClient());
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...input, status: "New" })
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(
  id: string,
  updates: Record<string, unknown>,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
}

export async function getBookingStats(): Promise<{
  total: number;
  upcoming: number;
  recent: Booking[];
}> {
  const supabase = await createClient();
  if (!supabase) {
    return { total: 0, upcoming: 0, recent: [] };
  }

  const today = new Date().toISOString().split("T")[0];

  const [totalRes, upcomingRes, recentRes] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte("preferred_date", today)
      .in("status", ["New", "Contacted", "Booked"]),
    supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    total: totalRes.count ?? 0,
    upcoming: upcomingRes.count ?? 0,
    recent: (recentRes.data as Booking[]) ?? [],
  };
}

export async function getMonthlyInquiries() {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at")
    .gte("created_at", new Date(Date.now() - 365 * 86400000).toISOString());

  const rows = (data as { created_at: string }[]) ?? [];
  if (error || !rows.length) return [];

  const months: Record<string, number> = {};
  for (const row of rows) {
    const month = row.created_at.slice(0, 7);
    months[month] = (months[month] ?? 0) + 1;
  }

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, count]) => ({ month, count }));
}

export async function getPopularPackage() {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase.from("bookings").select("package");
  const rows = (data as { package: string }[]) ?? [];
  if (!rows.length) return null;

  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.package] = (counts[row.package] ?? 0) + 1;
  }

  const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
  return sorted[0]?.[0] ?? null;
}
