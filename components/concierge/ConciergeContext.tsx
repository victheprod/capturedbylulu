"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ConciergeAnswers, ConciergeStepId } from "@/lib/concierge/types";
import {
  clearConciergeSession,
  initialConciergeAnswers,
  initialConciergeSession,
  loadConciergeSession,
  saveConciergeSession,
  type ConciergeSession,
} from "@/lib/concierge/session";

type ConciergeContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  stepIndex: number;
  setStepIndex: (index: number | ((prev: number) => number)) => void;
  answers: ConciergeAnswers;
  setAnswers: (
    updater: ConciergeAnswers | ((prev: ConciergeAnswers) => ConciergeAnswers),
  ) => void;
  unsureFields: ConciergeStepId[];
  markUnsure: (step: ConciergeStepId) => void;
  restart: () => void;
  hasProgress: boolean;
};

const ConciergeContext = createContext<ConciergeContextValue | null>(null);

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<ConciergeSession>(initialConciergeSession);

  useEffect(() => {
    setSession(loadConciergeSession());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveConciergeSession(session);
  }, [session, hydrated]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const setStepIndex = useCallback(
    (index: number | ((prev: number) => number)) => {
      setSession((prev) => ({
        ...prev,
        stepIndex: typeof index === "function" ? index(prev.stepIndex) : index,
      }));
    },
    [],
  );

  const setAnswers = useCallback(
    (
      updater: ConciergeAnswers | ((prev: ConciergeAnswers) => ConciergeAnswers),
    ) => {
      setSession((prev) => ({
        ...prev,
        answers:
          typeof updater === "function" ? updater(prev.answers) : updater,
      }));
    },
    [],
  );

  const markUnsure = useCallback((step: ConciergeStepId) => {
    setSession((prev) => ({
      ...prev,
      unsureFields: prev.unsureFields.includes(step)
        ? prev.unsureFields
        : [...prev.unsureFields, step],
    }));
  }, []);

  const restart = useCallback(() => {
    clearConciergeSession();
    setSession(initialConciergeSession);
  }, []);

  const hasProgress = useMemo(
    () =>
      session.stepIndex > 0 ||
      Boolean(session.answers.occasion) ||
      session.answers.budgetMax !== initialConciergeAnswers.budgetMax,
    [session],
  );

  const value = useMemo<ConciergeContextValue>(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      stepIndex: session.stepIndex,
      setStepIndex,
      answers: session.answers,
      setAnswers,
      unsureFields: session.unsureFields,
      markUnsure,
      restart,
      hasProgress,
    }),
    [
      isOpen,
      open,
      close,
      toggle,
      session,
      setStepIndex,
      setAnswers,
      markUnsure,
      restart,
      hasProgress,
    ],
  );

  return (
    <ConciergeContext.Provider value={value}>{children}</ConciergeContext.Provider>
  );
}

export function useConcierge() {
  const ctx = useContext(ConciergeContext);
  if (!ctx) {
    throw new Error("useConcierge must be used within ConciergeProvider");
  }
  return ctx;
}

export function useConciergeOptional() {
  return useContext(ConciergeContext);
}
