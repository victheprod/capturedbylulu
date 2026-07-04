import type { Metadata } from "next";
import { PortfolioMasonry } from "@/components/ui/PortfolioMasonry";
import { PortfolioScrollShowcase } from "@/components/ui/PortfolioScrollShowcase";
import { PageHeroBanner } from "@/components/ui/Hero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteImages } from "@/data/portfolio";
import { getPublicPortfolioItems } from "@/lib/cms/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Browse wedding, portrait, family, and event photography by CapturedByLulu in San Antonio.",
  path: "/portfolio",
  image: siteImages.hero,
});

export default async function PortfolioPage() {
  const items = await getPublicPortfolioItems();

  return (
    <div>
      <PageHeroBanner
        eyebrow="CapturedByLulu"
        title="Portfolio"
        description="Weddings, portraits, families, and events — a selection of Lulu's work across San Antonio and beyond."
        imageSrc={siteImages.hero}
      />
      <PortfolioScrollShowcase />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <FadeIn className="mb-12">
          <SectionHeading
            eyebrow="Full gallery"
            title="Browse every session"
            description="Filter by category or load more — over two thousand photographs from weddings, portraits, families, and events."
          />
        </FadeIn>
        <FadeIn>
          <PortfolioMasonry items={items} />
        </FadeIn>
      </div>
    </div>
  );
}
