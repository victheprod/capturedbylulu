import type { ConciergeAnswers, ConciergeStepId } from "./types";

export const CONCIERGE_STORAGE_KEY = "cbl-concierge-session";
export const CONCIERGE_PREFILL_KEY = "cbl-concierge-prefill";

export type ConciergePrefill = {
  packageId: string;
  sessionType: string;
  package: string;
  location?: string;
  message: string;
};

export type ConciergeSession = {
  stepIndex: number;
  answers: ConciergeAnswers;
  unsureFields: ConciergeStepId[];
};

export const initialConciergeAnswers: ConciergeAnswers = {
  deliverables: ["digital-gallery"],
  addonInterests: [],
  budgetMax: 500,
};

export const initialConciergeSession: ConciergeSession = {
  stepIndex: 0,
  answers: initialConciergeAnswers,
  unsureFields: [],
};

export function loadConciergeSession(): ConciergeSession {
  if (typeof window === "undefined") return initialConciergeSession;
  try {
    const raw = sessionStorage.getItem(CONCIERGE_STORAGE_KEY);
    if (!raw) return initialConciergeSession;
    const parsed = JSON.parse(raw) as ConciergeSession;
    return {
      stepIndex: parsed.stepIndex ?? 0,
      answers: { ...initialConciergeAnswers, ...parsed.answers },
      unsureFields: parsed.unsureFields ?? [],
    };
  } catch {
    return initialConciergeSession;
  }
}

export function saveConciergeSession(session: ConciergeSession) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CONCIERGE_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore quota errors
  }
}

export function clearConciergeSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CONCIERGE_STORAGE_KEY);
  sessionStorage.removeItem(CONCIERGE_PREFILL_KEY);
}

export function saveConciergePrefill(prefill: ConciergePrefill) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CONCIERGE_PREFILL_KEY, JSON.stringify(prefill));
  } catch {
    // ignore
  }
}

export function loadConciergePrefill(): ConciergePrefill | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CONCIERGE_PREFILL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConciergePrefill;
  } catch {
    return null;
  }
}

export function clearConciergePrefill() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CONCIERGE_PREFILL_KEY);
}
