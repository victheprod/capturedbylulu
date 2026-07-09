import {
  getPackageBookingValue,
  getPackageEntryById,
} from "@/data/packages";
import type { VisionAnswers, VisionBoardImage, VisionRecommendation, VisionRecord } from "./types";
import { buildMoodBoard } from "./mood-board";
import {
  celebrationLabel,
  editingLabel,
  energyLabel,
  eraLabel,
  feelLabel,
  settingLabel,
} from "./recommend";
import { saveVisionPrefill } from "./session";
import { momentOptions } from "./steps";
import { styleLabel } from "./styles";

export function buildVisionSummary(answers: VisionAnswers): string {
  const lines: string[] = ["— Build Your Vision summary —"];

  if (answers.styles.length) {
    lines.push(`Photography styles: ${answers.styles.map(styleLabel).join(", ")}`);
  }
  if (answers.celebration) {
    lines.push(`Celebrating: ${celebrationLabel(answers.celebration)}`);
  }
  if (answers.feel) {
    lines.push(`Desired feel: ${feelLabel(answers.feel)}`);
  }
  if (answers.moments.length) {
    const labels = answers.moments
      .map((m) => momentOptions.find((o) => o.value === m)?.label)
      .filter(Boolean);
    lines.push(`Key moments: ${labels.join(", ")}`);
  }
  if (answers.editing) {
    lines.push(`Editing preference: ${editingLabel(answers.editing)}`);
  }
  if (answers.setting) {
    lines.push(`Setting: ${settingLabel(answers.setting)}`);
  }
  if (answers.energy) {
    lines.push(`Energy: ${energyLabel(answers.energy)}`);
  }
  if (answers.era) {
    lines.push(`Aesthetic: ${eraLabel(answers.era)}`);
  }

  lines.push("");
  lines.push("I'd love to bring this vision to life with Lulu.");

  return lines.join("\n");
}

export function buildVisionRecord(
  answers: VisionAnswers,
  recommendation: VisionRecommendation,
): VisionRecord {
  const board = buildMoodBoard(answers);
  return {
    sessionType: celebrationLabel(answers.celebration!),
    preferredStyles: answers.styles.map(styleLabel),
    favoriteImages: board,
    editingPreference: answers.editing ? editingLabel(answers.editing) : undefined,
    locationPreference: answers.setting ? settingLabel(answers.setting) : undefined,
    energyPreference: answers.energy ? energyLabel(answers.energy) : undefined,
    eraPreference: answers.era ? eraLabel(answers.era) : undefined,
    moments: answers.moments
      .map((m) => momentOptions.find((o) => o.value === m)?.label ?? m),
    packageRecommendation: {
      category: recommendation.category,
      packageId: recommendation.packageId,
      name: recommendation.package.name,
      price: recommendation.package.price,
    },
    visionSummary: buildVisionSummary(answers),
    timestamp: new Date().toISOString(),
  };
}

export function buildVisionContactHref(
  answers: VisionAnswers,
  recommendation: VisionRecommendation,
  board: VisionBoardImage[],
): string {
  const entry = getPackageEntryById(recommendation.packageId);
  const packageValue = entry
    ? getPackageBookingValue(entry.category, entry.pkg)
    : `${recommendation.category} — ${recommendation.package.name} (${recommendation.package.price})`;

  const summary = buildVisionSummary(answers);
  const imageNote =
    board.length > 0
      ? `\n\nInspiration images I loved:\n${board.slice(0, 6).map((img) => `• ${img.category} — ${img.id}`).join("\n")}`
      : "";

  const message = `${summary}\n\nRecommended: ${recommendation.category} — ${recommendation.package.name} (${recommendation.package.price})${imageNote}`;

  const record = buildVisionRecord(answers, recommendation);

  saveVisionPrefill({
    packageId: recommendation.packageId,
    sessionType: recommendation.category,
    package: packageValue,
    location: answers.setting ? settingLabel(answers.setting) : undefined,
    message,
    visionRecord: record,
  });

  const params = new URLSearchParams();
  params.set("package", recommendation.packageId);
  params.set("from", "vision");

  if (answers.setting) {
    params.set("vision_setting", settingLabel(answers.setting));
  }

  return `/contact?${params.toString()}`;
}
