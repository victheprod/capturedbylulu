import { siteConfig as staticSiteConfig, navLinks, trustItems } from "@/data/site";
import { getAllSettings } from "@/lib/db/settings";
import { getAllSiteContent } from "@/lib/db/content";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type PublicSiteConfig = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  instagramUrl: string;
  facebook?: string;
  tiktok?: string;
  logoUrl?: string;
  faviconUrl?: string;
};

export async function getPublicSiteConfig(): Promise<PublicSiteConfig> {
  if (!isSupabaseConfigured()) {
    return { ...staticSiteConfig };
  }

  try {
    const [settings, content] = await Promise.all([
      getAllSettings(),
      getAllSiteContent(),
    ]);

    const business = settings.business as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
    } | undefined;
    const social = settings.social as {
      instagram?: string;
      instagramUrl?: string;
      facebook?: string;
      tiktok?: string;
    } | undefined;
    const branding = settings.branding as {
      logoUrl?: string;
      faviconUrl?: string;
    } | undefined;
    const seo = content.seo as { description?: string } | undefined;

    return {
      name: business?.name ?? staticSiteConfig.name,
      tagline: staticSiteConfig.tagline,
      description: seo?.description ?? staticSiteConfig.description,
      email: business?.email ?? staticSiteConfig.email,
      phone: business?.phone ?? staticSiteConfig.phone,
      location: business?.address ?? staticSiteConfig.location,
      instagram: social?.instagram ?? staticSiteConfig.instagram,
      instagramUrl: social?.instagramUrl ?? staticSiteConfig.instagramUrl,
      facebook: social?.facebook,
      tiktok: social?.tiktok,
      logoUrl: branding?.logoUrl,
      faviconUrl: branding?.faviconUrl,
    };
  } catch {
    return { ...staticSiteConfig };
  }
}

export { navLinks, trustItems };

export async function getPublicContent<T>(
  key: string,
  fallback: T,
): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;

  try {
    const { getSiteContent } = await import("@/lib/db/content");
    const value = await getSiteContent<T>(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}
