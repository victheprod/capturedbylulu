"use client";

import { motion } from "framer-motion";
import { visionSteps } from "@/lib/vision/steps";
import { cn } from "@/lib/utils";

type VisionOrbitNavProps = {
  currentStep: number;
  className?: string;
};

export function VisionOrbitNav({ currentStep, className }: VisionOrbitNavProps) {
  return (
    <nav aria-label="Vision progress" className={cn("flex flex-col", className)}>
      <div className="mb-4 hidden lg:block">
        <p className="text-[9px] tracking-[0.35em] uppercase text-foreground/30">
          Atelier
        </p>
        <p className="mt-1 font-serif text-2xl font-light text-foreground/70">
          {String(currentStep).padStart(2, "0")}
          <span className="text-foreground/25"> / {String(visionSteps.length).padStart(2, "0")}</span>
        </p>
      </div>

      {/* Desktop: vertical orbit */}
      <ol className="relative hidden lg:flex lg:flex-col lg:gap-0">
        {visionSteps.map((step, i) => {
          const stepNum = i + 1;
          const active = stepNum === currentStep;
          const done = stepNum < currentStep;
          const isLast = i === visionSteps.length - 1;

          return (
            <li key={step.id} className="relative flex items-center gap-4 py-2.5">
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[11px] top-[calc(50%+14px)] h-[calc(100%-4px)] w-px",
                    done ? "bg-primary/40" : "bg-foreground/10",
                  )}
                />
              ) : null}
              <span className="relative z-10 flex shrink-0 items-center justify-center">
                {active ? (
                  <motion.span
                    layoutId="vision-orbit-active"
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-primary/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </motion.span>
                ) : (
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border",
                      done
                        ? "border-primary/50 bg-primary/10"
                        : "border-foreground/12 bg-card/40",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        done ? "bg-primary/70" : "bg-foreground/20",
                      )}
                    />
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "text-[11px] tracking-[0.08em] transition-colors duration-300",
                  active && "font-medium text-primary",
                  done && "text-foreground/50",
                  !active && !done && "text-foreground/22",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Mobile: horizontal pill strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visionSteps.map((step, i) => {
          const stepNum = i + 1;
          const active = stepNum === currentStep;
          const done = stepNum < currentStep;
          return (
            <span
              key={step.id}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-colors",
                active && "bg-primary/15 text-primary",
                done && !active && "text-foreground/45",
                !active && !done && "text-foreground/25",
              )}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
