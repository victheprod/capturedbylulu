import { createClient } from "@/lib/supabase/server";
import type { MediaAsset } from "@/lib/types/database";

export async function listMediaAssets(search?: string): Promise<MediaAsset[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  let query = supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `filename.ilike.%${search}%,alt_text.ilike.%${search}%`,
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as MediaAsset[]) ?? [];
}

export async function createMediaAsset(input: {
  filename: string;
  storage_path: string;
  public_url: string;
  mime_type?: string;
  size_bytes?: number;
  alt_text?: string;
}) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("media_assets")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as MediaAsset;
}

export async function deleteMediaAsset(id: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadToStorage(
  bucket: "portfolio" | "media" | "branding",
  path: string,
  file: File | Blob,
  contentType: string,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return { path: data.path, publicUrl };
}

export async function deleteFromStorage(
  bucket: "portfolio" | "media" | "branding",
  path: string,
) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
