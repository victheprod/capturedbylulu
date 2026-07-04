"use client";

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

export function ProgressSteps({
  steps,
  currentStep,
  className,
}: ProgressStepsProps) {
  return (
    <nav aria-label="Booking progress" className={cn("mb-8", className)}>
      <ol className="flex items-center gap-0">
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <li
              key={step.id}
              className={cn("flex flex-1 items-center", i < steps.length - 1 && "pr-2")}
            >
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center border text-[11px] tracking-wider transition-colors duration-300",
                    isComplete && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary text-primary",
                    !isComplete && !isCurrent && "border-foreground/20 text-foreground/40",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? "✓" : stepNum}
                </div>
                <span
                  className={cn(
                    "hidden text-center text-[10px] tracking-[0.12em] uppercase sm:block",
                    isCurrent ? "text-primary" : "text-foreground/45",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1 mb-6 h-px flex-1 transition-colors duration-300 sm:mb-0 sm:mt-[-1.25rem]",
                    isComplete ? "bg-primary/60" : "bg-foreground/15",
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-center text-[11px] tracking-[0.15em] uppercase text-foreground/45 sm:hidden">
        Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.label}
      </p>
    </nav>
  );
}
