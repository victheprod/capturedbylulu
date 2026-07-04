import { createClient } from "@/lib/supabase/server";

export type SiteSettings = {
  business: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  social: {
    instagram: string;
    instagramUrl: string;
    facebook: string;
    tiktok: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  branding: {
    logoUrl: string;
    faviconUrl: string;
  };
};

export async function getSetting<T = Record<string, unknown>>(
  key: string,
): Promise<T | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  const row = data as { value: T } | null;
  return row?.value ?? null;
}

export async function getAllSettings(): Promise<Partial<SiteSettings>> {
  const supabase = await createClient();
  if (!supabase) return {};

  const { data } = await supabase.from("site_settings").select("key, value");
  if (!data) return {};

  const rows = data as { key: string; value: Record<string, unknown> }[];
  return Object.fromEntries(
    rows.map((row) => [row.key, row.value]),
  ) as Partial<SiteSettings>;
}

export async function upsertSetting(
  key: string,
  value: Record<string, unknown>,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ key, value })
    .select()
    .single();

  if (error) throw error;
  return data;
}
