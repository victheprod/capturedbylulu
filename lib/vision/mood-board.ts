import { portfolioScrollShowcase } from "@/data/portfolio";
import type { VisionAnswers, VisionBoardImage } from "./types";
import { visionStyleCards } from "./styles";

const categoryBoost: Record<string, string[]> = {
  wedding: ["Weddings"],
  engagement: ["Weddings", "Portraits"],
  portrait: ["Portraits"],
  family: ["Families"],
  event: ["Events"],
  milestone: ["Portraits", "Events", "Families"],
};

const styleImageBoost: Record<string, string[]> = {
  editorial: ["portraits/DSC08765", "portraits/DSC08173", "weddings/DSC07789"],
  documentary: ["weddings/DSC02836", "families/DSC00439", "events/DSC09870"],
  romantic: ["weddings/DSC07766", "weddings/DSC02748", "weddings/DSC02783"],
  luxury: ["weddings/DSC02880", "weddings/DSC02813", "portraits/DSC08205"],
  timeless: ["weddings/DSC02783", "weddings/DSC03295", "families/IMG_3649"],
  cinematic: ["weddings/DSC00201", "weddings/DSC00181", "portraits/DSC07888"],
  candid: ["families/DSC00439", "families/DSC00572", "events/DSC06941"],
  "black-white": ["portraits/DSC05682", "portraits/DSC05533"],
  flash: ["events/DSC09813", "events/DSC01224", "events/DSC09870"],
  "golden-hour": ["weddings/DSC02774", "weddings/DSC02813", "families/DSC00602"],
  moody: ["portraits/DSC07888", "weddings/DSC07789", "portraits/DSC08149"],
  "bright-airy": ["families/IMG_3621", "families/DSC00572", "portraits/DSC04123"],
};

function toBoardImage(
  id: string,
  styleLabel?: string,
): VisionBoardImage | null {
  const fromStyle = visionStyleCards.find((s) => s.imageId === id);
  if (fromStyle) {
    return {
      id: fromStyle.imageId,
      src: fromStyle.src,
      objectPosition: fromStyle.objectPosition,
      category: fromStyle.category,
      styleLabel,
    };
  }

  const fromPortfolio = portfolioScrollShowcase.find((p) => p.id === id);
  if (fromPortfolio) {
    return {
      id: fromPortfolio.id,
      src: fromPortfolio.src,
      objectPosition: fromPortfolio.objectPosition,
      category: fromPortfolio.category,
      styleLabel,
    };
  }

  return null;
}

/** Build a live mood board from current selections — deduped, max 9 tiles */
export function buildMoodBoard(answers: VisionAnswers): VisionBoardImage[] {
  const orderedIds: string[] = [];
  const seen = new Set<string>();

  const push = (id: string) => {
    if (!seen.has(id)) {
      seen.add(id);
      orderedIds.push(id);
    }
  };

  for (const styleId of answers.styles) {
    const card = visionStyleCards.find((s) => s.id === styleId);
    if (card) push(card.imageId);
    for (const boostId of styleImageBoost[styleId] ?? []) {
      push(boostId);
    }
  }

  if (answers.celebration) {
    const cats = categoryBoost[answers.celebration] ?? [];
    for (const item of portfolioScrollShowcase) {
      if (cats.includes(item.category)) push(item.id);
    }
  }

  if (orderedIds.length < 6) {
    for (const item of portfolioScrollShowcase) {
      push(item.id);
      if (orderedIds.length >= 9) break;
    }
  }

  const images: VisionBoardImage[] = [];
  for (const id of orderedIds.slice(0, 9)) {
    const styleForImage = answers.styles.find((sid) => {
      const card = visionStyleCards.find((s) => s.id === sid);
      return card?.imageId === id;
    });
    const label = styleForImage
      ? visionStyleCards.find((s) => s.id === styleForImage)?.label
      : undefined;
    const img = toBoardImage(id, label);
    if (img) images.push(img);
  }

  return images;
}
