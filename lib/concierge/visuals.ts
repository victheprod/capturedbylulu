import { luluPortrait } from "@/data/lulu";
import type { Occasion, SettingPref, Vision } from "./types";

/** Visual assets for the concierge experience — photo-driven UI */
export const conciergeWelcomeImage = {
  src: luluPortrait.src,
  alt: luluPortrait.alt,
  caption: luluPortrait.caption,
  objectPosition: luluPortrait.objectPosition,
};

export const occasionVisuals: Record<
  Occasion,
  { icon: string; accent?: string }
> = {
  wedding: { icon: "♥" },
  "pre-wedding": { icon: "✦" },
  portrait: { icon: "◯" },
  family: { icon: "◎" },
  event: { icon: "✧" },
  brand: { icon: "△" },
  headshot: { icon: "●" },
};

export type VisionVisual = {
  value: Vision;
  label: string;
  src: string;
  objectPosition: string;
};

export const visionVisuals: VisionVisual[] = [
  {
    value: "editorial",
    label: "Editorial",
    src: "/site-images/portraits/DSC08205.jpg",
    objectPosition: "50% 18%",
  },
  {
    value: "candid",
    label: "Romantic",
    src: "/site-images/weddings/DSC07766.jpg",
    objectPosition: "50% 18%",
  },
  {
    value: "candid",
    label: "Candid",
    src: "/site-images/families/DSC00439.jpg",
    objectPosition: "50% 35%",
  },
  {
    value: "full-coverage",
    label: "Timeless",
    src: "/site-images/weddings/DSC02783.jpg",
    objectPosition: "50% 18%",
  },
  {
    value: "editorial",
    label: "Cinematic",
    src: "/site-images/_hero/weddings/DSC00201.jpg",
    objectPosition: "50% 50%",
  },
  {
    value: "efficient",
    label: "Moody",
    src: "/site-images/portraits/DSC07888.jpg",
    objectPosition: "50% 50%",
  },
];

/** Unique vision keys for photo grid selection */
export type VisionPickId =
  | "editorial"
  | "romantic"
  | "candid"
  | "timeless"
  | "cinematic"
  | "moody";

export const visionPickOptions: {
  id: VisionPickId;
  value: Vision;
  label: string;
  src: string;
  objectPosition: string;
}[] = [
  {
    id: "editorial",
    value: "editorial",
    label: "Editorial",
    src: "/site-images/portraits/DSC08205.jpg",
    objectPosition: "50% 18%",
  },
  {
    id: "romantic",
    value: "candid",
    label: "Romantic",
    src: "/site-images/weddings/DSC07766.jpg",
    objectPosition: "50% 18%",
  },
  {
    id: "candid",
    value: "candid",
    label: "Candid",
    src: "/site-images/families/DSC00439.jpg",
    objectPosition: "50% 35%",
  },
  {
    id: "timeless",
    value: "full-coverage",
    label: "Timeless",
    src: "/site-images/weddings/DSC02783.jpg",
    objectPosition: "50% 18%",
  },
  {
    id: "cinematic",
    value: "editorial",
    label: "Cinematic",
    src: "/site-images/_hero/weddings/DSC00201.jpg",
    objectPosition: "50% 50%",
  },
  {
    id: "moody",
    value: "efficient",
    label: "Moody",
    src: "/site-images/portraits/DSC07888.jpg",
    objectPosition: "50% 50%",
  },
];

export const settingVisuals: Record<
  SettingPref,
  { label: string; src: string; objectPosition: string }
> = {
  outdoor: {
    label: "Outdoor",
    src: "/site-images/weddings/DSC02774.jpg",
    objectPosition: "50% 18%",
  },
  indoor: {
    label: "Indoor",
    src: "/site-images/weddings/DSC02880.jpg",
    objectPosition: "50% 50%",
  },
  both: {
    label: "Both",
    src: "/site-images/families/IMG_3621.jpg",
    objectPosition: "50% 35%",
  },
};

export const resultCollageImages = [
  {
    src: "/site-images/weddings/DSC02836.jpg",
    objectPosition: "50% 50%",
  },
  {
    src: "/site-images/portraits/DSC08765.jpg",
    objectPosition: "50% 18%",
  },
  {
    src: "/site-images/weddings/DSC07789.jpg",
    objectPosition: "50% 18%",
  },
  {
    src: "/site-images/families/DSC00572.jpg",
    objectPosition: "50% 35%",
  },
];

export const budgetTiers = [
  { label: "$150 – $500", max: 500, hint: "Mini sessions & quick portraits" },
  { label: "$500 – $1,500", max: 1500, hint: "Portraits, families & events" },
  { label: "$1,500 – $2,500", max: 2500, hint: "Extended sessions & intimate weddings" },
  { label: "$2,500 – $4,000", max: 4000, hint: "Full weddings & premium coverage" },
  { label: "$4,000+", max: 4500, hint: "Signature collections & full-day" },
] as const;

export const addonPriceHints: Partial<Record<string, string>> = {
  "rush-delivery": "+$75–$150",
  "extra-photos": "+$50 for 10",
  "extra-hours": "Quoted",
  "second-shooter": "Discuss",
  "engagement-session": "+$500",
  "albums-prints": "Discuss",
  video: "Discuss",
};
