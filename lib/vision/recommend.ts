import {
  addons,
  brandPackages,
  eventPackages,
  familyPackages,
  headshotPackages,
  portraitPackages,
  preWeddingPackages,
  weddingPackages,
  type Package,
} from "@/data/packages";
import type { Celebration, VisionAnswers, VisionRecommendation } from "./types";
import { buildMoodBoard } from "./mood-board";
import { styleLabel } from "./styles";
import {
  celebrationOptions,
  editingOptions,
  energyOptions,
  eraOptions,
  feelOptions,
  locationSuggestions,
  momentOptions,
  settingOptions,
} from "./steps";
import { buildVisionContactHref } from "./prefill";

function packagesForCelebration(celebration: Celebration): {
  category: string;
  packages: Package[];
} {
  switch (celebration) {
    case "wedding":
      return { category: "Weddings", packages: weddingPackages };
    case "engagement":
      return { category: "Pre-Wedding", packages: preWeddingPackages };
    case "portrait":
      return { category: "Portraits", packages: portraitPackages };
    case "family":
      return { category: "Families", packages: familyPackages };
    case "event":
      return { category: "Events", packages: eventPackages };
    case "milestone":
      return { category: "Portraits", packages: portraitPackages };
    default:
      return { category: "Portraits", packages: portraitPackages };
  }
}

function scorePackage(pkg: Package, answers: VisionAnswers, category: string): number {
  let score = 0;
  const meta = `${pkg.name} ${pkg.duration} ${pkg.features.join(" ")}`.toLowerCase();

  if (pkg.popular) score += 10;

  if (answers.celebration === "wedding") {
    if (/classic|signature|8|10|full/i.test(meta)) score += 18;
    if (answers.moments.includes("getting-ready") && /full|8|10/i.test(meta)) score += 12;
    if (answers.moments.includes("reception") && /full|8|10|6/i.test(meta)) score += 10;
  }

  if (answers.celebration === "engagement") {
    if (/engagement|couple/i.test(meta)) score += 20;
    if (/mini|basic|essential/i.test(pkg.name)) score += 8;
  }

  if (answers.celebration === "family") {
    if (/family|extended|large/i.test(meta)) score += 16;
  }

  if (answers.celebration === "event") {
    if (/4-hour|6-hour|full-day|full day/i.test(meta)) score += 16;
  }

  if (answers.celebration === "portrait" || answers.celebration === "milestone") {
    if (/mini|basic|essential|quick|starter/i.test(pkg.name)) score += 14;
    if (/premium|signature|luxury/i.test(pkg.name)) score += 8;
  }

  if (answers.styles.includes("luxury") || answers.styles.includes("editorial")) {
    if (/premium|signature|luxury|standard/i.test(pkg.name)) score += 14;
  }

  if (answers.styles.includes("candid") || answers.styles.includes("documentary")) {
    if (/extended|full|4 hour|6 hour/i.test(meta)) score += 8;
  }

  if (answers.feel === "intimate" && /mini|intimate|1 hour|45/i.test(meta)) score += 10;
  if (answers.feel === "bold" && /premium|signature/i.test(pkg.name)) score += 10;
  if (answers.feel === "playful" && /family|event/i.test(category)) score += 6;

  if (answers.energy === "elegant" && /luxury|signature|premium/i.test(pkg.name)) score += 12;
  if (answers.energy === "adventurous" && /location|outdoor/i.test(meta)) score += 10;

  if (answers.setting === "outdoor" && /outdoor|location/i.test(meta)) score += 8;
  if (answers.setting === "indoor" && /studio|indoor/i.test(meta)) score += 6;
  if (answers.setting === "both") score += 4;

  if (answers.editing === "light-airy" || answers.styles.includes("bright-airy")) {
    if (/portrait|family/i.test(category)) score += 6;
  }
  if (answers.editing === "rich-moody" || answers.styles.includes("moody")) {
    if (/wedding|portrait/i.test(category)) score += 6;
  }

  if (answers.era === "classic" && /classic|timeless/i.test(meta)) score += 8;
  if (answers.era === "modern" && /premium|editorial/i.test(meta)) score += 8;

  return score;
}

