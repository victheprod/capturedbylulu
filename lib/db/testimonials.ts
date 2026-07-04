import { createClient } from "@/lib/supabase/server";
import type { TestimonialRow } from "@/lib/types/database";

export async function listTestimonials(
  featuredOnly = false,
): Promise<TestimonialRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  let query = supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (featuredOnly) {
    query = query.eq("is_featured", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as TestimonialRow[]) ?? [];
}

export async function upsertTestimonial(input: Record<string, unknown>) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("testimonials")
    .upsert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
