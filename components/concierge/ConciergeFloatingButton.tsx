"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { cn } from "@/lib/utils";

type ConciergeFloatingButtonProps = {
  className?: string;
};

export function ConciergeFloatingButton({ className }: ConciergeFloatingButtonProps) {
  const { open, hasProgress } = useConcierge();

  return (
    <motion.button
      type="button"
      onClick={open}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass-panel group fixed z-40 flex items-center gap-2.5 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.28)] transition-shadow duration-400",
        "bottom-5 right-5 sm:bottom-7 sm:right-7",
        "hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)] hover:border-primary/20",
        className,
      )}
      aria-label="Open Capture Concierge — find your photography package"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/15">
        <Sparkles size={15} strokeWidth={1.75} />
      </span>
      <span className="flex flex-col items-start text-left">
        <span className="text-[10px] tracking-[0.22em] uppercase text-primary">
          Capture Concierge
        </span>
        <span className="text-xs text-foreground/75">
          {hasProgress ? "Continue choosing" : "Need help choosing?"}
        </span>
      </span>
      {hasProgress ? (
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary animate-editorial-breathe" />
      ) : null}
    </motion.button>
  );
}
