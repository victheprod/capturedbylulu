import {
  type Package,
  type PackageCategory,
  type BookingPackageGroup,
  getBookingPackageGroups as getStaticBookingGroups,
  getSessionTypes as getStaticSessionTypes,
  getPackageEntryById as getStaticPackageEntry,
  getPackageBookingValue as getStaticBookingValue,
  servicesPageCategories,
  weddingsPageCategories,
  brandPackages,
  portraitPackages,
  familyPackages,
  eventPackages,
  weddingPackages,
  preWeddingPackages,
  headshotPackages,
  NOT_SURE_PACKAGE,
} from "@/data/packages";
import { listPackageCategories, listPackages } from "@/lib/db/packages";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function mapDbToPackage(
  row: {
    id: string;
    name: string;
    price: string;
    description: string | null;
    duration: string;
    features: string[];
    is_popular: boolean;
  },
): Package {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    duration: row.duration,
    popular: row.is_popular,
    features: row.features ?? [],
    details: row.description ?? undefined,
  };
}

export async function getPublicPackageCategories(): Promise<PackageCategory[]> {
  if (!isSupabaseConfigured()) {
    return servicesPageCategories;
  }

  try {
    const [categories, packages] = await Promise.all([
      listPackageCategories(false),
      listPackages(false),
    ]);

    if (!categories.length || !packages.length) {
      return servicesPageCategories;
    }

    return categories.map((cat) => ({
      id: cat.id,
      category: cat.name,
      note: cat.note ?? undefined,
      linkHref: cat.link_href ?? undefined,
      linkLabel: cat.link_label ?? undefined,
      packages: packages
        .filter((p) => p.category_id === cat.id)
        .sort((a, b) => a.display_order - b.display_order)
        .map(mapDbToPackage),
    }));
  } catch {
    return servicesPageCategories;
  }
}

export async function getPublicWeddingCategories(): Promise<PackageCategory[]> {
  if (!isSupabaseConfigured()) return weddingsPageCategories;

  const all = await getPublicPackageCategories();
  const wedding = all.filter((c) =>
    ["Weddings", "Pre-Wedding"].includes(c.category),
  );
  return wedding.length ? wedding : weddingsPageCategories;
}

export async function getPublicBrandPackages(): Promise<Package[]> {
  if (!isSupabaseConfigured()) return brandPackages;

  const all = await getPublicPackageCategories();
  const brand = all.find((c) => c.category === "Brand Photography");
  return brand?.packages.length ? brand.packages : brandPackages;
}

export async function getPublicBookingPackageGroups(): Promise<
  BookingPackageGroup[]
> {
  if (!isSupabaseConfigured()) return getStaticBookingGroups();

  try {
    const [categories, packages] = await Promise.all([
      listPackageCategories(false),
      listPackages(false),
    ]);

    if (!categories.length) return getStaticBookingGroups();

    return categories.map((cat) => ({
      category: cat.name,
      packages: packages
        .filter((p) => p.category_id === cat.id)
        .sort((a, b) => a.display_order - b.display_order)
        .map((p) => ({
          id: p.id,
          label: `${p.name} (${p.price})`,
        })),
    }));
  } catch {
    return getStaticBookingGroups();
  }
}

export async function getPublicSessionTypes(): Promise<string[]> {
  const groups = await getPublicBookingPackageGroups();
  if (groups.length) return groups.map((g) => g.category);
  return getStaticSessionTypes();
}

export async function getPublicPackageEntryById(id: string) {
  if (!isSupabaseConfigured()) return getStaticPackageEntry(id);

  try {
    const [categories, packages] = await Promise.all([
      listPackageCategories(false),
      listPackages(false),
    ]);

    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return getStaticPackageEntry(id);

    const cat = categories.find((c) => c.id === pkg.category_id);
    if (!cat) return getStaticPackageEntry(id);

    return {
      category: cat.name,
      pkg: mapDbToPackage(pkg),
    };
  } catch {
    return getStaticPackageEntry(id);
  }
}

export async function getPublicPackageBookingValue(
  category: string,
  pkg: Package,
): Promise<string> {
  return getStaticBookingValue(category, pkg);
}

export async function getActivePackageCount(): Promise<number> {
  if (!isSupabaseConfigured()) {
    return [
      ...portraitPackages,
      ...familyPackages,
      ...eventPackages,
      ...weddingPackages,
      ...preWeddingPackages,
      ...headshotPackages,
      ...brandPackages,
    ].length;
  }

  const packages = await listPackages(false);
  return packages.length || [
    ...portraitPackages,
    ...familyPackages,
    ...eventPackages,
    ...weddingPackages,
    ...preWeddingPackages,
    ...headshotPackages,
    ...brandPackages,
  ].length;
}

export { NOT_SURE_PACKAGE };
