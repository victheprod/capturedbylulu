"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ConciergeProgress } from "@/components/concierge/ConciergeProgress";
import { ChoiceCard, MultiChoiceCard } from "@/components/concierge/ChoiceCard";
import { ConciergeSlider } from "@/components/concierge/ConciergeSlider";
import { ConciergeRecommendationReveal } from "@/components/concierge/ConciergeRecommendation";
import {
  BUDGET_MAX,
  BUDGET_MIN,
  recommendPackage,
  scalesForOccasion,
  visionsForOccasion,
} from "@/lib/concierge/recommend";
import {
  conciergeSteps,
  deliverableOptions,
  locationOptions,
  occasionOptions,
  scaleOptions,
  timelineOptions,
  visionOptions,
} from "@/lib/concierge/questions";
import type {
  ConciergeAnswers,
  ConciergeStepId,
  Deliverable,
} from "@/lib/concierge/types";
import { cn } from "@/lib/utils";

const initialAnswers: ConciergeAnswers = {
  deliverables: ["digital-gallery"],
  budgetMax: 500,
};

const stepOrder: ConciergeStepId[] = [
  "welcome",
  "occasion",
  "vision",
  "scale",
  "timeline",
  "location",
  "deliverables",
  "investment",
  "result",
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
  }),
};

function StepIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-2xl lg:mb-10">
      <p className="mb-3 text-[11px] tracking-[0.28em] uppercase text-primary">
        {eyebrow}
      </p>
      <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.12] text-foreground">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-foreground/52 lg:text-[0.95rem]">
        {description}
      </p>
    </div>
  );
}

export function CaptureConcierge() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<ConciergeAnswers>(initialAnswers);

  const currentStep = stepOrder[stepIndex];
  const progressStep = Math.min(stepIndex, conciergeSteps.length);
  const recommendation = useMemo(
    () => (currentStep === "result" ? recommendPackage(answers) : null),
    [answers, currentStep],
  );

  const visionChoices = visionsForOccasion(answers.occasion).map(
    (v) => visionOptions[v],
  );
  const scaleChoices = scalesForOccasion(answers.occasion).map(
    (s) => scaleOptions[s],
  );

  function goNext() {
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, stepOrder.length - 1));
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function restart() {
    setAnswers(initialAnswers);
    setDirection(-1);
    setStepIndex(0);
  }

  function toggleDeliverable(value: Deliverable) {
    setAnswers((prev) => {
      const has = prev.deliverables.includes(value);
      if (value === "digital-gallery") {
        return prev;
      }
      return {
        ...prev,
        deliverables: has
          ? prev.deliverables.filter((d) => d !== value)
          : [...prev.deliverables, value],
      };
    });
  }

  const canContinue = (() => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "occasion":
        return Boolean(answers.occasion);
      case "vision":
        return Boolean(answers.vision);
      case "scale":
        return Boolean(answers.scale);
      case "timeline":
        return Boolean(answers.timeline);
      case "location":
        return Boolean(answers.location);
      case "deliverables":
        return answers.deliverables.length > 0;
      case "investment":
        return answers.budgetMax >= BUDGET_MIN;
      default:
        return false;
    }
  })();

  return (
    <div className="relative min-h-[70dvh]">
      {currentStep !== "welcome" && currentStep !== "result" ? (
        <ConciergeProgress
          current={progressStep}
          total={conciergeSteps.length}
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
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentStep === "welcome" && (
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-5 text-[11px] tracking-[0.32em] uppercase text-primary">
                Capture Concierge
              </p>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-light leading-[1.05] text-foreground">
                Let&apos;s find the experience{" "}
                <span className="text-foreground/45">meant for you.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/55 lg:text-base">
                A brief, guided consultation — not a form. Answer a few thoughtful
                questions and receive a personalized package recommendation from
                Lulu&apos;s actual offerings.
              </p>
              <p className="mx-auto mt-4 max-w-md text-xs tracking-wide text-foreground/35">
                About 2 minutes · No account required
              </p>
              <button
                type="button"
                onClick={goNext}
                className="group mt-10 inline-flex items-center gap-3 bg-primary px-9 py-4 text-[11px] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a]"
              >
                Begin consultation
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          )}

          {currentStep === "occasion" && (
            <div>
              <StepIntro
                eyebrow="First, the occasion"
                title="What brings you to CapturedByLulu?"
                description="Choose the experience that best matches what you're dreaming of. We'll tailor everything from here."
              />
              <div className="grid gap-3 sm:grid-cols-2">
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
                        vision: undefined,
                        scale: undefined,
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === "vision" && (
            <div>
              <StepIntro
                eyebrow="Your vision"
                title="How should these photographs feel?"
                description="There's no wrong answer — this helps Lulu match you with the right session rhythm and style."
              />
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
            </div>
          )}

          {currentStep === "scale" && (
            <div>
              <StepIntro
                eyebrow="The details"
                title="Tell me about the gathering."
                description="Guest count and scale help determine coverage hours and the right package tier."
              />
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
            </div>
          )}

          {currentStep === "timeline" && (
            <div>
              <StepIntro
                eyebrow="Timeline"
                title="When are you hoping to shoot?"
                description="This helps with availability planning and whether rush delivery might matter."
              />
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
            </div>
          )}

          {currentStep === "location" && (
            <div>
              <StepIntro
                eyebrow="Location"
                title="Where will this take place?"
                description="Lulu is Texas-based and available throughout Texas and for travel nationwide."
              />
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
            </div>
          )}

          {currentStep === "deliverables" && (
            <div>
              <StepIntro
                eyebrow="Deliverables"
                title="What matters most in what you receive?"
                description="Select all that apply. Every package includes a private online gallery."
              />
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
            </div>
          )}

          {currentStep === "investment" && (
            <div>
              <StepIntro
                eyebrow="Investment"
                title="What feels comfortable for this experience?"
                description="Slide to your comfort zone — we'll recommend the best fit within Lulu's published packages."
              />
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
            />
          ) : null}

          {currentStep === "result" && !recommendation ? (
            <div className="text-center">
              <p className="font-serif text-2xl text-foreground/60">
                We need a little more information to recommend a package.
              </p>
              <button
                type="button"
                onClick={restart}
                className="mt-6 text-[11px] tracking-[0.18em] uppercase text-primary"
              >
                Start over
              </button>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {currentStep !== "welcome" && currentStep !== "result" ? (
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-foreground/8 pt-8">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-foreground/45 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue}
            className={cn(
              "group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase text-primary-foreground transition-all hover:bg-[#d4b87a]",
              !canContinue && "pointer-events-none opacity-40",
            )}
          >
            Continue
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
