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
import { buildConciergeContactHref } from "./contact-prefill";
import type {
  ConciergeAnswers,
  ConciergeRecommendation,
  CoverageDuration,
  Occasion,
  Scale,
  Vision,
} from "./types";

function parsePrice(price: string): number {
  const match = price.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function parseDurationHours(duration: string): number {
  const hourMatch = duration.match(/(\d+)\s*hour/i);
  if (hourMatch) return Number(hourMatch[1]);
  const minuteMatch = duration.match(/(\d+)\s*minute/i);
  if (minuteMatch) return Number(minuteMatch[1]) / 60;
  if (/full/i.test(duration)) return 8;
  return 1;
}

function packagesForOccasion(occasion: Occasion): { category: string; packages: Package[] } {
  switch (occasion) {
    case "wedding":
      return { category: "Weddings", packages: weddingPackages };
    case "pre-wedding":
      return { category: "Pre-Wedding", packages: preWeddingPackages };
    case "portrait":
      return { category: "Portraits", packages: portraitPackages };
    case "family":
      return { category: "Families", packages: familyPackages };
    case "event":
      return { category: "Events", packages: eventPackages };
    case "brand":
      return { category: "Brand Photography", packages: brandPackages };
    case "headshot":
      return { category: "Headshots", packages: headshotPackages };
  }
}

function coverageFitScore(pkg: Package, coverage?: CoverageDuration): number {
  if (!coverage) return 0;
  const hours = parseDurationHours(pkg.duration);

  const targets: Record<CoverageDuration, [number, number]> = {
    "under-1hr": [0, 1],
    "1-2hr": [0.5, 2],
    "2-4hr": [1.5, 4],
    "4-6hr": [3.5, 6],
    "6-8hr": [5.5, 8],
    "full-day": [7, 12],
  };

  const [min, max] = targets[coverage];
  if (hours >= min && hours <= max) return 24;
  if (hours >= min - 0.5 && hours <= max + 1) return 12;
  return -10;
}

function scorePackage(
  pkg: Package,
  answers: ConciergeAnswers,
  category: string,
): number {
  let score = 0;
  const price = parsePrice(pkg.price);
  const featureText = pkg.features.join(" ").toLowerCase();
  const meta = `${pkg.name} ${pkg.duration} ${featureText}`.toLowerCase();

  if (price <= answers.budgetMax) score += 30;
  else if (price <= answers.budgetMax * 1.15) score += 12;
  else score -= 25;

  if (pkg.popular) score += 8;

  score += coverageFitScore(pkg, answers.coverage);

  if (answers.vision === "full-coverage" && /full|8|10|6 hour/i.test(pkg.duration)) {
    score += 18;
  }
  if (answers.vision === "efficient" && /mini|quick|20|30|40|45|1 hour/i.test(pkg.duration)) {
    score += 18;
  }
  if (answers.vision === "editorial" && /premium|luxury|signature|standard/i.test(pkg.name)) {
    score += 14;
  }
  if (answers.vision === "business-content" && category === "Brand Photography") {
    score += 22;
  }
  if (answers.vision === "candid") score += 6;

  if (answers.setting === "outdoor" && /outdoor|location/i.test(meta)) score += 8;
  if (answers.setting === "both" && /location|studio/i.test(meta)) score += 10;
  if (answers.setting === "indoor" && /studio|indoor/i.test(meta)) score += 6;

  if (answers.scale === "solo" || answers.scale === "couple") {
    if (/mini|basic|essential|quick|starter/i.test(pkg.name)) score += 16;
    if (/extended|team|full-day|signature/i.test(pkg.name)) score -= 8;
  }
  if (answers.scale === "small-family") {
    if (/small|standard family|basic/i.test(pkg.name)) score += 18;
  }
  if (answers.scale === "large-family") {
    if (/extended|large|premium|luxury/i.test(pkg.name)) score += 20;
  }
  if (answers.scale === "intimate-wedding") {
    if (/intimate|essential|4 hour/i.test(meta)) score += 22;
  }
  if (answers.scale === "full-wedding") {
    if (/classic|signature|8|10 hour/i.test(meta)) score += 22;
  }
  if (answers.scale === "corporate-event" || answers.scale === "large-event") {
    if (/4-hour|6-hour|full-day|full day/i.test(meta)) score += 18;
  }

  const wantsRush =
    answers.deliverables.includes("rush-delivery") ||
    answers.addonInterests.includes("rush-delivery");
  if (wantsRush && /priority|rush/i.test(featureText)) score += 12;

  const wantsExtraPhotos =
    answers.deliverables.includes("extra-photos") ||
    answers.addonInterests.includes("extra-photos");
  if (wantsExtraPhotos && /30|40|50|60|150|400|600/i.test(featureText)) score += 8;

  if (
    answers.deliverables.includes("multi-location") &&
    /location/i.test(featureText)
  ) {
    score += 14;
  }

  const wantsEngagement =
    answers.deliverables.includes("engagement-session") ||
    answers.addonInterests.includes("engagement-session");
  if (wantsEngagement && /engagement/i.test(featureText)) score += 16;

  if (answers.addonInterests.includes("second-shooter") && /2 photographer/i.test(featureText)) {
    score += 20;
  }

  if (answers.addonInterests.includes("extra-hours")) {
    if (/8|10|full|6 hour/i.test(pkg.duration)) score += 10;
    else score -= 4;
  }

  if (answers.timeline === "urgent" && /priority|rush|quick/i.test(meta)) {
    score += 10;
  }

  return score;
}

function buildReasons(
  pkg: Package,
  category: string,
  answers: ConciergeAnswers,
): string[] {
  const reasons: string[] = [];

  if (answers.coverage) {
    reasons.push(
      `${pkg.duration} aligns with the ${answers.coverage.replace(/-/g, " ")} coverage you're envisioning.`,
    );
  }

  if (answers.vision === "editorial") {
    reasons.push("Lulu's editorial approach matches your desire for polished, cinematic imagery.");
  } else if (answers.vision === "candid") {
    reasons.push("This session length gives room to capture authentic, in-between moments.");
  } else if (answers.vision === "full-coverage") {
    reasons.push("The coverage window supports comprehensive storytelling from start to finish.");
  } else if (answers.vision === "efficient") {
    reasons.push("A focused session that respects your time without sacrificing quality.");
  } else if (answers.vision === "business-content") {
    reasons.push("Built for brand consistency, commercial usage, and content variety.");
  }

  if (answers.scale === "intimate-wedding") {
    reasons.push("Ideal for intimate ceremonies where every moment carries weight.");
  } else if (answers.scale === "full-wedding") {
    reasons.push("Enough coverage for getting-ready through celebration without rushing the day.");
  } else if (answers.scale === "large-family" || answers.scale === "large-event") {
    reasons.push("Accommodates larger groups with enough edited images for everyone.");
  }

  if (answers.addonInterests.includes("second-shooter") && /2 photographer/i.test(pkg.features.join(" "))) {
    reasons.push("Includes a second photographer — exactly what you asked about.");
  }

  if (pkg.popular) {
    reasons.push("A client favorite — balanced investment, deliverables, and experience.");
  }

  if (reasons.length < 3) {
    reasons.push(`Fits within your stated investment comfort of up to $${answers.budgetMax.toLocaleString()}.`);
  }

  return reasons.slice(0, 4);
}

function suggestAddons(
  answers: ConciergeAnswers,
  pkg: Package,
): ConciergeRecommendation["addons"] {
  const suggestions: ConciergeRecommendation["addons"] = [];

  const wantsRush =
    answers.deliverables.includes("rush-delivery") ||
    answers.addonInterests.includes("rush-delivery");
  const wantsExtraPhotos =
    answers.deliverables.includes("extra-photos") ||
    answers.addonInterests.includes("extra-photos");

  for (const addon of addons) {
    if (wantsRush && addon.name.includes("Rush")) {
      suggestions.push({
        name: addon.name,
        price: addon.price,
        reason: "You mentioned wanting faster turnaround.",
      });
    }
    if (wantsExtraPhotos && addon.name.includes("Extra edited")) {
      suggestions.push({
        name: addon.name,
        price: addon.price,
        reason: "Expand your gallery beyond the package included count.",
      });
    }
    if (answers.deliverables.includes("multi-location") && addon.name.includes("Additional location")) {
      suggestions.push({
        name: addon.name,
        price: addon.price,
        reason: "Perfect if you're dreaming of more than one backdrop.",
      });
    }
    if (addon.name.includes("outfit") && /outfit/i.test(pkg.features.join(" "))) {
      suggestions.push({
        name: addon.name,
        price: addon.price,
        reason: "Add another look without changing packages.",
      });
    }
    if (wantsExtraPhotos && addon.name.includes("Full gallery upgrade")) {
      suggestions.push({
        name: addon.name,
        price: addon.price,
        reason: "Receive every captured frame, not just the curated selection.",
      });
    }
  }

  if (answers.location === "out-of-state" || answers.location === "texas-travel") {
    suggestions.push({
      name: "Travel coverage",
      price: "From $50 — quoted per booking",
      reason: "Lulu is Texas-based and available for travel nationwide.",
    });
  }

  if (answers.addonInterests.includes("second-shooter") && !/2 photographer/i.test(pkg.features.join(" "))) {
    suggestions.push({
      name: "Second photographer",
      price: "Discuss during inquiry",
      reason: "Available on select wedding packages — Lulu will confirm options for your date.",
      inquiryOnly: true,
    });
  }

  if (answers.addonInterests.includes("extra-hours")) {
    suggestions.push({
      name: "Extra coverage hours",
      price: "Quoted per booking",
      reason: "Extend your wedding or event coverage beyond the package window.",
      inquiryOnly: true,
    });
  }

  if (answers.addonInterests.includes("albums-prints")) {
    suggestions.push({
      name: "Albums & fine art prints",
      price: "Discuss during inquiry",
      reason: "Physical keepsakes can be planned once your gallery is ready.",
      inquiryOnly: true,
    });
  }

  if (answers.addonInterests.includes("video")) {
    suggestions.push({
      name: "Video coverage",
      price: "Discuss during inquiry",
      reason: "Share your vision — Lulu can advise on photography-first planning.",
      inquiryOnly: true,
    });
  }

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    if (seen.has(s.name)) return false;
    seen.add(s.name);
    return true;
  }).slice(0, 4);
}

