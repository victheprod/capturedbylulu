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

export const editorialNav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Weddings", href: "/weddings" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export const editorialSecondaryNav = [
  { label: "Brand Photography", href: "/brand-photography" },
  { label: "Build Your Vision", href: "/vision" },
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
