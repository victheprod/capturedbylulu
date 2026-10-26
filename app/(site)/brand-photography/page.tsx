import type { Metadata } from "next";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { getGridColsClass } from "@/data/packages";
import { getPublicBrandPackages } from "@/lib/cms/packages";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { PricingCardCompact } from "@/components/ui/PricingCard";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Brand Photography",
  description:
    "Brand photography packages in Texas for entrepreneurs and businesses by CapturedByLulu.",
  path: "/brand-photography",
  image: siteImages.brandBanner,
});

const deliverables = [
  {
    title: "Website images",
    desc: "Wide, clean images for your homepage, about page, and services.",
  },
  {
    title: "Social content",
    desc: "A bank of posts for Instagram, LinkedIn, and wherever else you show up.",
  },
  {
    title: "Press and media",
    desc: "Headshots and portraits for features, podcasts, and speaker bios.",
  },
  {
    title: "Print and marketing",
    desc: "Print-ready files for flyers, proposals, and packaging.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    desc: "What the photos are for, who they're for, and where they'll live.",
  },
  {
    title: "Planning",
    desc: "Shot list, mood board, location, and wardrobe, worked out ahead of time.",
  },
  {
    title: "The shoot",
    desc: "A relaxed, directed session. You won't be left guessing what to do.",
  },
  {
    title: "Delivery",
    desc: "An edited gallery sized for web, social, and print.",
  },
];

export default async function BrandPhotographyPage() {
  const brandPackages = await getPublicBrandPackages();
  const gridClass = getGridColsClass(brandPackages.length);

  return (
    <>
      <PageHeader
        eyebrow="Brand photography"
        tagline="For founders, small businesses, and personal brands."
        title={
          <>
            Brand photos you&apos;ll{" "}
            <em className="not-italic text-primary">actually</em> use.
          </>
        }
        description="Photos for your website, your socials, and your next launch, planned around how you'll use them."
        imageSrc="/site-images/portraits/DSC09219.jpg"
        imagePosition="70% 40%"
        imageAlt="Studio portrait on a blue backdrop photographed by Lulu"
        primaryCta={{ label: "Get a brand estimate", href: "/contact" }}
        secondaryCta={{ label: "See packages", href: "#packages" }}
      />

      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <SectionHeading
              eyebrow="The approach"
              title="A plan first, then the shoot."
            />
            <p className="mt-6 leading-relaxed text-foreground/60">
              Good brand photography is more than a headshot. It&apos;s a set of
              images that look like they belong together, so your site, feed,
              and press kit feel consistent.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/60">
              Whether you&apos;re a solo founder or a team, every brand shoot
              starts with a short plan so each photo has a job.
            </p>
          </FadeIn>
          <FadeIn className="aspect-[4/3] overflow-hidden bg-card">
            <PhotoImage
              src={siteImages.brandDetail}
              alt="Brand photography session"
              width={800}
              height={600}
              objectPosition={siteImageFraming.brandDetail.objectPosition}
            />
          </FadeIn>
        </div>
      </Section>

      <Section tone="surface" bordered>
        <FadeIn>
          <SectionHeading eyebrow="What you get" title="Images for every place your brand shows up" />
        </FadeIn>
        <FadeInStagger className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item) => (
            <FadeInItem key={item.title} className="border-t border-foreground/10 pt-6">
              <h3 className="font-serif text-xl font-light text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                {item.desc}
              </p>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Section>

      <Section id="packages">
        <FadeIn>
          <SectionHeading eyebrow="Pricing" title="Brand photography packages" />
        </FadeIn>
        <FadeIn className="mt-10 mb-12">
          <PricingNotes />
        </FadeIn>
        <FadeInStagger className={`grid gap-5 ${gridClass}`}>
          {brandPackages.map((pkg) => (
            <FadeInItem key={pkg.id}>
              <PricingCardCompact
                pkg={pkg}
                category="Brand Photography"
                note={pkg.details}
                ctaLabel="Get Estimate"
              />
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Section>

      <Section tone="surface" bordered>
        <FadeIn>
          <SectionHeading eyebrow="The process" title="How it works" />
        </FadeIn>
        <ol className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="border-t border-foreground/10 pt-6">
              <FadeIn delay={i * 0.05}>
                <p className="text-sm text-primary/80">{i + 1}.</p>
                <h3 className="mt-2 font-serif text-xl font-light text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {step.desc}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Section>

      <EstimateCTA
        eyebrow="Brand photography"
        title="Let's plan your shoot."
        description="Tell Lulu what the photos are for and where they'll live. He'll send back a custom quote for your business."
        ctaLabel="Get a brand estimate"
      />
    </>
  );
}
