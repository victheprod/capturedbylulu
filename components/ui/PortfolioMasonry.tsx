"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Expand } from "lucide-react";
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

type LightboxItem = {
  id: string;
  category: string;
  width: number;
  height: number;
  imageUrl: string;
};

type PortfolioMasonryProps = {
  items?: PublicPortfolioItem[];
};

const PAGE_SIZE = 48;

export function PortfolioMasonry({ items: propItems }: PortfolioMasonryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allItems: LightboxItem[] = useMemo(() => {
    if (propItems?.length) {
      return propItems.map((item) => ({
        id: item.id,
        category: item.category,
        width: item.width,
        height: item.height,
        imageUrl: item.imageUrl,
      }));
    }
    return staticItems.map((item) => ({
      id: item.id,
      category: item.category,
      width: item.width,
      height: item.height,
      imageUrl: portfolioImageUrl(item, 700),
    }));
  }, [propItems]);

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
      <div className="mb-8 flex flex-col gap-4 border-b border-foreground/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <LayoutGroup id="portfolio-filters">
            {portfolioFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "relative border px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 sm:px-5 sm:text-[11px]",
                    isActive
                      ? "border-primary text-primary-foreground"
                      : "border-foreground/18 text-foreground/55 hover:border-foreground/45 hover:text-foreground/80",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      className="absolute inset-0 bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
        <p className="text-[11px] tracking-[0.12em] uppercase text-foreground/40">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
        </p>
      </div>

      <motion.div layout className="columns-2 gap-2.5 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visible.map((photo, index) => (
            <motion.button
              key={`${photo.id}-${activeFilter}`}
              type="button"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.2) }}
              onClick={() => openLightbox(photo)}
              className="group relative mb-2.5 block w-full cursor-zoom-in overflow-hidden bg-card break-inside-avoid text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`View ${photo.category} photograph`}
            >
              <Image
                src={photo.imageUrl}
                alt={`${photo.category} photography by CapturedByLulu`}
                width={700}
                height={scaledPhotoHeight(photo.width, photo.height, 700)}
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading={index < 12 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={18} className="text-foreground/80" />
              </div>
              <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground sm:text-[11px]">
                  {photo.category}
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-primary">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="min-w-[200px]"
          >
            Load More
          </Button>
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
