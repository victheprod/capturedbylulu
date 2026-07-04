import { createClient } from "@/lib/supabase/server";
import type { PackageCategoryRow, PackageRow } from "@/lib/types/database";

export async function listPackageCategories(
  withInactive = false,
): Promise<PackageCategoryRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  let query = supabase
    .from("package_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (!withInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as PackageCategoryRow[]) ?? [];
}

export async function listPackages(
  withInactive = false,
): Promise<PackageRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  let query = supabase
    .from("packages")
    .select("*")
    .order("display_order", { ascending: true });

  if (!withInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as PackageRow[]) ?? [];
}

export async function getActivePackageCount(): Promise<number> {
  const supabase = await createClient();
  if (!supabase) return 0;

  const { count } = await supabase
    .from("packages")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  return count ?? 0;
}

export async function upsertPackageCategory(
  input: Record<string, unknown>,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("package_categories")
    .upsert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upsertPackage(input: Record<string, unknown>) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("packages")
    .upsert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePackage(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw error;
}

export async function deletePackageCategory(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase
    .from("package_categories")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
