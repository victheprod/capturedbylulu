import type {
  Deliverable,
  LocationPref,
  Occasion,
  Scale,
  Timeline,
  Vision,
} from "./types";

export type ChoiceOption<T extends string> = {
  value: T;
  label: string;
  description: string;
  icon?: string;
};

export const occasionOptions: ChoiceOption<Occasion>[] = [
  {
    value: "wedding",
    label: "Wedding",
    description: "Your ceremony, celebration, and every moment in between.",
    icon: "◈",
  },
  {
    value: "pre-wedding",
    label: "Pre-Wedding",
    description: "Engagement sessions and story-led couple portraits.",
    icon: "◇",
  },
  {
    value: "portrait",
    label: "Portrait",
    description: "Graduation, birthday, couples, or a session that's just for you.",
    icon: "○",
  },
  {
    value: "family",
    label: "Family",
    description: "The people you love, photographed honestly and beautifully.",
    icon: "◎",
  },
  {
    value: "event",
    label: "Event",
    description: "Birthdays, showers, corporate gatherings, and milestones.",
    icon: "□",
  },
  {
    value: "brand",
    label: "Brand",
    description: "Elevated imagery for your business, portfolio, or personal brand.",
    icon: "△",
  },
  {
    value: "headshot",
    label: "Headshot",
    description: "Professional portraits for work, teams, or your next chapter.",
    icon: "●",
  },
];

export const visionOptions: Record<Vision, ChoiceOption<Vision>> = {
  candid: {
    value: "candid",
    label: "Authentic moments",
    description: "Natural, emotional, unposed — the way it actually felt.",
  },
  editorial: {
    value: "editorial",
    label: "Editorial polish",
    description: "Cinematic composition with intentional, magazine-worthy framing.",
  },
  "full-coverage": {
    value: "full-coverage",
    label: "Full storytelling",
    description: "Comprehensive coverage from beginning to end.",
  },
  efficient: {
    value: "efficient",
    label: "Focused & efficient",
    description: "A refined session that respects your schedule.",
  },
  "business-content": {
    value: "business-content",
    label: "Brand-ready content",
    description: "Images built for websites, social, and commercial use.",
  },
};

export const scaleOptions: Record<Scale, ChoiceOption<Scale>> = {
  solo: {
    value: "solo",
    label: "Just me",
    description: "A personal session for one.",
  },
  couple: {
    value: "couple",
    label: "Two of us",
    description: "Couples, engagements, or paired portraits.",
  },
  "small-family": {
    value: "small-family",
    label: "Small family",
    description: "Up to about eight people.",
  },
  "large-family": {
    value: "large-family",
    label: "Large family",
    description: "Extended family or bigger groups.",
  },
  "intimate-wedding": {
    value: "intimate-wedding",
    label: "Intimate wedding",
    description: "Elopement or celebration up to ~4 hours.",
  },
  "full-wedding": {
    value: "full-wedding",
    label: "Full wedding day",
    description: "Getting ready through reception — the complete story.",
  },
  "corporate-event": {
    value: "corporate-event",
    label: "Corporate / team",
    description: "Professional gatherings or headshot days.",
  },
  "large-event": {
    value: "large-event",
    label: "Large celebration",
    description: "Parties, showers, or events needing extended coverage.",
  },
};

export const timelineOptions: ChoiceOption<Timeline>[] = [
  {
    value: "urgent",
    label: "Within 4 weeks",
    description: "I need to move quickly.",
  },
  {
    value: "soon",
    label: "1–3 months",
    description: "Planning is underway.",
  },
  {
    value: "planning",
    label: "3–6 months",
    description: "I'm mapping out the details.",
  },
  {
    value: "flexible",
    label: "Flexible timeline",
    description: "No fixed date yet — exploring options.",
  },
];

export const locationOptions: ChoiceOption<LocationPref>[] = [
  {
    value: "local",
    label: "Local Texas",
    description: "Within my primary service area.",
  },
  {
    value: "texas-travel",
    label: "Travel in Texas",
    description: "Elsewhere in Texas — happy to travel.",
  },
  {
    value: "out-of-state",
    label: "Outside Texas",
    description: "Destination or out-of-state — let's plan it.",
  },
];

export const deliverableOptions: ChoiceOption<Deliverable>[] = [
  {
    value: "digital-gallery",
    label: "Private online gallery",
    description: "Included with every package — your curated collection.",
  },
  {
    value: "rush-delivery",
    label: "Faster delivery",
    description: "Sneak peeks or rush editing when timing matters.",
  },
  {
    value: "extra-photos",
    label: "More edited images",
    description: "A fuller gallery beyond the package count.",
  },
  {
    value: "multi-location",
    label: "Multiple locations",
    description: "More than one backdrop or venue.",
  },
  {
    value: "engagement-session",
    label: "Engagement session",
    description: "Couple portraits before the wedding day.",
  },
];

export const conciergeSteps = [
  { id: "occasion", label: "Occasion" },
  { id: "vision", label: "Vision" },
  { id: "scale", label: "Details" },
  { id: "timeline", label: "Timeline" },
  { id: "location", label: "Location" },
  { id: "deliverables", label: "Deliverables" },
  { id: "investment", label: "Investment" },
] as const;

export function formatBudget(value: number): string {
  if (value >= 4000) return "$4,000+";
  return `$${value.toLocaleString("en-US")}`;
}
