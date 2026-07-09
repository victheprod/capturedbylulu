import type { ConciergeStepId } from "./types";

type StepCopy = {
  eyebrow: string;
  title: string;
  description: string;
  hint?: string;
  allowUnsure?: boolean;
};

export const conciergeCopy: Record<ConciergeStepId, StepCopy> = {
  welcome: {
    eyebrow: "Capture Concierge",
    title: "Hi, I'm Lulu.",
    description:
      "I'll ask a few gentle questions to understand your vision — then recommend the perfect package. No pressure, no commitment.",
    hint: "Takes about 2 minutes · Saves as you go",
  },
  occasion: {
    eyebrow: "Step 1",
    title: "What are you celebrating?",
    description: "Choose what feels closest to your moment.",
    allowUnsure: true,
  },
  vision: {
    eyebrow: "Step 2",
    title: "What vibe speaks to you?",
    description: "Trust your instinct — pick the feeling that pulls you in.",
    allowUnsure: true,
  },
  priorities: {
    eyebrow: "Step 3",
    title: "What matters most?",
    description: "Who's involved and how much time you'd like covered.",
    allowUnsure: true,
  },
  setting: {
    eyebrow: "Step 4",
    title: "Where do you picture this?",
    description: "Indoor elegance, open air, or a little of both.",
    allowUnsure: true,
  },
  addons: {
    eyebrow: "Step 5",
    title: "Any extras on your mind?",
    description: "Optional — select anything you'd like Lulu to factor in.",
    allowUnsure: false,
  },
  investment: {
    eyebrow: "Step 6",
    title: "What's your comfort zone?",
    description: "This helps narrow to packages that feel right — not a commitment.",
    allowUnsure: false,
  },
  result: {
    eyebrow: "Your recommendation",
    title: "Here's what we recommend for you.",
    description: "",
  },
  timeline: {
    eyebrow: "",
    title: "",
    description: "",
  },
  location: {
    eyebrow: "",
    title: "",
    description: "",
  },
  scale: {
    eyebrow: "",
    title: "",
    description: "",
  },
  coverage: {
    eyebrow: "",
    title: "",
    description: "",
  },
  deliverables: {
    eyebrow: "",
    title: "",
    description: "",
  },
};

export const conciergeMicrocopy = {
  unsure: "I'm not sure yet",
  back: "Back",
  continue: "Continue",
  seeRecommendation: "See my recommendation",
  begin: "Let's begin",
  close: "Close",
  restart: "Start over",
  viewCollection: "View collection",
  makeOfficial: "Let's make it official",
} as const;

export const conciergeHero = {
  title: "Your story.",
  titleAccent: "Perfectly captured.",
  description:
    "Not sure which package fits? Let Lulu guide you through a personalized consultation — built around your vision, your timeline, and your investment comfort.",
} as const;

export const conciergeTrustStrip = [
  { label: "A Personal Experience", icon: "✦" },
  { label: "Beautiful & Intuitive", icon: "◇" },
  { label: "Saves Your Progress", icon: "○" },
] as const;

export const conciergeLaunch = {
  eyebrow: "Capture Concierge",
  title: "I'm here to help you",
  titleAccent: "plan beautifully.",
  description:
    "Answer a few thoughtful questions and receive a package recommendation tailored to your vision — before you ever send an inquiry.",
  cta: "Start planning",
  ctaSubline: "Get CapturedByLulu the right way",
  features: [
    { icon: "✦", label: "Personalized package match" },
    { icon: "◇", label: "Real pricing from Lulu's offerings" },
    { icon: "○", label: "Your answers save automatically" },
    { icon: "♡", label: "No pressure — just clarity" },
  ],
} as const;
