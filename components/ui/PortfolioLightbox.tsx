"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { scaledPhotoHeight } from "@/components/ui/PhotoImage";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LightboxItem = {
  id: string;
  category: string;
  width: number;
  height: number;
  imageUrl?: string;
};

type PortfolioLightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

const controlClass =
  "flex h-12 w-12 items-center justify-center border border-ivory/30 text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-ink";

export function PortfolioLightbox({ items, index, onClose, onNavigate }: PortfolioLightboxProps) {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const current = isOpen ? items[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate(index === 0 ? items.length - 1 : index - 1);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate(index === items.length - 1 ? 0 : index + 1);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Tab") {
        const dialog = closeRef.current?.closest<HTMLElement>("[role=dialog]");
        const focusable = Array.from(
          dialog?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? [],
        ).filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.category} photograph, ${index + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/97 text-ivory backdrop-blur-xl"
          onClick={onClose}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            const end = e.changedTouches[0]?.clientX;
            if (start === null || end === undefined) return;
            const dx = end - start;
            if (Math.abs(dx) < SWIPE_THRESHOLD) return;
            if (dx < 0) goNext();
            else goPrev();
          }}
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8">
            <span className="font-label text-[10.5px] text-ivory/70">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              <span className="mx-3 text-ivory/30">&middot;</span>
              {current.category}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className={controlClass}
              aria-label="Close"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className={`${controlClass} absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 md:flex`}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full max-w-6xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.imageUrl ?? ""}
                alt={`${current.category} photography by CapturedByLulu`}
                width={1400}
                height={scaledPhotoHeight(current.width, current.height, 1400)}
                className="max-h-[calc(100dvh-10rem)] w-auto max-w-full object-contain md:max-h-[calc(100dvh-8rem)]"
                sizes="100vw"
                preload
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className={`${controlClass} absolute top-1/2 right-6 z-10 hidden -translate-y-1/2 md:flex`}
              aria-label="Next image"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:justify-center md:px-8">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className={`${controlClass} md:hidden`}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <p className="font-label text-center text-[10px] text-ivory/50">
              <span className="md:hidden">Swipe to browse</span>
              <span className="hidden md:inline">Arrow keys to browse &middot; Esc to close</span>
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className={`${controlClass} md:hidden`}
              aria-label="Next image"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
