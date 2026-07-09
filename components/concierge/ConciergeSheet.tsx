"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaptureConcierge } from "@/components/concierge/CaptureConcierge";
import { useConcierge } from "@/components/concierge/ConciergeContext";
import { cn } from "@/lib/utils";

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getDesktopServerSnapshot() {
  return false;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConciergeSheet() {
  const { isOpen, close, triggerRef } = useConcierge();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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

    const timer = window.setTimeout(() => closeRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen, close, triggerRef]);

  const sheetMotion = isDesktop
    ? {
        initial: reduced ? false : { x: "100%", opacity: 0.9 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
      }
    : {
        initial: reduced ? false : { y: "100%", opacity: 0.9 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Dismiss consultation overlay"
            className="fixed inset-0 z-[60] bg-background/50 backdrop-blur-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={close}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="concierge-dialog-title"
            aria-describedby="concierge-dialog-desc"
            className={cn(
              "fixed z-[61] flex flex-col overflow-hidden bg-[#1a1512]/96 shadow-[0_-8px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
              "inset-x-0 bottom-0 max-h-[min(92dvh,900px)] border-t border-foreground/10 pb-[env(safe-area-inset-bottom,0px)]",
              "lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[min(440px,100vw)] lg:border-t-0 lg:border-l lg:pb-0",
            )}
            {...sheetMotion}
            transition={{ duration: reduced ? 0.2 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full min-h-0 flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-foreground/8 px-5 py-4 pt-[max(1rem,env(safe-area-inset-top,0px))] lg:pt-4">
                <div>
                  <p
                    id="concierge-dialog-title"
                    className="text-[10px] tracking-[0.28em] uppercase text-primary"
                  >
                    Capture Concierge
                  </p>
                  <p
                    id="concierge-dialog-desc"
                    className="mt-0.5 text-xs text-foreground/45"
                  >
                    No pressure — I&apos;ll help you narrow it down.
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-foreground/12 text-foreground/50 transition-colors hover:border-foreground/25 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Close Capture Concierge"
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
