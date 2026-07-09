"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CaptureConcierge } from "@/components/concierge/CaptureConcierge";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { cn } from "@/lib/utils";

export function ConciergeSheet() {
  const { isOpen, close } = useConcierge();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close Capture Concierge"
            className="fixed inset-0 z-[60] bg-background/50 backdrop-blur-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Capture Concierge"
            className={cn(
              "fixed z-[61] flex flex-col overflow-hidden bg-[#1a1512]/96 shadow-[0_-8px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
              "inset-x-0 bottom-0 max-h-[min(92dvh,900px)] border-t border-foreground/10",
              "lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[min(440px,100vw)] lg:border-t-0 lg:border-l",
            )}
            initial={{ y: "100%", x: 0, opacity: 0.8 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: "100%", x: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-foreground/8 px-5 py-4">
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-primary">
                    Capture Concierge
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/45">
                    No pressure — I&apos;ll help you narrow it down.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center border border-foreground/12 text-foreground/50 transition-colors hover:border-foreground/25 hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6 [scrollbar-width:thin]">
                <CaptureConcierge variant="sheet" onClose={close} />
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
