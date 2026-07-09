"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Step = {
  id: string;
  label: string;
};

type ProgressStepsProps = {
  steps: Step[];
  currentStep: number;
  className?: string;
};

export function ProgressSteps({
  steps,
  currentStep,
  className,
}: ProgressStepsProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <nav aria-label="Booking progress" className={cn("mb-10", className)}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
          Your journey
        </p>
        <p className="text-[11px] tracking-[0.15em] uppercase text-foreground/40">
          {currentStep} / {steps.length}
        </p>
      </div>

      <div className="relative mb-8 h-px bg-foreground/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary/60"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ol className="flex items-start gap-0">
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <li key={step.id} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center border text-[10px] tracking-[0.15em] transition-all duration-400",
                  isComplete && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-primary/10 text-primary shadow-[0_0_0_4px_rgba(200,169,106,0.08)]",
                  !isComplete && !isCurrent && "border-foreground/15 text-foreground/35",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? "✓" : String(stepNum).padStart(2, "0")}
              </div>
              <span
                className={cn(
                  "hidden text-center text-[9px] tracking-[0.14em] uppercase sm:block",
                  isCurrent ? "text-primary" : "text-foreground/40",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-center text-[11px] tracking-[0.15em] uppercase text-foreground/45 sm:hidden">
        {steps[currentStep - 1]?.label}
      </p>
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
    <div className="border-b border-foreground/10 pb-8">
      <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
        {step}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-light text-foreground lg:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/50">
        {description}
      </p>
    </div>
  );
}

export { BookingStepIntro };
