"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { scaledPhotoHeight } from "@/components/ui/PhotoImage";
import { FilmGrain } from "@/components/ui/FilmGrain";
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

export function PortfolioLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: PortfolioLightboxProps) {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const current = isOpen ? items[index] : null;

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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.category} photography — image ${index + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0c0a]/97 backdrop-blur-2xl"
          onClick={onClose}
        >
          <FilmGrain opacity={0.04} />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute top-1/2 left-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute top-1/2 right-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-4 flex max-h-[88vh] max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1a1512] p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] sm:p-4">
              <Image
                src={current.imageUrl ?? ""}
                alt={`${current.category} photography by CapturedByLulu`}
                width={1400}
                height={scaledPhotoHeight(
                  current.width,
                  current.height,
                  1400,
                )}
                className="max-h-[72vh] w-auto max-w-full object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
              <span className="font-serif text-[11px] tracking-[0.3em] uppercase text-primary">
                {current.category}
              </span>
              <span className="hidden h-3 w-px bg-foreground/20 sm:block" aria-hidden />
              <span className="text-[11px] tracking-[0.15em] uppercase text-foreground/40">
                {index + 1} / {items.length}
              </span>
            </div>

            <p className="sr-only">
              Use arrow keys to navigate. Press Escape to close.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
