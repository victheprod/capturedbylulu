import type { Metadata } from "next";
import { PortfolioMasonry } from "@/components/ui/PortfolioMasonry";
import { PortfolioScrollShowcase } from "@/components/ui/PortfolioScrollShowcase";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteImages, portfolioScrollShowcase } from "@/data/portfolio";
import { getPublicPortfolioItems } from "@/lib/cms/portfolio";
import { pageMetadata } from "@/lib/metadata";

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
    <>
      <PageHeader
        eyebrow="Portfolio"
        tagline="Weddings, portraits, families, and events."
        title="The work."
        description="Start with the highlights, then browse everything. It's all real client work from Texas and beyond."
      />
      <PortfolioScrollShowcase hideHeader />
      <Section className="border-t border-foreground/10">
        <FadeIn>
          <SectionHeading
            eyebrow="Archive"
            title="Everything else"
            description="Filter by category, then click any photo to view it full screen."
          />
        </FadeIn>
        <FadeIn className="mt-12">
          <PortfolioMasonry
            items={items}
            excludeIds={portfolioScrollShowcase.map((item) => item.id)}
          />
        </FadeIn>
      </Section>
      <EstimateCTA />
    </>
  );
}
