import type { Metadata } from "next";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { getPublicWeddingCategories } from "@/lib/cms/packages";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { PricingCategorySection } from "@/components/ui/PricingCategorySection";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { siteImages, weddingsHighlightGallery, weddingsEditorialPair } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Wedding Photography",
  description:
    "Wedding and pre-wedding photography across Texas. Collections from intimate ceremonies to full-day celebrations.",
  path: "/weddings",
  image: siteImages.weddingsBanner,
});

const processSteps = [
  {
    title: "Estimate and a call",
    desc: "Request an estimate here, then talk through the day with Lulu. Nothing is booked until you both agree by email.",
  },
  {
    title: "Pre-wedding session",
    desc: "An engagement or pre-wedding shoot, so you're comfortable in front of the camera before the big day.",
  },
  {
    title: "The wedding day",
    desc: "Lulu arrives early, stays late, and covers everything in between without getting in the way.",
  },
  {
    title: "Your gallery",
    desc: "A fully edited gallery delivered in 4 to 6 weeks, ready to download, share, and print.",
  },
];

export default async function WeddingsPage() {
  const weddingsPageCategories = await getPublicWeddingCategories();
  return (
    <>
      <PageHeader
        eyebrow="Weddings"
        tagline="Intimate ceremonies to full-day celebrations across Texas."
        title={
          <>
            Your wedding, the way it{" "}
            <em className="not-italic text-primary">actually</em> happened.
          </>
        }
        description="Honest coverage of the planned moments and the unplanned ones, plus portraits worth framing."
        imageSrc={siteImages.weddingsBanner}
        imagePosition="50% 40%"
        imageAlt="Wedding photographed by Lulu"
        primaryCta={{ label: "Get a wedding estimate", href: "/contact" }}
        secondaryCta={{ label: "See packages", href: "#packages" }}
      />

      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <SectionHeading
              eyebrow="How Lulu works"
              title="Weddings don't run on a script, and the photos shouldn't look like they did."
            />
            <p className="mt-6 leading-relaxed text-foreground/60">
              Lulu covers the planned moments and the ones nobody planned: the
              first look, the toast that runs long, your aunt taking over the
              dance floor.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/60">
              Most of the day he works quietly in the background. When it&apos;s
              time for portraits, he steps in and directs, so you end up with
              honest moments and photos worth framing.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-2 gap-3">
            {weddingsEditorialPair.map((photo, i) => (
              <FadeInItem
                key={photo.id}
                className={cn("aspect-[3/4] overflow-hidden bg-card", i === 1 && "mt-12")}
              >
                <PhotoImage
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={800}
                  objectPosition={photo.objectPosition}
                />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </Section>

      <Section tone="surface" bordered>
        <FadeIn>
          <SectionHeading
            eyebrow="Real weddings"
            title="Recent celebrations"
            description="Ceremony, bridal party, and reception moments from recent weddings."
            action={
              <Button href="/portfolio" variant="link">
                Full portfolio
              </Button>
            }
          />
        </FadeIn>
        <FadeInStagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {weddingsHighlightGallery.map((photo) => (
            <FadeInItem
              key={photo.id}
              className="aspect-[3/4] overflow-hidden bg-card md:aspect-[4/5]"
            >
              <PhotoImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                objectPosition={photo.objectPosition}
              />
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Section>

      <Section id="packages">
        <FadeIn>
          <SectionHeading eyebrow="Pricing" title="Wedding and pre-wedding packages" />
        </FadeIn>
        <FadeIn className="mt-10 mb-12">
          <PricingNotes />
        </FadeIn>
        {weddingsPageCategories.map((section) => (
          <PricingCategorySection key={section.id} section={section} />
        ))}
      </Section>

      <Section tone="surface" bordered innerClassName="max-w-5xl">
        <FadeIn>
          <SectionHeading eyebrow="The process" title="What to expect" />
        </FadeIn>
        <ol className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {processSteps.map((item, i) => (
            <li key={item.title} className="border-t border-foreground/10 pt-6">
              <FadeIn delay={i * 0.05}>
                <p className="text-sm text-primary/80">{i + 1}.</p>
                <h3 className="mt-2 font-serif text-2xl font-light text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {item.desc}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Section>

      <EstimateCTA
        eyebrow="Wedding dates"
        title="Lulu takes a limited number of weddings each year."
        description="Send your date and venue and he'll reply with availability and a quote, usually within a day or two."
        ctaLabel="Get a wedding estimate"
        imageSrc={siteImages.weddingsDetail2}
      />
    </>
  );
}
