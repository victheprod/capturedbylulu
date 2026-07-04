import {
  portfolioFilters,
  portfolioItems as staticItems,
  homePortfolioPreview as staticPreview,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";
import { listPortfolioImages } from "@/lib/db/portfolio";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { portfolioImageUrl } from "@/lib/utils";

export type PublicPortfolioItem = {
  id: string;
  category: Exclude<PortfolioCategory, "All">;
  width: number;
  height: number;
  imageUrl: string;
  title?: string;
  altText?: string;
  isFeatured?: boolean;
};

export type PublicPortfolioPreview = {
  id: string;
  label: string;
  imageUrl: string;
  tall?: boolean;
  href?: string;
};

const VALID_CATEGORIES = [
  "Weddings",
  "Portraits",
  "Families",
  "Events",
] as const;

function normalizeCategory(
  category: string,
): Exclude<PortfolioCategory, "All"> {
  if (category === "Families" || category === "Family") return "Families";
  if (category === "Branding" || category === "Brand") return "Portraits";
  if (category === "Headshots") return "Portraits";
  return VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])
    ? (category as Exclude<PortfolioCategory, "All">)
    : "Portraits";
}

function mapStaticItem(item: PortfolioItem): PublicPortfolioItem {
  return {
    id: item.id,
    category: item.category,
    width: item.width,
    height: item.height,
    imageUrl: portfolioImageUrl(item),
  };
}

function mapStaticPreview(
  item: (typeof staticPreview)[number],
): PublicPortfolioPreview {
  return {
    id: item.id,
    label: item.label,
    tall: item.tall,
    imageUrl: item.src,
    href: item.href,
  };
}

export async function getPublicPortfolioItems(): Promise<PublicPortfolioItem[]> {
  if (!isSupabaseConfigured()) {
    return staticItems.map(mapStaticItem);
  }

  try {
    const images = await listPortfolioImages();
    if (!images.length) {
      return staticItems.map(mapStaticItem);
    }

    return images.map((img) => ({
      id: img.id,
      category: normalizeCategory(img.category),
      width: Math.round((img.height * 2) / 3),
      height: img.height,
      imageUrl: img.public_url,
      title: img.title,
      altText: img.alt_text ?? undefined,
      isFeatured: img.is_featured,
    }));
  } catch {
    return staticItems.map(mapStaticItem);
  }
}

export async function getPublicPortfolioPreview(): Promise<
  PublicPortfolioPreview[]
> {
  if (!isSupabaseConfigured()) {
    return staticPreview.map(mapStaticPreview);
  }

  try {
    const images = await listPortfolioImages();
    const featured = images.filter((i) => i.is_featured).slice(0, 6);
    const source = featured.length >= 4 ? featured : images.slice(0, 6);

    if (!source.length) {
      return staticPreview.map(mapStaticPreview);
    }

    return source.map((img, i) => ({
      id: img.id,
      label: img.category,
      tall: i === 0,
      imageUrl: img.public_url,
    }));
  } catch {
    return staticPreview.map(mapStaticPreview);
  }
}

export { portfolioFilters };

export function toLegacyPortfolioItems(
  items: PublicPortfolioItem[],
): PortfolioItem[] {
  return items.map(({ id, category, width, height, imageUrl }) => ({
    id,
    src: imageUrl,
    category,
    width,
    height,
  }));
}