function buildReasons(pkg: Package, category: string, answers: VisionAnswers): string[] {
  const reasons: string[] = [];
  const styles = answers.styles.map(styleLabel);

  if (styles.length) {
    reasons.push(
      `Your taste for ${styles.slice(0, 3).join(", ")}${styles.length > 3 ? ", and more" : ""} aligns with Lulu's approach.`,
    );
  }

  if (answers.feel) {
    const feel = feelOptions.find((f) => f.value === answers.feel)?.label;
    if (feel) reasons.push(`Sessions are crafted to feel ${feel.toLowerCase()} — exactly what you described.`);
  }

  if (answers.moments.length) {
    const momentLabels = answers.moments
      .map((m) => momentOptions.find((o) => o.value === m)?.label)
      .filter(Boolean)
      .slice(0, 3);
    if (momentLabels.length) {
      reasons.push(`Coverage supports the moments you care about: ${momentLabels.join(", ")}.`);
    }
  }

  if (answers.setting) {
    const locs = locationSuggestions[answers.setting];
    reasons.push(`Works beautifully for ${locs[0].toLowerCase()} and similar settings.`);
  }

  if (pkg.popular) {
    reasons.push("A client favorite — balanced investment and deliverables.");
  }

  if (reasons.length < 3) {
    reasons.push(`${pkg.duration} gives room to tell your story without rushing.`);
  }

  return reasons.slice(0, 4);
}

function suggestAddons(answers: VisionAnswers, pkg: Package) {
  const suggestions: VisionRecommendation["addons"] = [];

  if (answers.moments.includes("details")) {
    const extra = addons.find((a) => a.name.includes("Extra edited"));
    if (extra) {
      suggestions.push({
        name: extra.name,
        price: extra.price,
        reason: "More frames for florals, décor, and the small details you love.",
      });
    }
  }

  if (answers.setting === "both" || answers.setting === "outdoor") {
    const loc = addons.find((a) => a.name.includes("Additional location"));
    if (loc) {
      suggestions.push({
        name: loc.name,
        price: loc.price,
        reason: "Perfect if you're dreaming of more than one backdrop.",
      });
    }
  }

  if (answers.styles.includes("flash") || answers.styles.includes("editorial")) {
    const outfit = addons.find((a) => a.name.includes("outfit"));
    if (outfit) {
      suggestions.push({
        name: outfit.name,
        price: outfit.price,
        reason: "Add another look for editorial variety.",
      });
    }
  }

  if (answers.celebration === "wedding" && answers.moments.includes("reception")) {
    suggestions.push({
      name: "Extra coverage hours",
      price: "Quoted per booking",
      reason: "Extend into dancing and celebration without watching the clock.",
    });
  }

  return suggestions.slice(0, 4);
}

function visualThemes(answers: VisionAnswers): string[] {
  const themes = answers.styles.map(styleLabel);
  if (answers.editing) {
    const edit = editingOptions.find((e) => e.value === answers.editing)?.label;
    if (edit) themes.push(edit);
  }
  if (answers.era) {
    const era = eraOptions.find((e) => e.value === answers.era)?.label;
    if (era) themes.push(era);
  }
  return [...new Set(themes)].slice(0, 6);
}

export function recommendFromVision(answers: VisionAnswers): VisionRecommendation | null {
  if (!answers.celebration || answers.styles.length === 0) return null;

  const { category, packages } = packagesForCelebration(answers.celebration);
  const ranked = packages
    .map((pkg) => ({ pkg, score: scorePackage(pkg, answers, category) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]?.pkg ?? packages.find((p) => p.popular) ?? packages[0];
  const board = buildMoodBoard(answers);
  const locations = answers.setting
    ? locationSuggestions[answers.setting]
    : locationSuggestions.both;

  const recommendation: VisionRecommendation = {
    category,
    package: best,
    packageId: best.id,
    preferredStyles: answers.styles.map(styleLabel),
    visualThemes: visualThemes(answers),
    suggestedLocations: locations,
    addons: suggestAddons(answers, best),
    reasons: buildReasons(best, category, answers),
    investmentLabel: best.price.includes("Starting") || best.price.includes("+")
      ? best.price
      : `~${best.price}`,
    contactHref: "",
  };

  recommendation.contactHref = buildVisionContactHref(answers, recommendation, board);
  return recommendation;
}

export function celebrationLabel(value: Celebration): string {
  return celebrationOptions.find((c) => c.value === value)?.label ?? value;
}

export function feelLabel(value: VisionAnswers["feel"]): string {
  if (!value) return "";
  return feelOptions.find((f) => f.value === value)?.label ?? value;
}

export function editingLabel(value: VisionAnswers["editing"]): string {
  if (!value) return "";
  return editingOptions.find((e) => e.value === value)?.label ?? value;
}

export function settingLabel(value: VisionAnswers["setting"]): string {
  if (!value) return "";
  return settingOptions.find((s) => s.value === value)?.label ?? value;
}

export function energyLabel(value: VisionAnswers["energy"]): string {
  if (!value) return "";
  return energyOptions.find((e) => e.value === value)?.label ?? value;
}

export function eraLabel(value: VisionAnswers["era"]): string {
  if (!value) return "";
  return eraOptions.find((e) => e.value === value)?.label ?? value;
}
