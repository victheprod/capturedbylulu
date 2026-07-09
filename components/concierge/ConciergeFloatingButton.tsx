"use client";

import { Aperture } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ConciergeLaunchCard,
  useConciergeLaunchVisible,
} from "@/components/concierge/ConciergeLaunchCard";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { cn } from "@/lib/utils";

type ConciergeFloatingButtonProps = {
  className?: string;
};

export function ConciergeFloatingButton({ className }: ConciergeFloatingButtonProps) {
  const { open, hasProgress, hydrated, isOpen, triggerRef } = useConcierge();
  const reduced = useReducedMotion();
  const { visible: showLaunch, hide: hideLaunch } = useConciergeLaunchVisible(
    hasProgress,
    hydrated,
  );

  const label = hydrated && hasProgress ? "Continue planning" : "Open Capture Concierge";

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          transition={{ delay: reduced ? 0 : 1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "concierge-fab-anchor fixed z-40 flex flex-col items-end gap-4",
            className,
          )}
        >
          <AnimatePresence>
            {showLaunch ? (
              <ConciergeLaunchCard
                onStart={open}
                onDismiss={hideLaunch}
              />
            ) : null}
          </AnimatePresence>

          <div className="flex items-end gap-3">
            {/* Handwritten-style hint — desktop only, hidden when launch card shows */}
            {!showLaunch ? (
              <motion.p
                initial={reduced ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="concierge-fab-hint pointer-events-none mb-5 mr-1 hidden max-w-[148px] text-right font-serif text-[15px] italic leading-snug text-foreground/55 lg:block"
                aria-hidden
              >
                Tap anytime —
                <br />
                I&apos;m here to help
                <span className="text-primary/80"> ♡</span>
                <svg
                  className="concierge-fab-hint-arrow ml-auto mt-1 text-primary/45"
                  width="48"
                  height="20"
                  viewBox="0 0 48 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 14C14 4 28 2 44 10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M38 6L44 10L40 16"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.p>
            ) : null}

            <motion.button
              ref={triggerRef}
              type="button"
              onClick={open}
              whileHover={reduced ? undefined : { scale: 1.04 }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
              className={cn(
                "concierge-fab-btn group relative flex shrink-0 items-center justify-center",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
              )}
              aria-label={label}
              aria-haspopup="dialog"
            >
              {!reduced ? (
                <span
                  className="concierge-fab-pulse pointer-events-none absolute inset-0 rounded-full"
                  aria-hidden
                />
              ) : null}

              <span className="concierge-fab-ring relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full sm:h-16 sm:w-16">
                <span className="concierge-fab-core flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-full">
                  <Aperture
                    size={26}
                    strokeWidth={1.35}
                    className="text-primary transition-transform duration-500 group-hover:rotate-[28deg] group-hover:scale-105"
                    aria-hidden
                  />
                </span>
              </span>

              {hydrated && hasProgress ? (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-primary shadow-md"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                </span>
              ) : (
                <span
                  className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary shadow-[0_0_12px_rgba(200,169,106,0.6)]"
                  aria-hidden
                />
              )}

              <span className="concierge-fab-pill pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-primary/25 bg-card/90 px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase text-foreground/70 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block lg:hidden">
                Concierge
              </span>
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
