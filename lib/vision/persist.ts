import type { VisionRecord } from "./types";

/**
 * Placeholder for future Supabase / Firebase persistence.
 * Wire this up when a visions table or collection is ready.
 */
export async function saveVisionToDatabase(record: VisionRecord): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.info("[vision] saveVisionToDatabase placeholder", record);
  }
  // TODO: Supabase insert — e.g. supabase.from('vision_sessions').insert(record)
  // TODO: Firebase — e.g. addDoc(collection(db, 'vision_sessions'), record)
}
