import { createClient } from "@/lib/supabase/server";
import type { AvailabilityBlock, AvailabilityBlockType } from "@/lib/types/database";

export async function listAvailabilityBlocks(): Promise<AvailabilityBlock[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("availability_blocks")
    .select("*")
    .order("block_date", { ascending: true });

  if (error) throw error;
  return (data as AvailabilityBlock[]) ?? [];
}

export async function getBlockedDates(): Promise<string[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("availability_blocks")
    .select("block_date");
  const rows = (data as { block_date: string }[]) ?? [];
  return rows.map((row) => row.block_date);
}

export async function isDateAvailable(date: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return true;

  const { data } = await supabase
    .from("availability_blocks")
    .select("id")
    .eq("block_date", date)
    .maybeSingle();

  return !data;
}

export async function upsertAvailabilityBlock(input: {
  block_date: string;
  block_type: AvailabilityBlockType;
  note?: string;
}) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("availability_blocks")
    .upsert(input, { onConflict: "block_date" })
    .select()
    .single();

  if (error) throw error;
  return data as AvailabilityBlock;
}

export async function deleteAvailabilityBlock(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase
    .from("availability_blocks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
