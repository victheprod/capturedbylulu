import type {
  Celebration,
  EditingStyle,
  EnergyPref,
  EraPref,
  MomentPreference,
  PhotoFeel,
  SettingPref,
  VisionStepId,
} from "./types";

export type StepChoice<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export const visionSteps = [
  { id: "styles", label: "Style" },
  { id: "celebration", label: "Occasion" },
  { id: "feel", label: "Feeling" },
  { id: "moments", label: "Moments" },
  { id: "editing", label: "Editing" },
  { id: "setting", label: "Setting" },
  { id: "energy", label: "Energy" },
  { id: "era", label: "Era" },
] as const;

export const stepCopy: Record<VisionStepId, { eyebrow: string; title: string; description: string }> = {
  welcome: {
    eyebrow: "Build Your Vision",
    title: "Let's build your dream gallery.",
    description:
      "Choose the photos and styles that speak to you. We'll shape a living mood board — and a package recommendation tailored to your taste.",
  },
  styles: {
    eyebrow: "Visual language",
    title: "Which styles pull you in?",
    description: "Select every aesthetic that resonates. Your board will begin to take shape.",
  },
  celebration: {
    eyebrow: "The occasion",
    title: "What are we celebrating?",
    description: "This helps Lulu understand the rhythm and scope of your session.",
  },
  feel: {
    eyebrow: "Emotion",
    title: "How do you want your photos to feel?",
    description: "Trust your instinct — there's no wrong answer.",
  },
  moments: {
    eyebrow: "What matters",
    title: "Which moments matter most?",
    description: "Select all that apply. These guide coverage and storytelling.",
  },
  editing: {
    eyebrow: "Editing",
    title: "Which editing style are you drawn to?",
    description: "Lulu's signature look can lean warm, cinematic, airy, and more.",
  },
  setting: {
    eyebrow: "Environment",
    title: "Indoor, outdoor, or both?",
    description: "Where you imagine being photographed shapes location ideas.",
  },
  energy: {
    eyebrow: "Energy",
    title: "Elegant or adventurous?",
    description: "The spirit of your session — refined and poised, or free-spirited.",
  },
  era: {
    eyebrow: "Aesthetic era",
    title: "Classic or modern?",
    description: "How timeless or contemporary should your gallery feel?",
  },
  result: {
    eyebrow: "Your Vision",
    title: "A gallery shaped around you.",
    description: "",
  },
};

export const celebrationOptions: StepChoice<Celebration>[] = [
  { value: "wedding", label: "Wedding", description: "Your ceremony, celebration, and every moment between." },
  { value: "engagement", label: "Engagement", description: "Couple portraits and the story before the big day." },
  { value: "portrait", label: "Portrait", description: "Personal, professional, or creative portraits." },
  { value: "family", label: "Family", description: "The people you love, photographed honestly." },
  { value: "event", label: "Event", description: "Milestones, parties, and gatherings worth remembering." },
  { value: "milestone", label: "Milestone", description: "Graduation, birthday, or a chapter worth marking." },
];

export const feelOptions: StepChoice<PhotoFeel>[] = [
  { value: "emotional", label: "Deeply emotional", description: "Tears, laughter, and everything in between." },
  { value: "polished", label: "Polished & refined", description: "Elevated, intentional, and beautifully composed." },
  { value: "playful", label: "Playful & joyful", description: "Movement, energy, and genuine fun." },
  { value: "intimate", label: "Quiet & intimate", description: "Soft, close, and deeply personal." },
  { value: "bold", label: "Bold & confident", description: "Strong presence and striking frames." },
];

export const momentOptions: StepChoice<MomentPreference>[] = [
  { value: "getting-ready", label: "Getting ready", description: "Anticipation, details, and quiet nerves." },
  { value: "ceremony", label: "Ceremony", description: "Vows, rituals, and the heart of the day." },
  { value: "portraits", label: "Portraits", description: "Intentional frames of you at your best." },
  { value: "reception", label: "Reception", description: "Dancing, toasts, and celebration." },
  { value: "candid", label: "Candid moments", description: "Unscripted glances and in-between magic." },
  { value: "details", label: "Details", description: "Florals, décor, rings, and the small things." },
];

export const editingOptions: StepChoice<EditingStyle>[] = [
  { value: "warm", label: "Warm & natural", description: "Golden skin tones and inviting color." },
  { value: "true-to-life", label: "True to life", description: "Honest color that feels like the moment." },
  { value: "cinematic", label: "Cinematic", description: "Rich contrast and film-inspired depth." },
  { value: "light-airy", label: "Light & airy", description: "Bright, fresh, and softly luminous." },
  { value: "rich-moody", label: "Rich & moody", description: "Deep tones and atmospheric shadows." },
];

export const settingOptions: StepChoice<SettingPref>[] = [
  { value: "indoor", label: "Mostly indoor", description: "Studios, venues, and interior light." },
  { value: "outdoor", label: "Mostly outdoor", description: "Gardens, open fields, and golden hour." },
  { value: "both", label: "A mix of both", description: "Indoor ceremony, outdoor portraits — the full picture." },
];

export const energyOptions: StepChoice<EnergyPref>[] = [
  { value: "elegant", label: "Elegant", description: "Refined, poised, and quietly luxurious." },
  { value: "adventurous", label: "Adventurous", description: "Movement, exploration, and spontaneous energy." },
  { value: "balanced", label: "A bit of both", description: "Polished portraits with candid freedom." },
];

export const eraOptions: StepChoice<EraPref>[] = [
  { value: "classic", label: "Classic", description: "Timeless frames that age beautifully." },
  { value: "modern", label: "Modern", description: "Contemporary, editorial, and current." },
  { value: "timeless-blend", label: "Timeless blend", description: "Classic emotion with a modern eye." },
];

export const locationSuggestions: Record<SettingPref, string[]> = {
  indoor: ["Historic venues", "Studio sessions", "Ballrooms & chapels"],
  outdoor: ["Texas hill country", "Garden estates", "Urban golden hour"],
  both: ["Venue + landscape portraits", "Getting-ready indoors, celebration outside"],
};
