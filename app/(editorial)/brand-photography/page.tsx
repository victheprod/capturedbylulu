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
import { Label, delay } from "@/components/editorial/primitives";
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
            <em className="italic text-oxblood">actually</em> use.
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
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-soft">
              Good brand photography is more than a headshot. It&apos;s a set of
              images that look like they belong together, so your site, feed,
              and press kit feel consistent.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              Whether you&apos;re a solo founder or a team, every brand shoot
              starts with a short plan so each photo has a job.
            </p>
          </FadeIn>
          <div className="curtain aspect-[4/3] bg-bone">
            <PhotoImage
              src={siteImages.brandDetail}
              alt="Brand photography session"
              width={800}
              height={600}
              objectPosition={siteImageFraming.brandDetail.objectPosition}
            />
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="What you get" title="Images for every place your brand shows up." />
        <ul className="mt-14 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, i) => (
            <li
              key={item.title}
              className="reveal border-t border-ink/15 pt-6 pb-10"
              style={delay((i % 4) * 100)}
            >
              <Label className="text-oxblood">{String(i + 1).padStart(2, "0")}</Label>
              <h3 className="mt-3 font-serif text-2xl font-light">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{item.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="packages" className="scroll-mt-16">
        <div className="mb-14 grid grid-cols-12 gap-x-6 gap-y-10">
          <SectionHeading
            className="col-span-12 lg:col-span-7"
            eyebrow="Pricing"
            title="Brand photography packages."
          />
          <PricingNotes className="col-span-12 self-end lg:col-span-4 lg:col-start-9" />
        </div>
        <FadeInStagger className={`grid gap-4 md:gap-6 ${gridClass}`}>
          {brandPackages.map((pkg) => (
            <FadeInItem key={pkg.id}>
              <PricingCardCompact pkg={pkg} category="Brand Photography" note={pkg.details} />
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="The process" title="How it works." />
        <ol className="mt-14 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="reveal border-t border-ink/15 pt-6 pb-10"
              style={delay((i % 4) * 100)}
            >
              <Label className="text-oxblood">Step {String(i + 1).padStart(2, "0")}</Label>
              <h3 className="mt-3 font-serif text-2xl font-light">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.desc}</p>
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
