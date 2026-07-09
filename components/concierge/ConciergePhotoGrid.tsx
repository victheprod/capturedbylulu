"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visionPickOptions, type VisionPickId } from "@/lib/concierge/visuals";
import type { Vision } from "@/lib/concierge/types";
import { cn } from "@/lib/utils";

type ConciergePhotoGridProps = {
  value?: Vision;
  pickId?: VisionPickId;
  onChange: (value: Vision, pickId: VisionPickId) => void;
};

export function ConciergePhotoGrid({ value, pickId, onChange }: ConciergePhotoGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {visionPickOptions.map((opt, i) => {
        const selected = pickId === opt.id || (!pickId && value === opt.value);
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.value, opt.id)}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            aria-pressed={selected}
            className={cn(
              "group relative aspect-[4/5] overflow-hidden rounded-2xl text-left",
              selected && "ring-2 ring-primary ring-offset-2 ring-offset-card",
            )}
          >
            <Image
              src={opt.src}
              alt={opt.label}
              fill
              sizes="(max-width: 640px) 45vw, 200px"
              className={cn(
                "object-cover transition-transform duration-500",
                selected ? "scale-105" : "group-hover:scale-[1.03]",
              )}
              style={{ objectPosition: opt.objectPosition }}
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t transition-opacity",
                selected
                  ? "from-background/75 via-background/20 to-transparent"
                  : "from-background/70 via-transparent to-transparent opacity-90",
              )}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
              <span className="font-serif text-sm font-light text-foreground">{opt.label}</span>
              {selected ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check size={12} strokeWidth={3} />
                </span>
              ) : null}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
