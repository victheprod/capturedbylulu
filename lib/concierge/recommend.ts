import {
  addons,
  brandPackages,
  eventPackages,
  familyPackages,
  getContactHref,
  headshotPackages,
  portraitPackages,
  preWeddingPackages,
  weddingPackages,
  type Package,
} from "@/data/packages";
import type {
  ConciergeAnswers,
  ConciergeRecommendation,
  Deliverable,
  Occasion,
  Scale,
  Vision,
} from "./types";

function parsePrice(price: string): number {
  const match = price.match(/\d+/);
  return match ? Number(match[0]) : 0;
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

function scorePackage(
  pkg: Package,
  answers: ConciergeAnswers,
  category: string,
): number {
  let score = 0;
  const price = parsePrice(pkg.price);

  if (price <= answers.budgetMax) score += 30;
  else if (price <= answers.budgetMax * 1.15) score += 12;
  else score -= 25;

  if (pkg.popular) score += 8;

  if (answers.vision === "full-coverage" && /full|8|10|6 hour/i.test(pkg.duration)) {
    score += 20;
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
    if (/intimate|essential|4 hour/i.test(`${pkg.name} ${pkg.duration}`)) score += 22;
  }
  if (answers.scale === "full-wedding") {
    if (/classic|signature|8|10 hour/i.test(`${pkg.name} ${pkg.duration}`)) score += 22;
  }
  if (answers.scale === "corporate-event" || answers.scale === "large-event") {
    if (/4-hour|6-hour|full-day|full day/i.test(`${pkg.name} ${pkg.duration}`)) score += 18;
  }

  if (answers.deliverables.includes("rush-delivery") && /priority|rush/i.test(pkg.features.join(" "))) {
    score += 12;
  }
  if (answers.deliverables.includes("multi-location") && /location/i.test(pkg.features.join(" "))) {
    score += 14;
  }
  if (answers.deliverables.includes("extra-photos") && /30|40|50|60|150|400|600/i.test(pkg.features.join(" "))) {
    score += 8;
  }
  if (answers.deliverables.includes("engagement-session") && /engagement/i.test(pkg.features.join(" "))) {
    score += 16;
  }

  if (answers.timeline === "urgent" && /priority|rush|quick/i.test(`${pkg.name} ${pkg.features.join(" ")}`)) {
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

  if (answers.vision === "editorial") {
    reasons.push("Lulu's editorial approach matches your desire for polished, cinematic imagery.");
  } else if (answers.vision === "candid") {
    reasons.push("This session length gives Lulu room to capture authentic, in-between moments.");
  } else if (answers.vision === "full-coverage") {
    reasons.push("The coverage window aligns with your need for comprehensive storytelling.");
  } else if (answers.vision === "efficient") {
    reasons.push("A focused session that respects your time without sacrificing quality.");
  } else if (answers.vision === "business-content") {
    reasons.push("Built for brand consistency, commercial usage, and content variety.");
  }

  if (answers.scale === "intimate-wedding") {
    reasons.push("Ideal for intimate ceremonies where every moment carries weight.");
  } else if (answers.scale === "full-wedding") {
    reasons.push("Enough coverage for getting-ready through celebration without rushing the day.");
  } else if (answers.scale === "large-family") {
    reasons.push("Accommodates larger groups with enough edited images for everyone.");
  }

  if (pkg.popular) {
    reasons.push("A client favorite — balanced investment, deliverables, and experience.");
  }

  if (answers.deliverables.includes("engagement-session") && /engagement/i.test(pkg.features.join(" "))) {
    reasons.push("Includes a complimentary engagement session — perfect for your timeline.");
  }

  if (reasons.length < 2) {
    reasons.push(
      `${pkg.duration} of dedicated time with ${pkg.features[0]?.toLowerCase() ?? "a private online gallery"}.`,
    );
  }

  if (reasons.length < 3) {
    reasons.push(`Fits comfortably within your stated investment comfort zone.`);
  }

  return reasons.slice(0, 3);
}

function suggestAddons(
  answers: ConciergeAnswers,
  pkg: Package,
): { name: string; price: string; reason: string }[] {
  const suggestions: { name: string; price: string; reason: string }[] = [];

  for (const addon of addons) {
    if (answers.deliverables.includes("rush-delivery") && addon.name.includes("Rush")) {
      suggestions.push({
        name: addon.name,
        price: addon.price,
        reason: "You mentioned wanting faster turnaround.",
      });
    }
    if (answers.deliverables.includes("extra-photos") && addon.name.includes("Extra edited")) {
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
  }

  if (answers.location === "out-of-state" || answers.location === "texas-travel") {
    suggestions.push({
      name: "Travel coverage",
      price: "From $50 — quoted per booking",
      reason: "Lulu is Texas-based and available for travel nationwide.",
    });
  }

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    if (seen.has(s.name)) return false;
    seen.add(s.name);
    return true;
  }).slice(0, 3);
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
  const price = parsePrice(best.price);
  const investmentLabel =
    best.price.includes("Starting") || best.price.includes("+")
      ? best.price
      : `~${best.price}`;

  return {
    category,
    package: best,
    packageId: best.id,
    reasons: buildReasons(best, category, answers),
    investmentLabel,
    addons: suggestAddons(answers, best),
    contactHref: getContactHref(category, best),
    alternatePackage: pickAlternate(packages, best, answers, category),
  };
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

export const BUDGET_MIN = 75;
export const BUDGET_MAX = 4500;
