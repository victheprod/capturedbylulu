"use client";

import { PortfolioScrollShowcase } from "@/components/ui/PortfolioScrollShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
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
    <section className="bg-background pt-20 lg:pt-28">
      <FadeIn className="mx-auto max-w-7xl px-6 pb-10 lg:px-10 lg:pb-12">
        <SectionHeading
          eyebrow="Recent work"
          title="A few favorites."
          description="Weddings, portraits, families, and birthdays from the last few seasons. Scroll sideways, or open the full portfolio."
          action={
            <Button href="/portfolio" variant="link">
              Full portfolio
            </Button>
          }
        />
      </FadeIn>
      <PortfolioScrollShowcase
        hideHeader
        excludeIds={HOME_GALLERY_EXCLUDE_IDS}
        excludeSrcs={[siteImages.hero, siteImages.aboutTeaser, siteImages.cta]}
      />
    </section>
  );
}
