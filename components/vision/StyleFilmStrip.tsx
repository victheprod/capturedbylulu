"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { VisionStyleCard } from "@/lib/vision/styles";
import { cn } from "@/lib/utils";

type StyleFilmStripProps = {
  cards: VisionStyleCard[];
  selected: string[];
  onToggle: (id: VisionStyleCard["id"]) => void;
};

export function StyleFilmStrip({ cards, selected, onToggle }: StyleFilmStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative -mx-2 sm:-mx-4">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 pt-1 sm:gap-5 sm:px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => {
          const isSelected = selected.includes(card.id);
          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => onToggle(card.id)}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : i * 0.035, duration: 0.45 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="group w-[148px] shrink-0 snap-center text-left sm:w-[168px]"
              aria-pressed={isSelected}
            >
              <div
                className={cn(
                  "relative aspect-[2/3] overflow-hidden rounded-[1.25rem] transition-all duration-500",
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_12px_40px_rgba(200,169,106,0.2)]"
                    : "ring-1 ring-foreground/10 group-hover:ring-foreground/25",
                )}
              >
                <Image
                  src={card.src}
                  alt={card.label}
                  fill
                  sizes="168px"
                  className={cn(
                    "object-cover transition-transform duration-700",
                    isSelected ? "scale-105" : "group-hover:scale-[1.04]",
                  )}
                  style={{ objectPosition: card.objectPosition }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t transition-opacity duration-300",
                    isSelected
                      ? "from-background/75 via-background/15 to-transparent"
                      : "from-background/60 via-transparent to-transparent opacity-80 group-hover:opacity-100",
                  )}
                />
                {isSelected ? (
                  <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-serif text-base font-light text-foreground">
                {card.label}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-foreground/45">
                {card.description}
              </p>
            </motion.button>
          );
        })}
      </div>
      <p className="px-2 text-center text-[10px] tracking-[0.18em] text-foreground/30 sm:px-4">
        Swipe to explore · tap to collect
      </p>
    </div>
  );
}
