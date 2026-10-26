import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceExperienceShowcase } from "@/components/services/ServiceExperienceShowcase";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { addons } from "@/data/packages";
import { siteImages } from "@/data/portfolio";
import { getPublicPackageCategories } from "@/lib/cms/packages";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services & Pricing",
  description:
    "Transparent pricing for portraits, families, events, and headshots across Texas.",
  path: "/services",
  image: siteImages.servicesBanner,
});

const moreServices = [
  {
    title: "Weddings & pre-wedding",
    desc: "Courthouse vows to full-day celebrations, plus engagement sessions.",
    href: "/weddings",
  },
  {
    title: "Brand photography",
    desc: "Photos for your website, socials, and launches, from starter sessions to full brand days.",
    href: "/brand-photography",
  },
];

export default async function ServicesPage() {
  const categories = await getPublicPackageCategories();
  const serviceCategories = categories.filter((c) =>
    ["Portraits", "Families", "Events", "Headshots"].includes(c.category),
  );

  return (
    <>
      <PageHeader
        eyebrow="Services"
        tagline="Portraits, families, events, and headshots."
        title="Packages and pricing."
        description="Every package includes a private online gallery and Lulu's editing. Pick a session type below and request an estimate. Lulu confirms the final price by email."
        imageSrc="/site-images/portraits/DSC05682.jpg"
        imagePosition="50% 30%"
        imageAlt="Two friends in white dresses photographed outdoors by Lulu"
      />

      <Section innerClassName="max-w-5xl">
        <FadeIn className="mb-12">
          <PricingNotes />
        </FadeIn>
        <ServiceExperienceShowcase categories={serviceCategories} />
      </Section>

      <Section tone="surface" bordered innerClassName="max-w-5xl">
        <FadeIn>
          <SectionHeading eyebrow="Also available" title="Weddings and brand work" />
        </FadeIn>
        <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
          {moreServices.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <div className="max-w-xl">
                <h3 className="font-serif text-2xl font-light text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                  {item.desc}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                See packages
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section innerClassName="max-w-5xl">
        <FadeIn>
          <SectionHeading eyebrow="Add-ons" title="Extras for any session" />
        </FadeIn>
        <FadeInStagger className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
          {addons.map((addon) => (
            <FadeInItem
              key={addon.name}
              className="flex items-center justify-between gap-4 py-5"
            >
              <span className="text-sm leading-snug text-foreground/75">
                {addon.name}
              </span>
              <span className="shrink-0 font-serif text-lg text-primary">
                {addon.price}
              </span>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Section>

      <EstimateCTA
        title="Not sure which package fits?"
        description="Share a few details and Lulu will reply by email with a recommendation and a price. Nothing is booked online."
      />
    </>
  );
}
