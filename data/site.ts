export const siteConfig = {
  name: "CapturedByLulu",
  tagline: "Photography by Lulu, based in Texas",
  description:
    "Weddings, portraits, families, and events photographed by Lulu across Texas and beyond.",
  email: "Capturedbylulu63@gmail.com",
  phone: "+1 (346) 907-1945",
  location: "Based in Texas",
  instagram: "@capturedbylulu_",
  instagramUrl: "https://www.instagram.com/capturedbylulu_/",
} as const;

export const siteBranding = {
  eyebrow: "Photographer · Texas",
  ogImage: "/logo.png",
} as const;

export const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

/** Desktop shifting dropdown — Services mega panel */
export const servicesNavTabs = [
  {
    id: 1,
    title: "Sessions",
    links: [
      {
        label: "Weddings",
        href: "/weddings",
        description: "Full-day coverage, pre-wedding, and intimate ceremonies.",
      },
      {
        label: "Portraits & Families",
        href: "/services",
        description: "Portraits, family sessions, events, and headshots.",
      },
      {
        label: "Brand Photography",
        href: "/brand-photography",
        description: "Editorial imagery for entrepreneurs and businesses.",
      },
    ],
  },
  {
    id: 2,
    title: "Plan",
    links: [
      {
        label: "Build Your Vision",
        href: "/vision",
        description: "Curate a live mood board and discover your photography style.",
      },
      {
        label: "Pricing",
        href: "/services",
        description: "Transparent packages for every session type.",
      },
      {
        label: "Portfolio",
        href: "/portfolio",
        description: "Browse weddings, portraits, families, and events.",
      },
      {
        label: "Get an Estimate",
        href: "/contact",
        description:
          "Request an estimate or custom quotation — Lulu finalizes by email.",
      },
    ],
  },
] as const;

export const servicePaths = [
  "/services",
  "/weddings",
  "/brand-photography",
] as const;

/** Mobile nav groups */
export const mobileNavGroups = [
  {
    title: "Work",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Weddings", href: "/weddings" },
      { label: "Services & Pricing", href: "/services" },
      { label: "Build Your Vision", href: "/vision" },
      { label: "Brand Photography", href: "/brand-photography" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Lulu", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const serviceCategories = [
  "Weddings",
  "Portraits",
  "Families",
  "Events",
] as const;

export const trustItems = [
  { label: "Based in Texas · Travels nationwide" },
  { label: "Weddings · Portraits · Families · Events" },
  { label: "Every request read by Lulu" },
  {
    label: `${siteConfig.instagram} on Instagram`,
    href: siteConfig.instagramUrl,
  },
] as const;
