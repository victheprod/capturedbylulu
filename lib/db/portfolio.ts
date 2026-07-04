import { createClient } from "@/lib/supabase/server";
import type { PortfolioImage } from "@/lib/types/database";

export async function listPortfolioImages(): Promise<PortfolioImage[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("portfolio_images")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return (data as PortfolioImage[]) ?? [];
}

export async function getPortfolioImage(id: string) {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("portfolio_images")
    .select("*")
    .eq("id", id)
    .single();

  return data as PortfolioImage | null;
}

export async function createPortfolioImage(
  input: Omit<PortfolioImage, "id" | "created_at" | "updated_at"> & {
    id?: string;
  },
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("portfolio_images")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as PortfolioImage;
}

export async function updatePortfolioImage(
  id: string,
  updates: Partial<PortfolioImage>,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("portfolio_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as PortfolioImage;
}

export async function deletePortfolioImage(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase
    .from("portfolio_images")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getPortfolioCount(): Promise<number> {
  const supabase = await createClient();
  if (!supabase) return 0;

  const { count } = await supabase
    .from("portfolio_images")
    .select("*", { count: "exact", head: true });

  return count ?? 0;
}

export async function getPortfolioCategoryDistribution() {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase.from("portfolio_images").select("category");
  const rows = (data as { category: string }[]) ?? [];
  if (!rows.length) return [];

  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.category] = (counts[row.category] ?? 0) + 1;
  }

  return Object.entries(counts).map(([category, count]) => ({
    category,
    count,
  }));
}

export async function reorderPortfolioImages(
  orderedIds: { id: string; display_order: number }[],
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  for (const item of orderedIds) {
    const { error } = await supabase
      .from("portfolio_images")
      .update({ display_order: item.display_order })
      .eq("id", item.id);
    if (error) throw error;
  }
}