function buildNextSteps(): string[] {
  return [
    "Lulu reads your inquiry personally within 24–48 hours.",
    "You'll connect for a brief discovery call to confirm details and availability.",
    "Receive a custom proposal with your date held once you're ready.",
    "Sign, submit your retainer, and your session is officially yours.",
  ];
}

function investmentRange(pkg: Package, answers: ConciergeAnswers): string {
  const base = parsePrice(pkg.price);
  let addonLow = 0;
  let addonHigh = 0;

  if (answers.addonInterests.includes("rush-delivery")) addonHigh += 150;
  if (answers.addonInterests.includes("extra-photos")) addonHigh += 50;
  if (answers.deliverables.includes("multi-location")) addonHigh += 50;
  if (answers.location !== "local") addonLow += 50;

  if (pkg.price.includes("Starting") || pkg.price.includes("+")) {
    return pkg.price;
  }

  if (addonHigh === 0 && addonLow === 0) {
    return `~${pkg.price}`;
  }

  const low = base + addonLow;
  const high = base + addonHigh;
  return `$${low.toLocaleString()} – $${high.toLocaleString()}`;
}

function pickAlternate(
  packages: Package[],
  primary: Package,
  answers: ConciergeAnswers,
  category: string,
) {
  const ranked = [...packages]
    .filter((p) => p.id !== primary.id)
    .map((p) => ({ pkg: p, score: scorePackage(p, answers, category) }))
    .sort((a, b) => b.score - a.score);

  const alt = ranked[0]?.pkg;
  if (!alt) return undefined;
  return { category, package: alt, packageId: alt.id };
}

