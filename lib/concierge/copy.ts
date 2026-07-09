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
    title: "Tell me a little about what you're planning.",
    description:
      "I'm here to help you find the right package — no pressure, just a few gentle questions and a recommendation drawn from Lulu's real offerings.",
    hint: "About 3 minutes · Your answers stay private",
  },
  occasion: {
    eyebrow: "First things first",
    title: "What kind of session are you dreaming of?",
    description:
      "Choose what feels closest. If you're between options, pick the one that fits best for now.",
    hint: "Not sure? You can always adjust when you inquire.",
    allowUnsure: true,
  },
  timeline: {
    eyebrow: "Timing",
    title: "When are you hoping this happens?",
    description:
      "Even a rough timeframe helps Lulu understand availability and planning.",
    hint: "No fixed date yet? That's completely fine.",
    allowUnsure: true,
  },
  location: {
    eyebrow: "Where",
    title: "Where will this take place?",
    description:
      "Lulu is Texas-based and travels throughout Texas and beyond.",
    allowUnsure: true,
  },
  scale: {
    eyebrow: "Who's involved",
    title: "Who will be in front of the camera?",
    description: "Group size helps narrow the right package and coverage.",
    allowUnsure: true,
  },
  coverage: {
    eyebrow: "Coverage",
    title: "How much time do you need covered?",
    description: "A rough estimate is enough — we'll match you to the right window.",
    allowUnsure: true,
  },
  setting: {
    eyebrow: "Setting",
    title: "Indoor, outdoor, or a mix?",
    description: "Lulu works beautifully in studios, venues, gardens, and open light.",
    allowUnsure: true,
  },
  vision: {
    eyebrow: "Your style",
    title: "How should these photographs feel?",
    description: "Trust your instinct — there's no wrong answer here.",
    allowUnsure: true,
  },
  deliverables: {
    eyebrow: "Deliverables",
    title: "What matters most in what you receive?",
    description: "Every package includes a private online gallery. Select anything else that matters to you.",
    allowUnsure: true,
  },
  addons: {
    eyebrow: "Extras",
    title: "Anything else on your mind?",
    description: "Optional — select add-ons you'd like Lulu to factor in, or skip ahead.",
    allowUnsure: false,
  },
  investment: {
    eyebrow: "Investment",
    title: "What feels comfortable for this experience?",
    description:
      "This isn't a commitment — just a guide so we can recommend something that feels right.",
    hint: "Slide to your comfort zone.",
    allowUnsure: false,
  },
  result: {
    eyebrow: "Your recommendation",
    title: "Based on what you shared, this feels like your best fit.",
    description: "",
  },
};

export const conciergeMicrocopy = {
  unsure: "I'm not sure yet — skip for now",
  back: "Go back",
  continue: "Continue",
  seeRecommendation: "See my recommendation",
  begin: "Let's begin",
  close: "Close",
  restart: "Start over",
} as const;
