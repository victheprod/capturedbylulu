import type { VisionStyleId } from "./types";

export type VisionStyleCard = {
  id: VisionStyleId;
  label: string;
  description: string;
  imageId: string;
  src: string;
  objectPosition: string;
  category: string;
};

/** Curated style cards — each mapped to a real portfolio image */
export const visionStyleCards: VisionStyleCard[] = [
  {
    id: "editorial",
    label: "Editorial",
    description: "Magazine-worthy composition and intentional framing.",
    imageId: "portraits/DSC08205",
    src: "/site-images/portraits/DSC08205.jpg",
    objectPosition: "50% 18%",
    category: "Portraits",
  },
  {
    id: "documentary",
    label: "Documentary",
    description: "Honest, unposed moments as they unfold.",
    imageId: "weddings/DSC02836",
    src: "/site-images/weddings/DSC02836.jpg",
    objectPosition: "50% 50%",
    category: "Weddings",
  },
  {
    id: "romantic",
    label: "Romantic",
    description: "Soft light, tenderness, and emotional connection.",
    imageId: "weddings/DSC07766",
    src: "/site-images/weddings/DSC07766.jpg",
    objectPosition: "50% 18%",
    category: "Weddings",
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Refined, elevated, and unmistakably high-end.",
    imageId: "weddings/DSC02880",
    src: "/site-images/weddings/DSC02880.jpg",
    objectPosition: "50% 50%",
    category: "Weddings",
  },
  {
    id: "timeless",
    label: "Timeless",
    description: "Classic imagery that never feels dated.",
    imageId: "weddings/DSC02783",
    src: "/site-images/weddings/DSC02783.jpg",
    objectPosition: "50% 18%",
    category: "Weddings",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    description: "Dramatic light, depth, and story-led frames.",
    imageId: "weddings/DSC00201",
    src: "/site-images/_hero/weddings/DSC00201.jpg",
    objectPosition: "50% 50%",
    category: "Weddings",
  },
  {
    id: "candid",
    label: "Candid",
    description: "Real laughter, real glances — nothing forced.",
    imageId: "families/DSC00439",
    src: "/site-images/families/DSC00439.jpg",
    objectPosition: "50% 35%",
    category: "Families",
  },
  {
    id: "black-white",
    label: "Black & White",
    description: "Stripped-back emotion and sculptural contrast.",
    imageId: "portraits/DSC05682",
    src: "/site-images/portraits/DSC05682.jpg",
    objectPosition: "50% 50%",
    category: "Portraits",
  },
  {
    id: "flash",
    label: "Flash Photography",
    description: "Bold, editorial energy with direct light.",
    imageId: "events/DSC09813",
    src: "/site-images/events/DSC09813.jpg",
    objectPosition: "50% 50%",
    category: "Events",
  },
  {
    id: "golden-hour",
    label: "Golden Hour",
    description: "Warm, glowing light at the edge of day.",
    imageId: "weddings/DSC02774",
    src: "/site-images/weddings/DSC02774.jpg",
    objectPosition: "50% 18%",
    category: "Weddings",
  },
  {
    id: "moody",
    label: "Moody",
    description: "Rich shadows, depth, and atmospheric tone.",
    imageId: "portraits/DSC07888",
    src: "/site-images/portraits/DSC07888.jpg",
    objectPosition: "50% 50%",
    category: "Portraits",
  },
  {
    id: "bright-airy",
    label: "Bright & Airy",
    description: "Light-filled, fresh, and effortlessly luminous.",
    imageId: "families/IMG_3621",
    src: "/site-images/families/IMG_3621.jpg",
    objectPosition: "50% 35%",
    category: "Families",
  },
];

export function styleLabel(id: VisionStyleId): string {
  return visionStyleCards.find((s) => s.id === id)?.label ?? id;
}
