export type Package = {
  id: string;
  name: string;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
  details?: string;
};

export type PackageCategory = {
  id: string;
  category: string;
  packages: Package[];
  note?: string;
  linkHref?: string;
  linkLabel?: string;
};

export type BookingPackageGroup = {
  category: string;
  packages: { id: string; label: string }[];
};

export const pricingNotes = {
  serviceArea: "Serving San Antonio and surrounding areas.",
  deposit:
    "A deposit may be required to reserve your date. Final details are confirmed during inquiry.",
} as const;

export const portraitPackages: Package[] = [
  {
    id: "portrait-mini",
    name: "Mini",
    price: "$125",
    duration: "20 minutes",
    features: ["5 edited photos", "1 outfit", "Online gallery"],
  },
  {
    id: "portrait-basic",
    name: "Basic",
    price: "$200",
    duration: "40 minutes",
    features: ["10 edited photos", "1 outfit", "Online gallery"],
  },
  {
    id: "portrait-standard",
    name: "Standard",
    price: "$275",
    duration: "60 minutes",
    popular: true,
    features: [
      "20 edited photos",
      "2 outfits",
      "Online gallery",
      "Light retouching",
    ],
  },
  {
    id: "portrait-premium",
    name: "Premium",
    price: "$400",
    duration: "90 minutes",
    features: [
      "30 edited photos",
      "3 outfits",
      "Online gallery + print release",
      "Advanced retouching",
    ],
  },
  {
    id: "portrait-luxury",
    name: "Luxury",
    price: "$550",
    duration: "2 hours",
    features: [
      "40+ edited photos",
      "Unlimited outfits",
      "Multiple locations",
      "Priority editing",
    ],
  },
];

export const familyPackages: Package[] = [
  {
    id: "family-small",
    name: "Small Family",
    price: "$300",
    duration: "45 minutes",
    features: ["Up to 5 people", "12 edited photos"],
  },
  {
    id: "family-standard",
    name: "Standard Family",
    price: "$425",
    duration: "60 minutes",
    popular: true,
    features: ["Up to 8 people", "20 edited photos"],
  },
  {
    id: "family-extended",
    name: "Extended Family",
    price: "$600",
    duration: "90 minutes",
    features: ["8+ people", "30 edited photos"],
  },
];

export const eventPackages: Package[] = [
  {
    id: "event-2hr",
    name: "2 Hour Coverage",
    price: "$300",
    duration: "2 hours",
    features: [
      "1 photographer",
      "40–50 edited images",
      "Online gallery",
    ],
  },
  {
    id: "event-4hr",
    name: "4 Hour Coverage",
    price: "$550",
    duration: "4 hours",
    popular: true,
    features: [
      "Full event coverage",
      "80–100 edited images",
      "Online gallery",
    ],
  },
  {
    id: "event-6hr",
    name: "6 Hour Coverage",
    price: "$800",
    duration: "6 hours",
    features: [
      "Full event coverage",
      "Priority editing",
      "120–150 edited images",
      "Online gallery",
    ],
  },
  {
    id: "event-full-day",
    name: "Full Day Event",
    price: "$1,000+",
    duration: "Full day",
    features: [
      "Full event coverage",
      "Priority editing",
      "200–250 edited images",
      "Online gallery",
    ],
  },
];

export const eventCategoryNote =
  "Final image count varies based on event activities, timeline, and guest participation.";

export const weddingPackages: Package[] = [
  {
    id: "wedding-intimate",
    name: "Intimate",
    price: "$1,200",
    duration: "4 hours",
    features: ["150+ photos"],
  },
  {
    id: "wedding-classic",
    name: "Classic",
    price: "$2,200",
    duration: "8 hours",
    popular: true,
    features: ["400+ photos", "Engagement session included"],
  },
  {
    id: "wedding-signature",
    name: "Signature",
    price: "$3,200",
    duration: "10 hours",
    features: [
      "600+ photos",
      "2 photographers",
      "Sneak peeks in 48 hrs",
    ],
  },
];

export const preWeddingPackages: Package[] = [
  {
    id: "pre-wedding-essential",
    name: "Essential",
    price: "$350",
    duration: "1 hour",
    features: [
      "1 location",
      "Up to 2 outfits",
      "20 edited images",
      "Online gallery",
    ],
  },
  {
    id: "pre-wedding-signature",
    name: "Signature",
    price: "$500",
    duration: "2 hours",
    popular: true,
    features: [
      "Up to 2 locations",
      "Up to 3 outfits",
      "35 edited images",
      "Online gallery",
    ],
  },
  {
    id: "pre-wedding-luxury",
    name: "Luxury",
    price: "$700",
    duration: "3 hours",
    features: [
      "Multiple locations",
      "Unlimited outfit changes",
      "50 edited images",
      "Online gallery",
      "Priority editing",
    ],
  },
];

export const preWeddingExtras = [
  "Additional images $10 each",
  "Rush delivery 72 hrs $100",
];

export const headshotPackages: Package[] = [
  {
    id: "headshot-quick",
    name: "Quick Headshot",
    price: "$75",
    duration: "10–15 minutes",
    features: ["2 edited photos"],
  },
  {
    id: "headshot-standard",
    name: "Standard Headshot",
    price: "$125",
    duration: "30 minutes",
    popular: true,
    features: ["5 edited photos"],
  },
  {
    id: "headshot-team",
    name: "Team Package",
    price: "$200+",
    duration: "Varies",
    features: ["Pricing varies by number of people"],
    details: "Ideal for teams, offices, and group professional headshots.",
  },
];

