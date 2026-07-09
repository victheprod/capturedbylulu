"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { CoverageDuration, Scale } from "@/lib/concierge/types";
import type { ChoiceOption } from "@/lib/concierge/questions";
import { cn } from "@/lib/utils";

const scaleIcons: Partial<Record<Scale, string>> = {
  solo: "◯",
  couple: "♥",
  "small-family": "◎",
  "large-family": "✦",
  "intimate-wedding": "◇",
  "full-wedding": "♥",
  "corporate-event": "△",
  "large-event": "✧",
};

const coverageIcons: Partial<Record<CoverageDuration, string>> = {
  "under-1hr": "◔",
  "1-2hr": "◑",
  "2-4hr": "◕",
  "4-6hr": "●",
  "6-8hr": "●",
  "full-day": "◎",
};

type ConciergePriorityPickProps = {
  scaleOptions: ChoiceOption<Scale>[];
  coverageOptions: ChoiceOption<CoverageDuration>[];
  scale?: Scale;
  coverage?: CoverageDuration;
  onScaleChange: (value: Scale) => void;
  onCoverageChange: (value: CoverageDuration) => void;
};

export function ConciergePriorityPick({
  scaleOptions,
  coverageOptions,
  scale,
  coverage,
  onScaleChange,
  onCoverageChange,
}: ConciergePriorityPickProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      <section>
        <p className="mb-4 text-[10px] tracking-[0.24em] uppercase text-foreground/40">
          Who&apos;s involved
        </p>
        <ul className="space-y-2">
          {scaleOptions.map((opt, i) => {
            const selected = scale === opt.value;
            return (
              <PriorityRow
                key={opt.value}
                icon={scaleIcons[opt.value] ?? "○"}
                label={opt.label}
                description={opt.description}
                selected={selected}
                index={i}
                reduceMotion={reduceMotion}
                onClick={() => onScaleChange(opt.value)}
              />
            );
          })}
        </ul>
      </section>

      <section>
        <p className="mb-4 text-[10px] tracking-[0.24em] uppercase text-foreground/40">
          Coverage time
        </p>
        <ul className="space-y-2">
          {coverageOptions.map((opt, i) => {
            const selected = coverage === opt.value;
            return (
              <PriorityRow
                key={opt.value}
                icon={coverageIcons[opt.value] ?? "◔"}
                label={opt.label}
                description={opt.description}
                selected={selected}
                index={i}
                reduceMotion={reduceMotion}
                onClick={() => onCoverageChange(opt.value)}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function PriorityRow({
  icon,
  label,
  description,
  selected,
  index,
  reduceMotion,
  onClick,
}: {
  icon: string;
  label: string;
  description: string;
  selected: boolean;
  index: number;
  reduceMotion: boolean | null;
  onClick: () => void;
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={cn(
          "flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all",
          selected
            ? "border-primary/45 bg-primary/[0.08]"
            : "border-foreground/8 bg-card/25 hover:border-foreground/18 hover:bg-card/40",
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base",
            selected
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-foreground/10 text-foreground/30",
          )}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="mt-0.5 text-xs text-foreground/45">{description}</p>
        </div>
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-foreground/15",
          )}
        >
          {selected ? <Check size={11} strokeWidth={3} /> : null}
        </span>
      </button>
    </motion.li>
  );
}
