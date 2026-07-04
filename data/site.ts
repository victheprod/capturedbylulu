export const siteConfig = {
  name: "CapturedByLulu",
  tagline: "Luxury photography in San Antonio",
  description:
    "Luxury photography for weddings, portraits, families, and events in San Antonio and surrounding areas.",
  email: "Capturedbylulu63@gmail.com",
  phone: "+1 (346) 907-1945",
  location: "San Antonio, Texas",
  instagram: "@capturedbylulu_",
  instagramUrl: "https://www.instagram.com/capturedbylulu_/",
} as const;

export const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Weddings", href: "/weddings" },
  { label: "Brand Photography", href: "/brand-photography" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export const trustItems = [
  { label: "Weddings · Portraits · Families · Events" },
  { label: "San Antonio & Surrounding Areas" },
  { label: "Cinematic, Editorial Style" },
  { label: "Every Inquiry Read Personally by Lulu" },
  {
    label: `${siteConfig.instagram} on Instagram`,
    href: siteConfig.instagramUrl,
  },
] as const;
