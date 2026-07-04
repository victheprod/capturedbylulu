import { createClient } from "@/lib/supabase/server";

export async function getSiteContent<T = Record<string, unknown>>(
  key: string,
): Promise<T | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .single();

  const row = data as { value: T } | null;
  return row?.value ?? null;
}

export async function upsertSiteContent(
  key: string,
  value: Record<string, unknown>,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("site_content")
    .upsert({ key, value })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllSiteContent(): Promise<
  Record<string, Record<string, unknown>>
> {
  const supabase = await createClient();
  if (!supabase) return {};

  const { data } = await supabase.from("site_content").select("key, value");
  if (!data) return {};

  const rows = data as { key: string; value: Record<string, unknown> }[];
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}
