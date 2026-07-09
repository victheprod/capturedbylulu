"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { conciergeWelcomeImage } from "@/lib/concierge/visuals";
import { conciergeCopy, conciergeMicrocopy } from "@/lib/concierge/copy";
import { cn } from "@/lib/utils";

type ConciergeWelcomeProps = {
  onBegin: () => void;
  compact?: boolean;
};

export function ConciergeWelcome({ onBegin, compact }: ConciergeWelcomeProps) {
  const reduceMotion = useReducedMotion();
  const copy = conciergeCopy.welcome;

  return (
    <div className={cn("flex flex-col", compact ? "gap-6" : "gap-0 sm:flex-row sm:items-stretch")}>
      <motion.figure
        initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className={cn(
          "relative m-0 overflow-hidden bg-card",
          compact ? "aspect-[4/5] rounded-2xl" : "aspect-[4/5] sm:aspect-auto sm:min-h-[420px] sm:w-[42%] sm:rounded-l-[2rem]",
        )}
      >
        <Image
          src={conciergeWelcomeImage.src}
          alt={conciergeWelcomeImage.alt}
          fill
          className="object-cover"
          style={{ objectPosition: conciergeWelcomeImage.objectPosition }}
          sizes="(max-width: 640px) 100vw, 420px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">
            {conciergeWelcomeImage.caption}
          </p>
        </figcaption>
      </motion.figure>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.55 }}
        className={cn(
          "flex flex-col justify-center px-1 py-6 sm:px-10 sm:py-12",
          !compact && "sm:w-[58%]",
        )}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary">
          {copy.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-2xl font-light text-foreground sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/55">
          {copy.description}
        </p>
        {copy.hint ? (
          <p className="mt-3 text-xs text-foreground/38">{copy.hint}</p>
        ) : null}
        <button
          type="button"
          onClick={onBegin}
          className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a] sm:w-auto"
        >
          {conciergeMicrocopy.begin}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}
