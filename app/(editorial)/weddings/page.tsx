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
import { FadeIn } from "@/components/ui/FadeIn";
import { Label, delay } from "@/components/editorial/primitives";
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
            <em className="italic text-oxblood">actually</em> happened.
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
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-soft">
              Lulu covers the planned moments and the ones nobody planned: the
              first look, the toast that runs long, your aunt taking over the
              dance floor.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              Most of the day he works quietly in the background. When it&apos;s
              time for portraits, he steps in and directs, so you end up with
              honest moments and photos worth framing.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {weddingsEditorialPair.map((photo, i) => (
              <div
                key={photo.id}
                className={cn("curtain aspect-[3/4] bg-bone", i === 1 && "mt-16")}
                style={delay(i * 150)}
              >
                <PhotoImage
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={800}
                  objectPosition={photo.objectPosition}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered>
        <FadeIn>
          <SectionHeading
            eyebrow="Real weddings"
            title="Recent celebrations."
            description="Ceremony, bridal party, and reception moments from recent weddings."
            action={
              <Button href="/portfolio" variant="link">
                Full portfolio
              </Button>
            }
          />
        </FadeIn>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {weddingsHighlightGallery.map((photo, i) => (
            <div
              key={photo.id}
              className="curtain aspect-[3/4] bg-bone md:aspect-[4/5]"
              style={delay((i % 3) * 120)}
            >
              <PhotoImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                objectPosition={photo.objectPosition}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="packages" className="scroll-mt-16">
        <div className="mb-16 grid grid-cols-12 gap-x-6 gap-y-10">
          <SectionHeading
            className="col-span-12 lg:col-span-7"
            eyebrow="Pricing"
            title="Wedding and pre-wedding packages."
          />
          <PricingNotes className="col-span-12 self-end lg:col-span-4 lg:col-start-9" />
        </div>
        {weddingsPageCategories.map((section) => (
          <PricingCategorySection key={section.id} section={section} />
        ))}
      </Section>

      <Section tone="surface" bordered>
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeading eyebrow="The process" title="What to expect." />
          </div>
          <ol className="col-span-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {processSteps.map((item, i) => (
              <li
                key={item.title}
                className="reveal border-t border-ink/15 pt-6 pb-10"
                style={delay((i % 2) * 120)}
              >
                <Label className="text-oxblood">Step {String(i + 1).padStart(2, "0")}</Label>
                <h3 className="mt-3 font-serif text-3xl font-light">{item.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <EstimateCTA
        eyebrow="Wedding dates"
        title="Lulu takes a limited number of weddings each year."
        description="Send your date and venue and he'll reply with availability and a quote, usually within a day or two."
        ctaLabel="Get a wedding estimate"
      />
    </>
  );
}
