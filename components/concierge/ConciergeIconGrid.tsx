"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Occasion } from "@/lib/concierge/types";
import { occasionVisuals } from "@/lib/concierge/visuals";
import type { ChoiceOption } from "@/lib/concierge/questions";
import { cn } from "@/lib/utils";

type ConciergeIconGridProps = {
  options: ChoiceOption<Occasion>[];
  value?: Occasion;
  onChange: (value: Occasion) => void;
};

export function ConciergeIconGrid({ options, value, onChange }: ConciergeIconGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((opt, i) => {
        const selected = value === opt.value;
        const visual = occasionVisuals[opt.value];
        return (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-center gap-3 rounded-2xl border px-3 py-5 text-center transition-all duration-300",
              selected
                ? "border-primary/60 bg-primary/10 shadow-[0_0_24px_rgba(200,169,106,0.15)]"
                : "border-foreground/10 bg-card/30 hover:border-foreground/22 hover:bg-card/50",
            )}
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border text-xl transition-colors",
                selected
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-foreground/12 bg-background/40 text-foreground/35",
              )}
            >
              {visual.icon}
            </span>
            <span
              className={cn(
                "text-xs font-medium tracking-wide",
                selected ? "text-foreground" : "text-foreground/65",
              )}
            >
              {opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
