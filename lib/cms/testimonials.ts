import {
  featuredTestimonials,
  testimonials as staticTestimonials,
} from "@/data/testimonials";
import { listTestimonials } from "@/lib/db/testimonials";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type PublicTestimonial = {
  name: string;
  type: string;
  quote: string;
  stars: number;
  photoUrl?: string;
};

function mapStatic(items: typeof staticTestimonials): PublicTestimonial[] {
  return items.map(({ name, type, quote, stars }) => ({
    name,
    type,
    quote,
    stars,
  }));
}

export async function getPublicTestimonials(
  featuredOnly = false,
): Promise<PublicTestimonial[]> {
  if (!isSupabaseConfigured()) {
    return mapStatic(featuredOnly ? featuredTestimonials : staticTestimonials);
  }

  try {
    const rows = await listTestimonials(featuredOnly);
    if (!rows.length) {
      return mapStatic(featuredOnly ? featuredTestimonials : staticTestimonials);
    }

    return rows.map((t) => ({
      name: t.client_name,
      type: t.session_type,
      quote: t.review,
      stars: t.rating,
      photoUrl: t.photo_url ?? undefined,
    }));
  } catch {
    return mapStatic(featuredOnly ? featuredTestimonials : staticTestimonials);
  }
}

/** Homepage: three client stories in the classic 3-column row */
export async function getFeaturedTestimonials(): Promise<PublicTestimonial[]> {
  if (!isSupabaseConfigured()) {
    return mapStatic(featuredTestimonials);
  }

  try {
    const rows = await listTestimonials(true);
    if (!rows.length) {
      return mapStatic(featuredTestimonials);
    }

    return rows.map((t) => ({
      name: t.client_name,
      type: t.session_type,
      quote: t.review,
      stars: t.rating,
      photoUrl: t.photo_url ?? undefined,
    }));
  } catch {
    return mapStatic(featuredTestimonials);
  }
}
