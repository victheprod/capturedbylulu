import type { Package } from "@/data/packages";

export type Occasion =
  | "wedding"
  | "pre-wedding"
  | "portrait"
  | "family"
  | "event"
  | "brand"
  | "headshot";

export type Vision =
  | "candid"
  | "editorial"
  | "full-coverage"
  | "efficient"
  | "business-content";

export type Scale =
  | "solo"
  | "couple"
  | "small-family"
  | "large-family"
  | "intimate-wedding"
  | "full-wedding"
  | "corporate-event"
  | "large-event";

export type Timeline =
  | "urgent"
  | "soon"
  | "planning"
  | "flexible";

export type LocationPref = "local" | "texas-travel" | "out-of-state";

export type Deliverable =
  | "digital-gallery"
  | "rush-delivery"
  | "extra-photos"
  | "multi-location"
  | "engagement-session";

export type ConciergeAnswers = {
  occasion?: Occasion;
  vision?: Vision;
  scale?: Scale;
  timeline?: Timeline;
  location?: LocationPref;
  deliverables: Deliverable[];
  budgetMax: number;
};

export type ConciergeRecommendation = {
  category: string;
  package: Package;
  packageId: string;
  reasons: string[];
  investmentLabel: string;
  addons: { name: string; price: string; reason: string }[];
  contactHref: string;
  alternatePackage?: { category: string; package: Package; packageId: string };
};

export type ConciergeStepId =
  | "welcome"
  | "occasion"
  | "vision"
  | "scale"
  | "timeline"
  | "location"
  | "deliverables"
  | "investment"
  | "result";
