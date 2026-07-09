import type {
  AddonInterest,
  ConciergeAnswers,
  CoverageDuration,
  Deliverable,
  LocationPref,
  Occasion,
  Scale,
  SettingPref,
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

export const timelineOptions: ChoiceOption<Timeline>[] = [
  {
    value: "urgent",
    label: "Within 4 weeks",
    description: "I need to move quickly on dates and planning.",
  },
  {
    value: "soon",
    label: "1–3 months",
    description: "Planning is underway — date may be set or nearly set.",
  },
  {
    value: "planning",
    label: "3–6 months",
    description: "I'm mapping out vendors, venue, and details.",
  },
  {
    value: "flexible",
    label: "Flexible / exploring",
    description: "No fixed date yet — gathering information first.",
  },
];

export const locationOptions: ChoiceOption<LocationPref>[] = [
  {
    value: "local",
    label: "Local Texas",
    description: "Within Lulu's primary service area.",
  },
  {
    value: "texas-travel",
    label: "Elsewhere in Texas",
    description: "Happy to travel — travel fees quoted per booking.",
  },
  {
    value: "out-of-state",
    label: "Outside Texas",
    description: "Destination or out-of-state — let's plan logistics together.",
  },
];

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
    label: "Small group",
    description: "Up to about eight people.",
  },
  "large-family": {
    value: "large-family",
    label: "Large group",
    description: "Extended family, wedding parties, or bigger gatherings.",
  },
  "intimate-wedding": {
    value: "intimate-wedding",
    label: "Intimate wedding",
    description: "Elopement or celebration — smaller guest list.",
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

export const coverageOptions: ChoiceOption<CoverageDuration>[] = [
  {
    value: "under-1hr",
    label: "Under 1 hour",
    description: "Quick headshots or a mini session.",
  },
  {
    value: "1-2hr",
    label: "1–2 hours",
    description: "Portrait, brand, or pre-wedding sessions.",
  },
  {
    value: "2-4hr",
    label: "2–4 hours",
    description: "Intimate weddings, events, or extended portraits.",
  },
  {
    value: "4-6hr",
    label: "4–6 hours",
    description: "Half-day weddings or longer events.",
  },
  {
    value: "6-8hr",
    label: "6–8 hours",
    description: "Full event or wedding-day coverage.",
  },
  {
    value: "full-day",
    label: "Full day",
    description: "Complete wedding-day storytelling.",
  },
];

export const settingOptions: ChoiceOption<SettingPref>[] = [
  {
    value: "indoor",
    label: "Mostly indoor",
    description: "Studio, venue, or interior spaces.",
  },
  {
    value: "outdoor",
    label: "Mostly outdoor",
    description: "Gardens, golden hour, open landscapes.",
  },
  {
    value: "both",
    label: "Indoor & outdoor",
    description: "A mix of environments throughout the session.",
  },
];

export const visionOptions: Record<Vision, ChoiceOption<Vision>> = {
  candid: {
    value: "candid",
    label: "Authentic & emotional",
    description: "Natural, unposed — the way it actually felt.",
  },
  editorial: {
    value: "editorial",
    label: "Editorial & cinematic",
    description: "Intentional framing with magazine-worthy polish.",
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

export const addonInterestOptions: ChoiceOption<AddonInterest>[] = [
  {
    value: "rush-delivery",
    label: "Rush delivery",
    description: "24–48 hour editing when your timeline is tight.",
  },
  {
    value: "extra-photos",
    label: "Extra edited photos",
    description: "Expand your gallery beyond what's included.",
  },
  {
    value: "extra-hours",
    label: "Extra coverage hours",
    description: "More time on the wedding day or at your event.",
  },
  {
    value: "second-shooter",
    label: "Second photographer",
    description: "Additional coverage for larger weddings.",
  },
  {
    value: "engagement-session",
    label: "Engagement session",
    description: "A dedicated couple session before the wedding.",
  },
  {
    value: "albums-prints",
    label: "Albums or prints",
    description: "Physical keepsakes — discussed during inquiry.",
  },
  {
    value: "video",
    label: "Video coverage",
    description: "Let Lulu know if you're also exploring video.",
  },
];

export const conciergeSteps = [
  { id: "occasion", label: "Occasion" },
  { id: "vision", label: "Vibe" },
  { id: "priorities", label: "Priorities" },
  { id: "setting", label: "Setting" },
  { id: "addons", label: "Add-ons" },
  { id: "investment", label: "Budget" },
] as const;

export const timelineLabels: Record<Timeline, string> = {
  urgent: "Within 4 weeks",
  soon: "1–3 months",
  planning: "3–6 months",
  flexible: "Flexible / exploring",
};

export const locationLabels: Record<LocationPref, string> = {
  local: "Local Texas",
  "texas-travel": "Travel within Texas",
  "out-of-state": "Outside Texas",
};

export const settingLabels: Record<SettingPref, string> = {
  indoor: "Mostly indoor",
  outdoor: "Mostly outdoor",
  both: "Indoor & outdoor",
};

export function formatBudget(value: number): string {
  if (value >= 4000) return "$4,000+";
  return `$${value.toLocaleString("en-US")}`;
}

export function labelForOccasion(occasion: Occasion): string {
  return occasionOptions.find((o) => o.value === occasion)?.label ?? occasion;
}

export function labelForScale(scale: Scale): string {
  return scaleOptions[scale]?.label ?? scale;
}

export function labelForCoverage(coverage: CoverageDuration): string {
  return coverageOptions.find((o) => o.value === coverage)?.label ?? coverage;
}
