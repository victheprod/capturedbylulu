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

/** Estimated coverage window the client has in mind */
export type CoverageDuration =
  | "under-1hr"
  | "1-2hr"
  | "2-4hr"
  | "4-6hr"
  | "6-8hr"
  | "full-day";

export type SettingPref = "indoor" | "outdoor" | "both";

export type Deliverable =
  | "digital-gallery"
  | "rush-delivery"
  | "extra-photos"
  | "multi-location"
  | "engagement-session";

/** Add-on interests — some map to published add-ons, others are inquiry topics */
export type AddonInterest =
  | "rush-delivery"
  | "extra-photos"
  | "extra-hours"
  | "second-shooter"
  | "engagement-session"
  | "albums-prints"
  | "video";

export type ConciergeAnswers = {
  occasion?: Occasion;
  timeline?: Timeline;
  location?: LocationPref;
  scale?: Scale;
  coverage?: CoverageDuration;
  setting?: SettingPref;
  vision?: Vision;
  deliverables: Deliverable[];
  addonInterests: AddonInterest[];
  budgetMax: number;
};

export type ConciergeRecommendation = {
  category: string;
  package: Package;
  packageId: string;
  reasons: string[];
  investmentLabel: string;
  investmentRange?: string;
  addons: { name: string; price: string; reason: string; inquiryOnly?: boolean }[];
  nextSteps: string[];
  contactHref: string;
  summaryNote: string;
  alternatePackage?: { category: string; package: Package; packageId: string };
};

export type ConciergeStepId =
  | "welcome"
  | "occasion"
  | "vision"
  | "priorities"
  | "setting"
  | "addons"
  | "investment"
  | "result"
  /** @deprecated legacy session — migrated on load */
  | "timeline"
  | "location"
  | "scale"
  | "coverage"
  | "deliverables";
