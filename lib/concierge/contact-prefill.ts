import {
  getPackageBookingValue,
  getPackageEntryById,
} from "@/data/packages";
import { saveConciergePrefill } from "./session";
import type { ConciergeAnswers, ConciergeRecommendation } from "./types";
import {
  labelForCoverage,
  labelForOccasion,
  labelForScale,
  locationLabels,
  settingLabels,
  timelineLabels,
  visionOptions,
} from "./questions";

export function buildConciergeSummary(answers: ConciergeAnswers): string {
  const lines: string[] = [
    "— Capture Concierge summary —",
  ];

  if (answers.occasion) {
    lines.push(`Session: ${labelForOccasion(answers.occasion)}`);
  }
  if (answers.timeline) {
    lines.push(`Timeframe: ${timelineLabels[answers.timeline]}`);
  }
  if (answers.location) {
    lines.push(`Location: ${locationLabels[answers.location]}`);
  }
  if (answers.scale) {
    lines.push(`Group size: ${labelForScale(answers.scale)}`);
  }
  if (answers.coverage) {
    lines.push(`Coverage: ${labelForCoverage(answers.coverage)}`);
  }
  if (answers.setting) {
    lines.push(`Setting: ${settingLabels[answers.setting]}`);
  }
  if (answers.vision) {
    lines.push(`Style: ${visionOptions[answers.vision].label}`);
  }
  if (answers.addonInterests.length) {
    lines.push(
      `Add-on interests: ${answers.addonInterests.join(", ").replace(/-/g, " ")}`,
    );
  }

  lines.push("");
  lines.push("I'd love to discuss this recommendation and confirm availability.");

  return lines.join("\n");
}

export function buildConciergeContactHref(
  answers: ConciergeAnswers,
  recommendation: ConciergeRecommendation,
): string {
  const entry = getPackageEntryById(recommendation.packageId);
  const packageValue = entry
    ? getPackageBookingValue(entry.category, entry.pkg)
    : `${recommendation.category} — ${recommendation.package.name} (${recommendation.package.price})`;

  const summary = buildConciergeSummary(answers);
  const message = `${summary}\n\nRecommended: ${recommendation.category} — ${recommendation.package.name} (${recommendation.package.price})`;

  const locationLabel = answers.location
    ? locationLabels[answers.location]
    : undefined;

  saveConciergePrefill({
    packageId: recommendation.packageId,
    sessionType: recommendation.category,
    package: packageValue,
    location: locationLabel,
    message,
  });

  const params = new URLSearchParams();
  params.set("package", recommendation.packageId);
  params.set("from", "concierge");

  if (locationLabel) {
    params.set("concierge_location", locationLabel);
  }
  if (answers.timeline) {
    params.set("concierge_timeline", timelineLabels[answers.timeline]);
  }
  if (answers.setting) {
    params.set("concierge_setting", settingLabels[answers.setting]);
  }

  return `/contact?${params.toString()}`;
}

export function parseConciergeSearchParams(searchParams: URLSearchParams) {
  const fromConcierge = searchParams.get("from") === "concierge";
  const packageId = searchParams.get("package");
  const message = searchParams.get("message");
  const location =
    searchParams.get("concierge_location") ?? searchParams.get("location");
  const timeline = searchParams.get("concierge_timeline");

  let initialPackage: { sessionType: string; package: string } | undefined;
  if (packageId) {
    const entry = getPackageEntryById(packageId);
    if (entry) {
      initialPackage = {
        sessionType: entry.category,
        package: getPackageBookingValue(entry.category, entry.pkg),
      };
    }
  }

  return {
    fromConcierge,
    initialPackage,
    prefilledMessage: message ?? undefined,
    prefilledLocation: location ?? undefined,
    prefilledTimeline: timeline ?? undefined,
  };
}
