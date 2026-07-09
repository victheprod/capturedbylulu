"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { ConciergeProgress } from "@/components/concierge/ConciergeProgress";
import { ChoiceCard, MultiChoiceCard } from "@/components/concierge/ChoiceCard";
import { ConciergeSlider } from "@/components/concierge/ConciergeSlider";
import { ConciergeRecommendationReveal } from "@/components/concierge/ConciergeRecommendation";
import { conciergeCopy, conciergeMicrocopy } from "@/lib/concierge/copy";
import {
  BUDGET_MAX,
  BUDGET_MIN,
  coverageForOccasion,
  recommendPackage,
  scalesForOccasion,
  visionsForOccasion,
} from "@/lib/concierge/recommend";
import {
  addonInterestOptions,
  conciergeSteps,
  coverageOptions,
  deliverableOptions,
  locationOptions,
  occasionOptions,
  scaleOptions,
  settingOptions,
  timelineOptions,
  visionOptions,
} from "@/lib/concierge/questions";
import type {
  AddonInterest,
  ConciergeStepId,
  Deliverable,
} from "@/lib/concierge/types";
import { cn } from "@/lib/utils";

const stepOrder: ConciergeStepId[] = [
  "welcome",
  "occasion",
  "timeline",
  "location",
  "scale",
  "coverage",
  "setting",
  "vision",
  "deliverables",
  "addons",
  "investment",
  "result",
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 28 : -28,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -16 : 16,
  }),
};

function StepIntro({
  step,
  compact,
}: {
  step: ConciergeStepId;
  compact?: boolean;
}) {
  const copy = conciergeCopy[step];
  return (
    <div className={cn("mb-6 max-w-2xl", compact ? "lg:mb-8" : "lg:mb-10")}>
      <p className="mb-2 text-[11px] tracking-[0.28em] uppercase text-primary">
        {copy.eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance font-serif font-light leading-[1.12] text-foreground",
          compact
            ? "text-[clamp(1.5rem,4vw,2.25rem)]"
            : "text-[clamp(1.75rem,4vw,2.75rem)]",
        )}
      >
        {copy.title}
      </h2>
      {copy.description ? (
        <p className="mt-3 text-sm leading-relaxed text-foreground/52">
          {copy.description}
        </p>
      ) : null}
      {copy.hint ? (
        <p className="mt-2 text-xs text-foreground/35">{copy.hint}</p>
      ) : null}
    </div>
  );
}

function UnsureLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 text-[11px] tracking-[0.14em] text-foreground/40 underline-offset-4 transition-colors hover:text-primary hover:underline"
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
  const compact = variant === "sheet";

  const currentStep = stepOrder[stepIndex];
  const progressStep = Math.min(stepIndex, conciergeSteps.length);
  const recommendation = useMemo(
    () => (currentStep === "result" ? recommendPackage(answers) : null),
    [answers, currentStep],
  );

  const scaleChoices = scalesForOccasion(answers.occasion).map((s) => scaleOptions[s]);
  const visionChoices = visionsForOccasion(answers.occasion).map((v) => visionOptions[v]);
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
    setDirection(-1);
  }

  function handleUnsure(step: ConciergeStepId) {
    markUnsure(step);
    if (step === "occasion" && !answers.occasion) {
      setAnswers((prev) => ({ ...prev, occasion: "portrait" }));
    }
    goNext();
  }

  function toggleDeliverable(value: Deliverable) {
    if (value === "digital-gallery") return;
    setAnswers((prev) => ({
      ...prev,
      deliverables: prev.deliverables.includes(value)
        ? prev.deliverables.filter((d) => d !== value)
        : [...prev.deliverables, value],
    }));
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
      case "timeline":
        return Boolean(answers.timeline);
      case "location":
        return Boolean(answers.location);
      case "scale":
        return Boolean(answers.scale);
      case "coverage":
        return Boolean(answers.coverage);
      case "setting":
        return Boolean(answers.setting);
      case "vision":
        return Boolean(answers.vision);
      case "deliverables":
        return answers.deliverables.length > 0;
      case "addons":
        return true;
      case "investment":
        return answers.budgetMax >= BUDGET_MIN;
      default:
        return false;
    }
  })();

  const stepCopy = conciergeCopy[currentStep];

  return (
    <div className={cn("relative", !compact && "min-h-[70dvh]")}>
      {currentStep !== "welcome" && currentStep !== "result" ? (
        <ConciergeProgress
          current={progressStep}
          total={conciergeSteps.length}
          label="Your consultation"
        />
      ) : null}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentStep === "welcome" && (
            <div className={cn("text-center", compact ? "px-0" : "mx-auto max-w-3xl")}>
              <StepIntro step="welcome" compact={compact} />
              <button
                type="button"
                onClick={goNext}
                className="group mt-8 inline-flex items-center gap-3 bg-primary px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a]"
              >
                {conciergeMicrocopy.begin}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          )}

          {currentStep === "occasion" && (
            <div>
              <StepIntro step="occasion" compact={compact} />
              <div className={cn("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
                {occasionOptions.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    icon={option.icon}
                    selected={answers.occasion === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        occasion: option.value,
                        scale: undefined,
                        coverage: undefined,
                        vision: undefined,
                      }))
                    }
                    layout={compact ? "compact" : "default"}
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("occasion")} />
              ) : null}
            </div>
          )}

          {currentStep === "timeline" && (
            <div>
              <StepIntro step="timeline" compact={compact} />
              <div className="grid gap-3 sm:grid-cols-2">
                {timelineOptions.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.timeline === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, timeline: option.value }))
                    }
                    layout="compact"
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("timeline")} />
              ) : null}
            </div>
          )}

          {currentStep === "location" && (
            <div>
              <StepIntro step="location" compact={compact} />
              <div className="grid gap-3">
                {locationOptions.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.location === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, location: option.value }))
                    }
                    layout="compact"
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("location")} />
              ) : null}
            </div>
          )}

          {currentStep === "scale" && (
            <div>
              <StepIntro step="scale" compact={compact} />
              <div className="grid gap-3 sm:grid-cols-2">
                {scaleChoices.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.scale === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, scale: option.value }))
                    }
                    layout="compact"
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("scale")} />
              ) : null}
            </div>
          )}

          {currentStep === "coverage" && (
            <div>
              <StepIntro step="coverage" compact={compact} />
              <div className="grid gap-3 sm:grid-cols-2">
                {coverageChoices.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.coverage === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, coverage: option.value }))
                    }
                    layout="compact"
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("coverage")} />
              ) : null}
            </div>
          )}

          {currentStep === "setting" && (
            <div>
              <StepIntro step="setting" compact={compact} />
              <div className={cn("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-3")}>
                {settingOptions.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.setting === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, setting: option.value }))
                    }
                    layout="compact"
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("setting")} />
              ) : null}
            </div>
          )}

          {currentStep === "vision" && (
            <div>
              <StepIntro step="vision" compact={compact} />
              <div className="grid gap-3">
                {visionChoices.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.vision === option.value}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, vision: option.value }))
                    }
                    layout="compact"
                  />
                ))}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("vision")} />
              ) : null}
            </div>
          )}

          {currentStep === "deliverables" && (
            <div>
              <StepIntro step="deliverables" compact={compact} />
              <div className="grid gap-3 sm:grid-cols-2">
                {deliverableOptions.map((option) => {
                  const selected = answers.deliverables.includes(option.value);
                  const locked = option.value === "digital-gallery";
                  return (
                    <MultiChoiceCard
                      key={option.value}
                      label={option.label}
                      description={option.description}
                      selected={selected || locked}
                      onClick={() => {
                        if (!locked) toggleDeliverable(option.value);
                      }}
                      className={cn(locked && "opacity-90")}
                    />
                  );
                })}
              </div>
              {stepCopy.allowUnsure ? (
                <UnsureLink onClick={() => handleUnsure("deliverables")} />
              ) : null}
            </div>
          )}

          {currentStep === "addons" && (
            <div>
              <StepIntro step="addons" compact={compact} />
              <div className="grid gap-3 sm:grid-cols-2">
                {addonInterestOptions.map((option) => (
                  <MultiChoiceCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={answers.addonInterests.includes(option.value)}
                    onClick={() => toggleAddonInterest(option.value)}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === "investment" && (
            <div>
              <StepIntro step="investment" compact={compact} />
              <ConciergeSlider
                value={answers.budgetMax}
                min={BUDGET_MIN}
                max={BUDGET_MAX}
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
            <div className="text-center">
              <p className="font-serif text-xl text-foreground/60">
                I need a little more to go on — try choosing a session type to start.
              </p>
              <button
                type="button"
                onClick={restart}
                className="mt-6 text-[11px] tracking-[0.18em] uppercase text-primary"
              >
                {conciergeMicrocopy.restart}
              </button>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {currentStep !== "welcome" && currentStep !== "result" ? (
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-foreground/8 pt-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-foreground/45 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            {conciergeMicrocopy.back}
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue}
            className={cn(
              "group inline-flex items-center gap-2 bg-primary px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-primary-foreground transition-all hover:bg-[#d4b87a]",
              !canContinue && "pointer-events-none opacity-40",
            )}
          >
            {currentStep === "addons"
              ? conciergeMicrocopy.seeRecommendation
              : conciergeMicrocopy.continue}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
