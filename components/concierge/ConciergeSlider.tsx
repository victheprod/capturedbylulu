"use client";

import { motion } from "framer-motion";
import { formatBudget } from "@/lib/concierge/questions";
import { cn } from "@/lib/utils";

type ConciergeSliderProps = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
};

export function ConciergeSlider({
  value,
  min,
  max,
  onChange,
  className,
}: ConciergeSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center">
        <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
          Investment comfort
        </p>
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-serif text-[clamp(2.5rem,6vw,4rem)] font-light text-foreground"
        >
          {formatBudget(value)}
        </motion.p>
        <p className="mt-2 text-sm text-foreground/45">
          This helps Lulu suggest packages that feel right — not restrictive.
        </p>
      </div>

      <div className="relative px-1">
        <div className="relative h-1.5 rounded-full bg-foreground/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/60 to-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={25}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-8 w-full cursor-pointer opacity-0"
          aria-label="Investment comfort range"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatBudget(value)}
        />
        <motion.div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-primary/50 bg-primary shadow-[0_0_0_6px_rgba(200,169,106,0.12)]"
          style={{ left: `calc(${percent}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between text-[10px] tracking-[0.18em] uppercase text-foreground/35">
        <span>{formatBudget(min)}</span>
        <span>{formatBudget(max)}</span>
      </div>
    </div>
  );
}
