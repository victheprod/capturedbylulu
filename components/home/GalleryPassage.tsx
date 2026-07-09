"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioScrollShowcase } from "@/components/ui/PortfolioScrollShowcase";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteImages } from "@/data/portfolio";

/** Images already shown above the gallery walk on the homepage */
const HOME_GALLERY_EXCLUDE_IDS = [
  "weddings/DSC00201",
  "weddings/DSC07766",
  "weddings/DSC00181",
];

export function GalleryPassage() {
  return (
    <div className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 lg:px-10 lg:pt-28">
        <FadeIn className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] tracking-[0.32em] uppercase text-primary">
              The Collection
            </p>
            <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] text-foreground">
              Walk through the work —{" "}
              <span className="text-foreground/45">not a grid, a gallery.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/55">
              Scroll horizontally through curated moments from weddings, portraits,
              families, and celebrations across Texas. Each frame is chosen to
              feel like turning a page in an editorial spread.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 self-start text-[11px] tracking-[0.2em] uppercase text-primary lg:self-end"
          >
            Full archive
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </FadeIn>
      </div>
      <PortfolioScrollShowcase
        hideHeader
        excludeIds={HOME_GALLERY_EXCLUDE_IDS}
        excludeSrcs={[siteImages.hero, siteImages.aboutTeaser, siteImages.cta]}
      />
    </div>
  );
}
