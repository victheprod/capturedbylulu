"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { SettingPref } from "@/lib/concierge/types";
import { settingVisuals } from "@/lib/concierge/visuals";
import { cn } from "@/lib/utils";

type ConciergeSettingPickProps = {
  value?: SettingPref;
  onChange: (value: SettingPref) => void;
};

export function ConciergeSettingPick({ value, onChange }: ConciergeSettingPickProps) {
  const reduceMotion = useReducedMotion();
  const options = Object.entries(settingVisuals) as [
    SettingPref,
    (typeof settingVisuals)[SettingPref],
  ][];

  return (
    <div className="flex flex-col gap-3">
      {options.map(([key, visual], i) => {
        const selected = value === key;
        return (
          <motion.button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            aria-pressed={selected}
            className={cn(
              "group relative flex h-28 w-full overflow-hidden rounded-2xl sm:h-32",
              selected && "ring-2 ring-primary ring-offset-2 ring-offset-card",
            )}
          >
            <Image
              src={visual.src}
              alt={visual.label}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: visual.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-center px-6">
              <p className="font-serif text-xl font-light text-foreground">{visual.label}</p>
            </div>
            {selected ? (
              <span className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check size={14} strokeWidth={2.5} />
              </span>
            ) : null}
          </motion.button>
        );
      })}
    </div>
  );
}
