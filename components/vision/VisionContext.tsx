"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { VisionAnswers, VisionStepId } from "@/lib/vision/types";
import {
  initialVisionAnswers,
  initialVisionSession,
  loadVisionSession,
  saveVisionSession,
  visionStepOrder,
} from "@/lib/vision/session";

type VisionContextValue = {
  stepId: VisionStepId;
  stepIndex: number;
  totalSteps: number;
  answers: VisionAnswers;
  direction: number;
  setAnswer: <K extends keyof VisionAnswers>(
    key: K,
    value: VisionAnswers[K],
  ) => void;
  toggleStyle: (styleId: VisionAnswers["styles"][number]) => void;
  toggleMoment: (moment: VisionAnswers["moments"][number]) => void;
  goNext: () => void;
  goBack: () => void;
  goToStep: (id: VisionStepId) => void;
  reset: () => void;
  canAdvance: boolean;
};

const VisionContext = createContext<VisionContextValue | null>(null);

export function VisionProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<VisionAnswers>(initialVisionAnswers);
  const [direction, setDirection] = useState(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const session = loadVisionSession();
    setStepIndex(session.stepIndex);
    setAnswers(session.answers);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveVisionSession({ stepIndex, answers });
  }, [stepIndex, answers, hydrated]);

  const stepId = visionStepOrder[stepIndex] ?? "welcome";
  const totalSteps = visionStepOrder.length - 1;

  const setAnswer = useCallback(
    <K extends keyof VisionAnswers>(key: K, value: VisionAnswers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleStyle = useCallback((styleId: VisionAnswers["styles"][number]) => {
    setAnswers((prev) => {
      const has = prev.styles.includes(styleId);
      return {
        ...prev,
        styles: has
          ? prev.styles.filter((s) => s !== styleId)
          : [...prev.styles, styleId],
      };
    });
  }, []);

  const toggleMoment = useCallback((moment: VisionAnswers["moments"][number]) => {
    setAnswers((prev) => {
      const has = prev.moments.includes(moment);
      return {
        ...prev,
        moments: has
          ? prev.moments.filter((m) => m !== moment)
          : [...prev.moments, moment],
      };
    });
  }, []);

  const canAdvance = useMemo(() => {
    switch (stepId) {
      case "welcome":
        return true;
      case "styles":
        return answers.styles.length > 0;
      case "celebration":
        return Boolean(answers.celebration);
      case "feel":
        return Boolean(answers.feel);
      case "moments":
        return answers.moments.length > 0;
      case "editing":
        return Boolean(answers.editing);
      case "setting":
        return Boolean(answers.setting);
      case "energy":
        return Boolean(answers.energy);
      case "era":
        return Boolean(answers.era);
      case "result":
        return true;
      default:
        return false;
    }
  }, [stepId, answers]);

  const goNext = useCallback(() => {
    if (!canAdvance) return;
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, visionStepOrder.length - 1));
  }, [canAdvance]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goToStep = useCallback((id: VisionStepId) => {
    const idx = visionStepOrder.indexOf(id);
    if (idx >= 0) {
      setDirection(idx > stepIndex ? 1 : -1);
      setStepIndex(idx);
    }
  }, [stepIndex]);

  const reset = useCallback(() => {
    setAnswers(initialVisionAnswers);
    setStepIndex(0);
    setDirection(-1);
    saveVisionSession(initialVisionSession);
  }, []);

  const value = useMemo(
    () => ({
      stepId,
      stepIndex,
      totalSteps,
      answers,
      direction,
      setAnswer,
      toggleStyle,
      toggleMoment,
      goNext,
      goBack,
      goToStep,
      reset,
      canAdvance,
    }),
    [
      stepId,
      stepIndex,
      totalSteps,
      answers,
      direction,
      setAnswer,
      toggleStyle,
      toggleMoment,
      goNext,
      goBack,
      goToStep,
      reset,
      canAdvance,
    ],
  );

  return (
    <VisionContext.Provider value={value}>{children}</VisionContext.Provider>
  );
}

export function useVision() {
  const ctx = useContext(VisionContext);
  if (!ctx) throw new Error("useVision must be used within VisionProvider");
  return ctx;
}
