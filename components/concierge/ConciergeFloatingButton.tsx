"use client";

import { Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { cn } from "@/lib/utils";

type ConciergeFloatingButtonProps = {
  className?: string;
};

export function ConciergeFloatingButton({ className }: ConciergeFloatingButtonProps) {
  const { open, hasProgress, hydrated, isOpen, triggerRef } = useConcierge();
  const reduced = useReducedMotion();

  const label = hydrated && hasProgress ? "Continue choosing" : "Need help choosing?";

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={open}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
          transition={{ delay: reduced ? 0 : 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduced ? undefined : { y: -2 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          className={cn(
            "concierge-fab glass-panel group fixed z-40 flex items-center gap-2.5 px-3.5 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.28)] transition-shadow duration-400 sm:px-4 sm:py-3",
            "hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)] hover:border-primary/20",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            className,
          )}
          aria-label={`Open Capture Concierge — ${label}`}
          aria-haspopup="dialog"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/15">
            <Sparkles size={15} strokeWidth={1.75} aria-hidden />
          </span>
          <span className="hidden min-w-0 flex-col items-start text-left sm:flex">
            <span className="text-[10px] tracking-[0.22em] uppercase text-primary">
              Capture Concierge
            </span>
            <span className="text-xs text-foreground/75">{label}</span>
          </span>
          <span className="sr-only sm:hidden">{label}</span>
          {hydrated && hasProgress ? (
            <span
              className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-editorial-breathe sm:ml-1"
              aria-hidden
            />
          ) : null}
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
