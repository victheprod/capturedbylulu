"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { AddonInterest } from "@/lib/concierge/types";
import type { ChoiceOption } from "@/lib/concierge/questions";
import { addonPriceHints } from "@/lib/concierge/visuals";
import { cn } from "@/lib/utils";

type ConciergeAddonPickProps = {
  options: ChoiceOption<AddonInterest>[];
  selected: AddonInterest[];
  onToggle: (value: AddonInterest) => void;
};

export function ConciergeAddonPick({ options, selected, onToggle }: ConciergeAddonPickProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="space-y-2">
      {options.map((opt, i) => {
        const isSelected = selected.includes(opt.value);
        const price = addonPriceHints[opt.value];
        return (
          <motion.li
            key={opt.value}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <button
              type="button"
              onClick={() => onToggle(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all",
                isSelected
                  ? "border-primary/40 bg-primary/[0.07]"
                  : "border-foreground/8 bg-card/20 hover:border-foreground/16",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-foreground/20",
                )}
              >
                {isSelected ? <Check size={12} strokeWidth={3} /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{opt.label}</p>
                <p className="mt-0.5 text-xs text-foreground/45">{opt.description}</p>
              </div>
              {price ? (
                <span className="shrink-0 text-xs font-medium text-primary">{price}</span>
              ) : null}
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
