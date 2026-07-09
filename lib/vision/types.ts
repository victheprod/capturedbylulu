import type { Package } from "@/data/packages";

export type VisionStyleId =
  | "editorial"
  | "documentary"
  | "romantic"
  | "luxury"
  | "timeless"
  | "cinematic"
  | "candid"
  | "black-white"
  | "flash"
  | "golden-hour"
  | "moody"
  | "bright-airy";

export type Celebration =
  | "wedding"
  | "engagement"
  | "portrait"
  | "family"
  | "event"
  | "milestone";

export type PhotoFeel =
  | "emotional"
  | "polished"
  | "playful"
  | "intimate"
  | "bold";

export type MomentPreference =
  | "getting-ready"
  | "ceremony"
  | "portraits"
  | "reception"
  | "candid"
  | "details";

export type EditingStyle =
  | "warm"
  | "true-to-life"
  | "cinematic"
  | "light-airy"
  | "rich-moody";

export type SettingPref = "indoor" | "outdoor" | "both";

export type EnergyPref = "elegant" | "adventurous" | "balanced";

export type EraPref = "classic" | "modern" | "timeless-blend";

export type VisionAnswers = {
  styles: VisionStyleId[];
  celebration?: Celebration;
  feel?: PhotoFeel;
  moments: MomentPreference[];
  editing?: EditingStyle;
  setting?: SettingPref;
  energy?: EnergyPref;
  era?: EraPref;
};

export type VisionBoardImage = {
  id: string;
  src: string;
  objectPosition: string;
  category: string;
  styleLabel?: string;
};

export type VisionRecommendation = {
  category: string;
  package: Package;
  packageId: string;
  preferredStyles: string[];
  visualThemes: string[];
  suggestedLocations: string[];
  addons: { name: string; price: string; reason: string }[];
  reasons: string[];
  investmentLabel: string;
  contactHref: string;
};

export type VisionRecord = {
  sessionType: string;
  preferredStyles: string[];
  favoriteImages: VisionBoardImage[];
  editingPreference?: string;
  locationPreference?: string;
  energyPreference?: string;
  eraPreference?: string;
  moments: string[];
  packageRecommendation: {
    category: string;
    packageId: string;
    name: string;
    price: string;
  };
  visionSummary: string;
  timestamp: string;
};

export type VisionStepId =
  | "welcome"
  | "styles"
  | "celebration"
  | "feel"
  | "moments"
  | "editing"
  | "setting"
  | "energy"
  | "era"
  | "result";
