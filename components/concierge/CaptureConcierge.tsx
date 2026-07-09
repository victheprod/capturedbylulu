"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { ConciergeAddonPick } from "@/components/concierge/ConciergeAddonPick";
import { ConciergeBudgetPick } from "@/components/concierge/ConciergeBudgetPick";
import { ConciergeIconGrid } from "@/components/concierge/ConciergeIconGrid";
import { ConciergePhotoGrid } from "@/components/concierge/ConciergePhotoGrid";
import { ConciergePriorityPick } from "@/components/concierge/ConciergePriorityPick";
import { ConciergeRecommendationReveal } from "@/components/concierge/ConciergeRecommendation";
import { ConciergeSettingPick } from "@/components/concierge/ConciergeSettingPick";
import { ConciergeShell } from "@/components/concierge/ConciergeShell";
import { ConciergeStepBar } from "@/components/concierge/ConciergeStepBar";
import { ConciergeWelcome } from "@/components/concierge/ConciergeWelcome";
import { conciergeCopy, conciergeMicrocopy } from "@/lib/concierge/copy";
import {
  coverageForOccasion,
  recommendPackage,
  scalesForOccasion,
} from "@/lib/concierge/recommend";
import {
  addonInterestOptions,
  conciergeSteps,
  coverageOptions,
  occasionOptions,
  scaleOptions,
} from "@/lib/concierge/questions";
import type { AddonInterest, ConciergeStepId } from "@/lib/concierge/types";
import type { VisionPickId } from "@/lib/concierge/visuals";
import { cn } from "@/lib/utils";

const stepOrder: ConciergeStepId[] = [
  "welcome",
  "occasion",
  "vision",
  "priorities",
  "setting",
  "addons",
  "investment",
  "result",
];

const slideVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function StepIntro({
  step,
}: {
  step: ConciergeStepId;
}) {
  const copy = conciergeCopy[step];
  if (!copy.title) return null;
  return (
    <header className="mb-7">
      <h2 className="font-serif text-[clamp(1.5rem,3.5vw,2.1rem)] font-light leading-[1.15] text-foreground">
        {copy.title}
      </h2>
      {copy.description ? (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/48">
          {copy.description}
        </p>
      ) : null}
    </header>
  );
}

function UnsureLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 w-full text-center text-xs tracking-wide text-foreground/38 underline-offset-4 transition-colors hover:text-primary hover:underline"
    >
      {conciergeMicrocopy.unsure}
    </button>
  );
}

type CaptureConciergeProps = {
  variant?: "page" | "sheet";
  onClose?: () => void;
};

