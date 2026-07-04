import { getBlockedDates, isDateAvailable } from "@/lib/db/availability";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function getPublicBlockedDates(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    return await getBlockedDates();
  } catch {
    return [];
  }
}

export async function checkDateAvailability(date: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;
  try {
    return await isDateAvailable(date);
  } catch {
    return true;
  }
}
