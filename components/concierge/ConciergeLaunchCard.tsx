"use client";

import { useEffect, useState } from "react";
import { Aperture, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { conciergeLaunch } from "@/lib/concierge/copy";
import {
  dismissConciergeLaunch,
  isConciergeLaunchDismissed,
} from "@/lib/concierge/session";
import { cn } from "@/lib/utils";

type ConciergeLaunchCardProps = {
  onStart: () => void;
  onDismiss: () => void;
  className?: string;
};

export function ConciergeLaunchCard({
  onStart,
  onDismiss,
  className,
}: ConciergeLaunchCardProps) {
  const reduced = useReducedMotion();

  function handleDismiss() {
    dismissConciergeLaunch();
    onDismiss();
  }

  function handleStart() {
    dismissConciergeLaunch();
    onStart();
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.22 } }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("concierge-launch-card relative w-[min(100vw-2.5rem,320px)]", className)}
      role="complementary"
      aria-label="Capture Concierge introduction"
    >
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/8 hover:text-foreground"
        aria-label="Dismiss introduction"
      >
        <X size={16} />
      </button>

      {/* Aperture badge — overlaps top edge */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="concierge-fab-ring flex h-12 w-12 items-center justify-center rounded-full">
          <span className="concierge-fab-core flex h-[calc(100%-3px)] w-[calc(100%-3px)] items-center justify-center rounded-full">
            <Aperture size={20} strokeWidth={1.35} className="text-primary" aria-hidden />
          </span>
        </span>
      </div>

      <div className="rounded-[1.5rem] border border-primary/25 bg-card/95 px-6 pb-6 pt-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <p className="text-center text-[10px] tracking-[0.28em] uppercase text-primary">
          {conciergeLaunch.eyebrow}
        </p>
        <h2 className="mt-3 text-center font-serif text-xl font-light leading-snug text-foreground">
          {conciergeLaunch.title}{" "}
          <span className="italic text-primary/90">{conciergeLaunch.titleAccent}</span>
        </h2>
        <p className="mt-3 text-center text-xs leading-relaxed text-foreground/48">
          {conciergeLaunch.description}
        </p>

        <ul className="mt-6 space-y-3">
          {conciergeLaunch.features.map((feature) => (
            <li
              key={feature.label}
              className="flex items-center gap-3 text-xs text-foreground/58"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.06] text-[11px] text-primary"
                aria-hidden
              >
                {feature.icon}
              </span>
              {feature.label}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleStart}
          className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a]"
        >
          {conciergeLaunch.cta}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>

        <p className="mt-4 text-center font-serif text-sm italic text-foreground/45">
          {conciergeLaunch.ctaSubline}
        </p>
      </div>
    </motion.div>
  );
}

export function useConciergeLaunchVisible(hasProgress: boolean, hydrated: boolean) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hydrated || hasProgress) {
      setVisible(false);
      return;
    }
    if (isConciergeLaunchDismissed()) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, [hasProgress, hydrated]);

  return { visible, hide: () => setVisible(false) };
}
