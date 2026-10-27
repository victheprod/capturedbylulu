"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
};

type ProgressStepsProps = {
  steps: Step[];
  currentStep: number;
  className?: string;
};

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  const progress = (currentStep / steps.length) * 100;

  return (
    <nav aria-label="Estimate request progress" className={cn("mb-10", className)}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-label text-[10.5px] text-oxblood">Estimate request</p>
        <p className="font-label text-[10.5px] text-ink-soft">
          Step {currentStep} of {steps.length}
        </p>
      </div>

      <div className="relative mt-4 h-px bg-ink/15">
        <motion.div
          className="absolute inset-y-0 left-0 bg-ink"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ol className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                "flex items-center gap-1.5 font-label text-[10px] transition-colors duration-500",
                isCurrent ? "text-oxblood" : isComplete ? "text-ink" : "text-ink/35",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isComplete ? (
                <Check size={11} aria-hidden />
              ) : (
                <span aria-hidden>{String(stepNum).padStart(2, "0")}</span>
              )}
              <span className={cn(!isCurrent && "hidden sm:inline")}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function BookingStepIntro({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-ink/15 pb-8">
      <p className="font-label text-[10.5px] text-oxblood">{step}</p>
      <h3 className="mt-3 font-serif text-3xl font-light lg:text-4xl">{title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}

export { BookingStepIntro };
