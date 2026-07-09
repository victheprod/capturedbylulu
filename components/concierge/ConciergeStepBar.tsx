"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ConciergeStepBarProps = {
  current: number;
  total: number;
  className?: string;
};

export function ConciergeStepBar({ current, total, className }: ConciergeStepBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={cn("mb-8", className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-primary">
          Step {current} of {total}
        </p>
        <p className="text-[10px] text-foreground/35">{pct}%</p>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const stepNum = i + 1;
          const active = stepNum === current;
          const done = stepNum < current;
          return (
            <div key={stepNum} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/8">
              {done || active ? (
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done ? 1 : active ? 0.55 : 0 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
