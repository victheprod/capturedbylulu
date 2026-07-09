"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type VisionChoiceChipProps = {
  label: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  index?: number;
  layout?: "chip" | "tile";
  multi?: boolean;
};

export function VisionChoiceChip({
  label,
  description,
  selected,
  onClick,
  index = 0,
  layout = "chip",
  multi = false,
}: VisionChoiceChipProps) {
  const reduceMotion = useReducedMotion();

  if (layout === "tile") {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : index * 0.04, duration: 0.4 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        aria-pressed={selected}
        className={cn(
          "group relative rounded-2xl border px-5 py-4 text-left transition-all duration-300",
          selected
            ? "border-primary/50 bg-primary/10 shadow-[0_8px_32px_rgba(200,169,106,0.12)]"
            : "border-foreground/10 bg-card/30 hover:border-foreground/22 hover:bg-card/50",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-serif text-lg font-light text-foreground">{label}</p>
            {description ? (
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/48">
                {description}
              </p>
            ) : null}
          </div>
          <span
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-foreground/15 text-transparent",
            )}
          >
            <Check size={11} strokeWidth={3} />
          </span>
        </div>
        {selected ? (
          <motion.span
            layoutId={multi ? "vision-tile-glow" : undefined}
            className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        ) : null}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : index * 0.03, duration: 0.35 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-5 py-2.5 text-left transition-all duration-300 sm:px-6 sm:py-3",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_24px_rgba(200,169,106,0.25)]"
          : "border-foreground/14 bg-card/40 text-foreground/80 hover:border-primary/35 hover:bg-card/70",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      <span className="block text-sm font-medium tracking-wide">{label}</span>
      {description && !selected ? (
        <span className="mt-0.5 block text-[11px] text-foreground/45">{description}</span>
      ) : null}
    </motion.button>
  );
}
