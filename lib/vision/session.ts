import type { VisionAnswers, VisionRecord, VisionStepId } from "./types";

export const VISION_STORAGE_KEY = "cbl-vision-session";
export const VISION_PREFILL_KEY = "cbl-vision-prefill";

export type VisionPrefill = {
  packageId: string;
  sessionType: string;
  package: string;
  location?: string;
  message: string;
  visionRecord?: VisionRecord;
};

export type VisionSession = {
  stepIndex: number;
  answers: VisionAnswers;
};

export const initialVisionAnswers: VisionAnswers = {
  styles: [],
  moments: [],
};

export const initialVisionSession: VisionSession = {
  stepIndex: 0,
  answers: initialVisionAnswers,
};

export function loadVisionSession(): VisionSession {
  if (typeof window === "undefined") return initialVisionSession;
  try {
    const raw = sessionStorage.getItem(VISION_STORAGE_KEY);
    if (!raw) return initialVisionSession;
    const parsed = JSON.parse(raw) as VisionSession;
    return {
      stepIndex: parsed.stepIndex ?? 0,
      answers: { ...initialVisionAnswers, ...parsed.answers },
    };
  } catch {
    return initialVisionSession;
  }
}

export function saveVisionSession(session: VisionSession) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(VISION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore quota errors
  }
}

export function clearVisionSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(VISION_STORAGE_KEY);
  sessionStorage.removeItem(VISION_PREFILL_KEY);
}

export function saveVisionPrefill(prefill: VisionPrefill) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(VISION_PREFILL_KEY, JSON.stringify(prefill));
  } catch {
    // ignore
  }
}

export function loadVisionPrefill(): VisionPrefill | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(VISION_PREFILL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VisionPrefill;
  } catch {
    return null;
  }
}

export function clearVisionPrefill() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(VISION_PREFILL_KEY);
}

export const visionStepOrder: VisionStepId[] = [
  "welcome",
  "styles",
  "celebration",
  "feel",
  "moments",
  "editing",
  "setting",
  "energy",
  "era",
  "result",
];
