import type { Metadata } from "next";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { getGridColsClass } from "@/data/packages";
import { getPublicBrandPackages } from "@/lib/cms/packages";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { CinematicHero, CTASection } from "@/components/ui/Hero";
import { PricingCardCompact } from "@/components/ui/PricingCard";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Brand Photography",
  description:
    "Brand photography packages in Texas — editorial imagery for entrepreneurs and businesses by CapturedByLulu.",
  path: "/brand-photography",
  image: siteImages.brandBanner,
});

const deliverables = [
  {
    title: "Website Hero Images",
    desc: "Full-width editorial images for your homepage, about page, and services.",
  },
  {
    title: "Social Content",
    desc: "Months of scroll-stopping content across Instagram, LinkedIn, and more.",
  },
  {
    title: "Media & Press",
    desc: "Professional imagery for PR submissions, podcast artwork, and features.",
  },
  {
    title: "Marketing Materials",
    desc: "Print-ready files for brochures, proposals, and brand collateral.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Brand Discovery",
    desc: "A deep dive into your brand identity, target audience, and visual goals.",
  },
  {
    n: "02",
    title: "Creative Planning",
    desc: "Shot list, mood board, location scouting, and wardrobe direction tailored to your brand.",
  },
  {
    n: "03",
    title: "The Session",
    desc: "A relaxed, guided shoot that captures you and your brand authentically.",
  },
  {
    n: "04",
    title: "Image Delivery",
    desc: "A curated gallery ready for web, social media, and print.",
  },
];

export default async function BrandPhotographyPage() {
  const brandPackages = await getPublicBrandPackages();
  const gridClass = getGridColsClass(brandPackages.length);

  return (
    <>
      <CinematicHero
        eyebrow="Brand Photography"
        title={
          <>
            Imagery that{" "}
            <em className="not-italic text-primary/90">elevates</em> your brand
          </>
        }
        imageSrc={siteImages.brandBanner}
        fullScreen={false}
      />

      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <SectionHeading
              eyebrow="The Approach"
              title="Your brand deserves photography that works as hard as you do"
            />
            <p className="mt-6 leading-relaxed text-foreground/58">
              Brand photography is more than headshots and product shots —
              it&apos;s the visual language of your business. Lulu creates
              cohesive, editorial imagery that attracts your ideal clients and
              tells the story of your brand with authenticity.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/58">
              From solopreneurs to established businesses, every brand shoot
              begins with a clear plan to ensure every image serves a purpose.
            </p>
          </FadeIn>
          <FadeIn className="aspect-[4/3] overflow-hidden bg-card">
            <PhotoImage
              src={siteImages.brandDetail}
              alt="Brand photography session in progress"
              width={800}
              height={600}
              objectPosition={siteImageFraming.brandDetail.objectPosition}
            />
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-surface px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-10">
            <SectionHeading
              eyebrow="What You Walk Away With"
              title="A complete visual library for your brand"
            />
          </FadeIn>
          <FadeInStagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {deliverables.map((item) => (
              <FadeInItem
                key={item.title}
                className="border border-foreground/10 bg-card p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <div className="mb-4 h-px w-8 bg-primary" />
                <h3 className="mb-2 font-serif text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/55">
                  {item.desc}
                </p>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-10 text-center">
            <SectionHeading
              eyebrow="Investment"
              title="Brand Photography Packages"
              align="center"
            />
          </FadeIn>
          <FadeIn className="mb-12">
            <PricingNotes />
          </FadeIn>
          <FadeInStagger className={`grid gap-5 ${gridClass}`}>
            {brandPackages.map((pkg) => (
              <FadeInItem key={pkg.id}>
                <PricingCardCompact
                  pkg={pkg}
                  category="Brand Photography"
                  note={pkg.details}
                  ctaLabel="Book This Package"
                />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-surface px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-12 text-center">
            <SectionHeading
              eyebrow="The Process"
              title="How It Works"
              align="center"
            />
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {processSteps.map((step) => (
              <FadeInItem
                key={step.n}
                className="border border-foreground/10 bg-card p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <p className="mb-4 text-[11px] tracking-widest text-primary">
                  {step.n}
                </p>
                <h3 className="mb-2 font-serif text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/55">
                  {step.desc}
                </p>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to elevate your brand?"
        title="Let's plan your session"
        description="Share your vision and Lulu will put together a custom brand photography proposal for your business."
        ctaLabel="Book Brand Photography"
        ctaHref="/contact"
        imageSrc={siteImages.brandDetail}
      />
    </>
  );
}