export function CaptureConcierge({
  variant = "page",
  onClose,
}: CaptureConciergeProps) {
  const {
    stepIndex,
    setStepIndex,
    answers,
    setAnswers,
    markUnsure,
    restart: resetSession,
  } = useConcierge();

  const [direction, setDirection] = useState(1);
  const [visionPickId, setVisionPickId] = useState<VisionPickId | undefined>();
  const reduceMotion = useReducedMotion();
  const compact = variant === "sheet";

  const currentStep = stepOrder[stepIndex] ?? "welcome";
  const progressStep = Math.min(
    conciergeSteps.findIndex((s) => s.id === currentStep) + 1,
    conciergeSteps.length,
  );

  const recommendation = useMemo(
    () => (currentStep === "result" ? recommendPackage(answers) : null),
    [answers, currentStep],
  );

  const scaleChoices = scalesForOccasion(answers.occasion).map((s) => scaleOptions[s]);
  const coverageChoices = coverageForOccasion(answers.occasion)
    .map((c) => coverageOptions.find((o) => o.value === c))
    .filter(Boolean) as typeof coverageOptions;

  function goNext() {
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, stepOrder.length - 1));
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function restart() {
    resetSession();
    setVisionPickId(undefined);
    setDirection(-1);
  }

  function handleUnsure(step: ConciergeStepId) {
    markUnsure(step);
    if (step === "occasion" && !answers.occasion) {
      setAnswers((prev) => ({ ...prev, occasion: "portrait" }));
    }
    if (step === "vision" && !answers.vision) {
      setAnswers((prev) => ({ ...prev, vision: "candid" }));
    }
    if (step === "priorities") {
      setAnswers((prev) => ({
        ...prev,
        scale: prev.scale ?? "couple",
        coverage: prev.coverage ?? "1-2hr",
      }));
    }
    if (step === "setting" && !answers.setting) {
      setAnswers((prev) => ({ ...prev, setting: "both" }));
    }
    goNext();
  }

  function toggleAddonInterest(value: AddonInterest) {
    setAnswers((prev) => ({
      ...prev,
      addonInterests: prev.addonInterests.includes(value)
        ? prev.addonInterests.filter((a) => a !== value)
        : [...prev.addonInterests, value],
    }));
  }

  const canContinue = (() => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "occasion":
        return Boolean(answers.occasion);
      case "vision":
        return Boolean(answers.vision);
      case "priorities":
        return Boolean(answers.scale && answers.coverage);
      case "setting":
        return Boolean(answers.setting);
      case "addons":
        return true;
      case "investment":
        return answers.budgetMax >= 150;
      default:
        return false;
    }
  })();

  const stepCopy = conciergeCopy[currentStep];
  const showNav = currentStep !== "welcome" && currentStep !== "result";

  const inner = (
    <>
      {currentStep === "welcome" ? (
        <ConciergeWelcome onBegin={goNext} compact={compact} />
      ) : (
        <ConciergeShell compact={compact} className="p-6 sm:p-8 lg:p-10">
          {showNav ? (
            <ConciergeStepBar current={progressStep} total={conciergeSteps.length} />
          ) : null}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={reduceMotion ? undefined : slideVariants}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentStep === "occasion" && (
                <div>
                  <StepIntro step="occasion" />
                  <ConciergeIconGrid
                    options={occasionOptions}
                    value={answers.occasion}
                    onChange={(occasion) =>
                      setAnswers((prev) => ({
                        ...prev,
                        occasion,
                        scale: undefined,
                        coverage: undefined,
                        vision: undefined,
                      }))
                    }
                  />
                  {stepCopy.allowUnsure ? (
                    <UnsureLink onClick={() => handleUnsure("occasion")} />
                  ) : null}
                </div>
              )}

              {currentStep === "vision" && (
                <div>
                  <StepIntro step="vision" />
                  <ConciergePhotoGrid
                    value={answers.vision}
                    pickId={visionPickId}
                    onChange={(vision, pickId) => {
                      setVisionPickId(pickId);
                      setAnswers((prev) => ({ ...prev, vision }));
                    }}
                  />
                  {stepCopy.allowUnsure ? (
                    <UnsureLink onClick={() => handleUnsure("vision")} />
                  ) : null}
                </div>
              )}

              {currentStep === "priorities" && (
                <div>
                  <StepIntro step="priorities" />
                  <ConciergePriorityPick
                    scaleOptions={scaleChoices}
                    coverageOptions={coverageChoices}
                    scale={answers.scale}
                    coverage={answers.coverage}
                    onScaleChange={(scale) =>
                      setAnswers((prev) => ({ ...prev, scale }))
                    }
                    onCoverageChange={(coverage) =>
                      setAnswers((prev) => ({ ...prev, coverage }))
                    }
                  />
                  {stepCopy.allowUnsure ? (
                    <UnsureLink onClick={() => handleUnsure("priorities")} />
                  ) : null}
                </div>
              )}

              {currentStep === "setting" && (
                <div>
                  <StepIntro step="setting" />
                  <ConciergeSettingPick
                    value={answers.setting}
                    onChange={(setting) =>
                      setAnswers((prev) => ({ ...prev, setting }))
                    }
                  />
                  {stepCopy.allowUnsure ? (
                    <UnsureLink onClick={() => handleUnsure("setting")} />
                  ) : null}
                </div>
              )}

              {currentStep === "addons" && (
                <div>
                  <StepIntro step="addons" />
                  <ConciergeAddonPick
                    options={addonInterestOptions}
                    selected={answers.addonInterests}
                    onToggle={toggleAddonInterest}
                  />
                </div>
              )}

              {currentStep === "investment" && (
                <div>
                  <StepIntro step="investment" />
                  <ConciergeBudgetPick
                    value={answers.budgetMax}
                    onChange={(budgetMax) =>
                      setAnswers((prev) => ({ ...prev, budgetMax }))
                    }
                  />
                </div>
              )}

              {currentStep === "result" && recommendation ? (
                <ConciergeRecommendationReveal
                  recommendation={recommendation}
                  onRestart={restart}
                  compact={compact}
                  onInquire={onClose}
                />
              ) : null}

              {currentStep === "result" && !recommendation ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-xl text-foreground/55">
                    I need a little more to go on — try choosing a session type.
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-6 text-xs tracking-[0.16em] uppercase text-primary"
                  >
                    {conciergeMicrocopy.restart}
                  </button>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {showNav ? (
            <nav className="mt-8 flex items-center gap-3 border-t border-foreground/8 pt-6">
              <button
                type="button"
                onClick={goBack}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/12 text-foreground/50 transition-colors hover:border-foreground/25 hover:text-foreground"
                aria-label={conciergeMicrocopy.back}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-all",
                  canContinue
                    ? "bg-primary text-primary-foreground hover:bg-[#d4b87a]"
                    : "cursor-not-allowed bg-foreground/8 text-foreground/25",
                )}
              >
                {currentStep === "investment"
                  ? conciergeMicrocopy.seeRecommendation
                  : conciergeMicrocopy.continue}
                <ArrowRight size={15} />
              </button>
            </nav>
          ) : null}
        </ConciergeShell>
      )}
    </>
  );

  return <div className={cn("relative", !compact && "min-h-[60dvh]")}>{inner}</div>;
}
