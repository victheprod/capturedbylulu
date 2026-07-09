"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ConciergeProgressProps = {
  current: number;
  total: number;
  label?: string;
  className?: string;
};

export function ConciergeProgress({
  current,
  total,
  label = "Consultation",
  className,
}: ConciergeProgressProps) {
  const progress = Math.min(100, (current / total) * 100);

  return (
    <div className={cn("mb-10 lg:mb-12", className)}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
          {label}
        </p>
        <p className="text-[11px] tracking-[0.15em] uppercase text-foreground/40">
          Step {current} of {total}
        </p>
      </div>
      <div className="relative h-px overflow-hidden bg-foreground/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/50 via-primary to-primary/70"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
