export const siteConfig = {
  name: "CapturedByLulu",
  tagline: "Texas-based luxury photography",
  description:
    "Luxury photography for weddings, portraits, families, and events across Texas and beyond.",
  email: "Capturedbylulu63@gmail.com",
  phone: "+1 (346) 907-1945",
  location: "Texas Based",
  instagram: "@capturedbylulu_",
  instagramUrl: "https://www.instagram.com/capturedbylulu_/",
} as const;

export const siteBranding = {
  eyebrow: "Texas Based",
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
        label: "Capture Concierge",
        href: "/concierge",
        description: "A guided consultation to find your perfect package.",
      },
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
        label: "Contact Lulu",
        href: "/contact",
        description: "Check availability or ask a question — no pressure.",
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
      { label: "Capture Concierge", href: "/concierge" },
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
  { label: "Texas Based · Travel Available" },
  { label: "Cinematic, Editorial Style" },
  { label: "Every Inquiry Read Personally by Lulu" },
  {
    label: `${siteConfig.instagram} on Instagram`,
    href: siteConfig.instagramUrl,
  },
] as const;
