"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type VisionDockProps = {
  stepLabel: string;
  canAdvance: boolean;
  onBack: () => void;
  onNext: () => void;
  className?: string;
};

export function VisionDock({
  stepLabel,
  canAdvance,
  onBack,
  onNext,
  className,
}: VisionDockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "vision-dock fixed inset-x-4 bottom-6 z-30 mx-auto flex max-w-lg items-center justify-between gap-3 rounded-full border border-foreground/10 bg-card/75 px-2 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:inset-x-auto sm:bottom-8",
        className,
      )}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/55 transition-colors hover:bg-foreground/8 hover:text-foreground"
        aria-label="Previous step"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="min-w-0 flex-1 text-center">
        <p className="truncate text-[10px] tracking-[0.22em] uppercase text-foreground/40">
          {stepLabel}
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canAdvance}
        className={cn(
          "flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[11px] font-medium tracking-[0.14em] uppercase transition-all",
          canAdvance
            ? "bg-primary text-primary-foreground hover:bg-[#d4b87a]"
            : "cursor-not-allowed bg-foreground/8 text-foreground/25",
        )}
      >
        Next
        <ArrowRight size={15} />
      </button>
    </motion.div>
  );
}
