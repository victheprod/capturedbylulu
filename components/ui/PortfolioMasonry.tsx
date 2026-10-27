"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  portfolioFilters,
  portfolioItems as staticItems,
  type PortfolioCategory,
} from "@/data/portfolio";
import type { PublicPortfolioItem } from "@/lib/cms/portfolio";
import { PortfolioLightbox } from "@/components/ui/PortfolioLightbox";
import { Button } from "@/components/ui/Button";
import { scaledPhotoHeight } from "@/components/ui/PhotoImage";
import { portfolioImageUrl, cn } from "@/lib/utils";
import { excludeIds as excludeIdsFromList } from "@/lib/image-dedupe";

type LightboxItem = {
  id: string;
  category: string;
  width: number;
  height: number;
  imageUrl: string;
};

type PortfolioMasonryProps = {
  items?: PublicPortfolioItem[];
  excludeIds?: string[];
};

const PAGE_SIZE = 48;

const categoryCaptions: Record<string, string> = {
  Weddings: "Ceremony, celebration, and the quiet in-between.",
  Portraits: "Editorial light. Honest expression.",
  Families: "Love as it actually looks.",
  Events: "Energy, detail, and the night you'll replay.",
};

export function PortfolioMasonry({
  items: propItems,
  excludeIds = [],
}: PortfolioMasonryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allItems: LightboxItem[] = useMemo(() => {
    let list: LightboxItem[];
    if (propItems?.length) {
      list = propItems.map((item) => ({
        id: item.id,
        category: item.category,
        width: item.width,
        height: item.height,
        imageUrl: item.imageUrl,
      }));
    } else {
      list = staticItems.map((item) => ({
        id: item.id,
        category: item.category,
        width: item.width,
        height: item.height,
        imageUrl: portfolioImageUrl(item, 700),
      }));
    }
    return excludeIds.length ? excludeIdsFromList(list, excludeIds) : list;
  }, [propItems, excludeIds]);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? allItems
        : allItems.filter((p) => p.category === activeFilter),
    [activeFilter, allItems],
  );

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const hasMore = visibleCount < filtered.length;
  const progress = filtered.length
    ? Math.round((Math.min(visibleCount, filtered.length) / filtered.length) * 100)
    : 0;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  const openLightbox = (item: LightboxItem) => {
    const idx = filtered.findIndex((p) => p.id === item.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  const lightboxItems = filtered.map((p) => ({
    id: p.id,
    category: p.category as Exclude<PortfolioCategory, "All">,
    width: p.width,
    height: p.height,
    imageUrl: p.imageUrl,
  }));

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <LayoutGroup id="portfolio-filters">
              {portfolioFilters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={cn(
                      "font-label relative border px-4 py-2.5 text-[10.5px] transition-colors duration-300 sm:px-5",
                      isActive
                        ? "border-ink text-ivory"
                        : "border-ink/15 text-ink-soft hover:border-ink/50 hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-filter-pill"
                        className="absolute -inset-px bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{filter}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
          {activeFilter !== "All" && categoryCaptions[activeFilter] && (
            <p className="max-w-md font-serif text-lg italic text-ink-soft">
              {categoryCaptions[activeFilter]}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="font-label text-[10.5px] text-ink-soft">
            {Math.min(visibleCount, filtered.length)} of {filtered.length} on the wall
          </p>
          <div className="h-px w-32 bg-ink/15 sm:w-40">
            <motion.div
              className="h-full bg-ink"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <motion.div layout className="columns-2 gap-3 md:gap-5 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visible.map((photo, index) => (
            <motion.button
              key={`${photo.id}-${activeFilter}`}
              type="button"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.02, 0.15) }}
              onClick={() => openLightbox(photo)}
              className="group relative mb-3 block w-full cursor-zoom-in break-inside-avoid text-left md:mb-5"
              aria-label={`View ${photo.category} photograph ${index + 1}`}
            >
              <div className="relative overflow-hidden bg-bone">
                <Image
                  src={photo.imageUrl}
                  alt={`${photo.category} photography by CapturedByLulu`}
                  width={700}
                  height={scaledPhotoHeight(photo.width, photo.height, 700)}
                  className="block h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading={index < 12 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="min-w-[220px]"
          >
            Continue through the gallery
          </Button>
          <p className="font-label text-[10.5px] text-ink-soft">
            {filtered.length - visibleCount} more photographs
          </p>
        </div>
      )}

      {!visible.length && (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl font-light text-ink-soft">
            No photographs in this room yet.
          </p>
        </div>
      )}

      <PortfolioLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
