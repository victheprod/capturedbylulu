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

/** Canonical quotes when CMS copy drifted from approved client wording */
const canonicalQuotesByName: Record<string, string> = Object.fromEntries(
  staticTestimonials.map((t) => [t.name, t.quote]),
);

function normalizeQuote(name: string, quote: string): string {
  const canonical = canonicalQuotesByName[name];
  if (!canonical) return quote;

  const usesFeminine = /\b(she|her|she's)\b/i.test(quote);
  const usesMasculine = /\b(he|him|he's)\b/i.test(quote);
  if (usesFeminine && !usesMasculine) return canonical;

  return quote;
}

function mapStatic(items: typeof staticTestimonials): PublicTestimonial[] {
  return items.map(({ name, type, quote, stars }) => ({
    name,
    type,
    quote: normalizeQuote(name, quote),
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
      quote: normalizeQuote(t.client_name, t.review),
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
      quote: normalizeQuote(t.client_name, t.review),
      stars: t.rating,
      photoUrl: t.photo_url ?? undefined,
    }));
  } catch {
    return mapStatic(featuredTestimonials);
  }
}
