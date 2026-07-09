"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { budgetTiers } from "@/lib/concierge/visuals";
import { cn } from "@/lib/utils";

type ConciergeBudgetPickProps = {
  value: number;
  onChange: (max: number) => void;
};

export function ConciergeBudgetPick({ value, onChange }: ConciergeBudgetPickProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="space-y-2">
      {budgetTiers.map((tier, i) => {
        const selected = value === tier.max;
        return (
          <motion.li
            key={tier.label}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              type="button"
              onClick={() => onChange(tier.max)}
              aria-pressed={selected}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all",
                selected
                  ? "border-primary/50 bg-primary/[0.09] shadow-[0_4px_20px_rgba(200,169,106,0.12)]"
                  : "border-foreground/8 bg-card/25 hover:border-foreground/18",
              )}
            >
              <div>
                <p className="font-serif text-lg font-light text-foreground">{tier.label}</p>
                <p className="mt-0.5 text-xs text-foreground/42">{tier.hint}</p>
              </div>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-foreground/15",
                )}
              >
                {selected ? <Check size={12} strokeWidth={3} /> : null}
              </span>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