export function recommendPackage(answers: ConciergeAnswers): ConciergeRecommendation | null {
  if (!answers.occasion) return null;

  const { category, packages } = packagesForOccasion(answers.occasion);
  if (!packages.length) return null;

  const ranked = packages
    .map((pkg) => ({ pkg, score: scorePackage(pkg, answers, category) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]?.pkg ?? packages.find((p) => p.popular) ?? packages[0];

  const recommendation: ConciergeRecommendation = {
    category,
    package: best,
    packageId: best.id,
    reasons: buildReasons(best, category, answers),
    investmentLabel: best.price.includes("Starting") || best.price.includes("+")
      ? best.price
      : `~${best.price}`,
    investmentRange: investmentRange(best, answers),
    addons: suggestAddons(answers, best),
    nextSteps: buildNextSteps(),
    contactHref: "",
    summaryNote: "",
    alternatePackage: pickAlternate(packages, best, answers, category),
  };

  recommendation.contactHref = buildConciergeContactHref(answers, recommendation);
  recommendation.summaryNote = `Recommended based on your ${category.toLowerCase()} session preferences.`;

  return recommendation;
}

export function scalesForOccasion(occasion?: Occasion): Scale[] {
  switch (occasion) {
    case "wedding":
    case "pre-wedding":
      return ["couple", "intimate-wedding", "full-wedding"];
    case "family":
      return ["small-family", "large-family"];
    case "event":
      return ["corporate-event", "large-event"];
    case "headshot":
      return ["solo", "corporate-event"];
    case "brand":
      return ["solo", "couple"];
    case "portrait":
    default:
      return ["solo", "couple", "small-family"];
  }
}

export function visionsForOccasion(occasion?: Occasion): Vision[] {
  if (occasion === "brand") {
    return ["business-content", "editorial", "efficient"];
  }
  if (occasion === "wedding" || occasion === "pre-wedding") {
    return ["candid", "editorial", "full-coverage"];
  }
  if (occasion === "event") {
    return ["candid", "full-coverage", "efficient"];
  }
  return ["candid", "editorial", "efficient"];
}

export function coverageForOccasion(occasion?: Occasion): CoverageDuration[] {
  switch (occasion) {
    case "wedding":
      return ["4-6hr", "6-8hr", "full-day"];
    case "pre-wedding":
      return ["under-1hr", "1-2hr", "2-4hr"];
    case "event":
      return ["2-4hr", "4-6hr", "6-8hr", "full-day"];
    case "headshot":
      return ["under-1hr", "1-2hr"];
    case "family":
    case "portrait":
      return ["under-1hr", "1-2hr", "2-4hr"];
    case "brand":
      return ["1-2hr", "2-4hr"];
    default:
      return ["under-1hr", "1-2hr", "2-4hr", "4-6hr"];
  }
}

export const BUDGET_MIN = 75;
export const BUDGET_MAX = 4500;
