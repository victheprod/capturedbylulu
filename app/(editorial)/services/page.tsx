import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceExperienceShowcase } from "@/components/services/ServiceExperienceShowcase";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Label, delay } from "@/components/editorial/primitives";
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

      <Section>
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="The sessions" title="Choose a session." />
              <PricingNotes className="mt-10 max-w-sm" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <ServiceExperienceShowcase categories={serviceCategories} />
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered>
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeading eyebrow="Also available" title="Weddings and brand work." />
          </div>
          <div className="col-span-12 border-b border-ink/15 lg:col-span-8">
            {moreServices.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="reveal group grid grid-cols-[1fr_auto] items-center gap-6 border-t border-ink/15 py-8 md:py-10"
                style={delay(i * 100)}
              >
                <span>
                  <span className="block font-serif text-3xl font-light transition-colors duration-500 group-hover:text-oxblood md:text-5xl">
                    {item.title}
                  </span>
                  <span className="mt-3 block max-w-xl leading-relaxed text-ink-soft">{item.desc}</span>
                </span>
                <span className="flex h-12 w-12 items-center justify-center border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                  <ArrowUpRight size={18} aria-hidden />
                  <span className="sr-only">See packages</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeading eyebrow="Add-ons" title="Extras for any session." />
          </div>
          <ul className="col-span-12 border-b border-ink/15 lg:col-span-8">
            {addons.map((addon, i) => (
              <li
                key={addon.name}
                className="reveal flex items-baseline justify-between gap-6 border-t border-ink/15 py-5"
                style={delay(i * 60)}
              >
                <span className="flex items-baseline gap-4">
                  <Label className="text-ink-soft">{String(i + 1).padStart(2, "0")}</Label>
                  <span className="leading-snug">{addon.name}</span>
                </span>
                <span className="shrink-0 text-right font-serif text-xl">{addon.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <EstimateCTA
        title="Not sure which package fits?"
        description="Share a few details and Lulu will reply by email with a recommendation and a price. Nothing is booked online."
      />
    </>
  );
}