export const brandPackages: Package[] = [
  {
    id: "brand-starter",
    name: "Starter Brand Session",
    price: "$175",
    duration: "30–40 minutes",
    features: [
      "1 outfit",
      "10 edited images",
      "1 location",
      "Basic commercial usage",
    ],
  },
  {
    id: "brand-growth",
    name: "Growth Brand Session",
    price: "$275",
    duration: "1 hour",
    popular: true,
    features: [
      "2 outfits",
      "20 edited images",
      "Studio + outdoor option",
      "Posing & branding guidance",
      "Commercial usage included",
    ],
  },
  {
    id: "brand-pro",
    name: "Pro Brand Session",
    price: "$400",
    duration: "1.5 hours",
    features: [
      "Up to 3 outfits",
      "30 edited images",
      "Multiple setups",
      "Content variety",
      "Brand direction assistance",
    ],
  },
  {
    id: "brand-premium",
    name: "Premium Brand Package",
    price: "$600",
    duration: "2–3 hours",
    features: [
      "Unlimited outfit changes within session time",
      "45–60 edited images",
      "Multiple locations",
      "Full creative direction + shot planning",
      "Priority delivery",
    ],
  },
];

export const addons = [
  { name: "Extra edited photos", price: "$10 per photo or $50 for 10" },
  { name: "Rush editing (24–48 hrs)", price: "$75–$150" },
  { name: "BTS video", price: "$50–$100" },
  { name: "Highlight reel", price: "$100–$250" },
  { name: "Additional location", price: "$50" },
  { name: "Extra outfit", price: "$25" },
  { name: "Travel outside San Antonio", price: "Starts at $50" },
  { name: "Full gallery upgrade", price: "$100–$200" },
  { name: "Advanced retouching", price: "$15–$25 per image" },
] as const;

/** General session packages shown on the Services page */
export const servicesPageCategories: PackageCategory[] = [
  { id: "portraits", category: "Portraits", packages: portraitPackages },
  { id: "families", category: "Families", packages: familyPackages },
  {
    id: "events",
    category: "Events",
    packages: eventPackages,
    note: eventCategoryNote,
  },
  { id: "headshots", category: "Headshots", packages: headshotPackages },
];

/** Wedding + pre-wedding packages for the Weddings page */
export const weddingsPageCategories: PackageCategory[] = [
  { id: "weddings", category: "Weddings", packages: weddingPackages },
  {
    id: "pre-wedding",
    category: "Pre-Wedding",
    packages: preWeddingPackages,
    note: preWeddingExtras.join(" · "),
  },
];

/** @deprecated Use servicesPageCategories — kept for any legacy imports */
export const packageCategories = [
  ...servicesPageCategories,
  {
    id: "weddings",
    category: "Weddings",
    linkHref: "/weddings",
    linkLabel: "Full Details",
    packages: weddingPackages,
  },
  {
    id: "pre-wedding",
    category: "Pre-Wedding",
    linkHref: "/weddings",
    linkLabel: "Full Details",
    packages: preWeddingPackages,
  },
  {
    id: "brand",
    category: "Brand Photography",
    linkHref: "/brand-photography",
    linkLabel: "Full Details",
    packages: brandPackages,
  },
];

const allPackageGroups: BookingPackageGroup[] = [
  { category: "Portraits", packages: toBookingOptions(portraitPackages) },
  { category: "Families", packages: toBookingOptions(familyPackages) },
  { category: "Events", packages: toBookingOptions(eventPackages) },
  { category: "Weddings", packages: toBookingOptions(weddingPackages) },
  { category: "Pre-Wedding", packages: toBookingOptions(preWeddingPackages) },
  { category: "Headshots", packages: toBookingOptions(headshotPackages) },
  { category: "Brand Photography", packages: toBookingOptions(brandPackages) },
];

function toBookingOptions(packages: Package[]) {
  return packages.map((pkg) => ({
    id: pkg.id,
    label: `${pkg.name} (${pkg.price})`,
  }));
}

export function getBookingPackageGroups(): BookingPackageGroup[] {
  return allPackageGroups;
}

/** Flat list for simple selects */
export function getAllPackageOptions(): string[] {
  return allPackageGroups.flatMap((group) =>
    group.packages.map((pkg) => `${group.category} — ${pkg.label}`),
  ).concat(["Not sure — help me choose!"]);
}

export function getGridColsClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 md:grid-cols-2";
  if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

const packageRegistry = new Map<string, { category: string; pkg: Package }>();

function registerPackages(category: string, packages: Package[]) {
  for (const pkg of packages) {
    packageRegistry.set(pkg.id, { category, pkg });
  }
}

registerPackages("Portraits", portraitPackages);
registerPackages("Families", familyPackages);
registerPackages("Events", eventPackages);
registerPackages("Weddings", weddingPackages);
registerPackages("Pre-Wedding", preWeddingPackages);
registerPackages("Headshots", headshotPackages);
registerPackages("Brand Photography", brandPackages);

export function getPackageBookingValue(category: string, pkg: Package): string {
  return `${category} — ${pkg.name} (${pkg.price})`;
}

export function getPackageBookingValueById(id: string): string | undefined {
  const entry = packageRegistry.get(id);
  if (!entry) return undefined;
  return getPackageBookingValue(entry.category, entry.pkg);
}

export function getContactHref(category: string, pkg: Package): string {
  return `/contact?package=${encodeURIComponent(pkg.id)}`;
}

export function getSessionTypes(): string[] {
  return allPackageGroups.map((group) => group.category);
}

export function getPackageEntryById(
  id: string,
): { category: string; pkg: Package } | undefined {
  return packageRegistry.get(id);
}

export const NOT_SURE_PACKAGE = "Not sure — help me choose!";
