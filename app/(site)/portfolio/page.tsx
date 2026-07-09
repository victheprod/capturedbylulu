import { PortfolioMasonry } from "@/components/ui/PortfolioMasonry";
import { PortfolioScrollShowcase } from "@/components/ui/PortfolioScrollShowcase";
import { PortfolioEditorialIntro } from "@/components/portfolio/PortfolioEditorialIntro";
import { SignatureMark } from "@/components/ui/SignatureMark";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteImages, portfolioScrollShowcase } from "@/data/portfolio";
import { getPublicPortfolioItems } from "@/lib/cms/portfolio";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Browse wedding, portrait, family, and event photography by CapturedByLulu across Texas.",
  path: "/portfolio",
  image: siteImages.hero,
});

export default async function PortfolioPage() {
  const items = await getPublicPortfolioItems();

  return (
    <div className="bg-background">
      <PortfolioEditorialIntro />
      <PortfolioScrollShowcase />
      <SignatureMark />
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeIn className="mb-14 max-w-2xl">
          <p className="mb-4 text-[11px] tracking-[0.28em] uppercase text-primary">
            The archive
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-light text-foreground">
            Every photograph on the wall
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/55">
            Filter by room — weddings, portraits, families, events — then step
            closer. Click any frame to enter fullscreen.
          </p>
        </FadeIn>
        <FadeIn>
          <PortfolioMasonry
            items={items}
            excludeIds={portfolioScrollShowcase.map((item) => item.id)}
          />
        </FadeIn>
      </div>
    </div>
  );
}
