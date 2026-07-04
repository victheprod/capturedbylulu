import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { addons } from "@/data/packages";
import { siteImages } from "@/data/portfolio";
import { PageHeroBanner } from "@/components/ui/Hero";
import { PricingShowcase } from "@/components/ui/pricing-showcase";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublicPackageCategories } from "@/lib/cms/packages";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services & Pricing",
  description:
    "Transparent pricing for portraits, families, events, and headshots in San Antonio and surrounding areas.",
  path: "/services",
  image: siteImages.servicesBanner,
});

export default async function ServicesPage() {
  const categories = await getPublicPackageCategories();
  const serviceCategories = categories.filter((c) =>
    ["Portraits", "Families", "Events", "Headshots"].includes(c.category),
  );

  return (
    <>
      <PageHeroBanner
        eyebrow="Investment"
        title="Services & Pricing"
        description="Transparent pricing for every season of life. All packages include a private online gallery and Lulu's signature editing style."
        imageSrc={siteImages.servicesBanner}
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <FadeIn className="mb-12">
          <PricingNotes />
        </FadeIn>

        <PricingShowcase categories={serviceCategories} />

        <FadeIn className="mb-16">
          <div className="mb-8 flex items-center gap-5">
            <h2 className="font-serif text-2xl text-foreground">
              Also Available
            </h2>
            <div className="h-px flex-1 bg-foreground/10" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                title: "Weddings & Pre-Wedding",
                desc: "Intimate ceremonies to full-day celebrations, plus engagement and pre-wedding sessions.",
                href: "/weddings",
              },
              {
                title: "Brand Photography",
                desc: "Elevated imagery for entrepreneurs and businesses — from starter sessions to premium brand packages.",
                href: "/brand-photography",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-foreground/10 bg-card p-8 transition-colors duration-300 hover:border-primary/35"
              >
                <h3 className="mb-2 font-serif text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-foreground/55">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-primary">
                  View Packages <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mb-16 border-t border-foreground/10 pt-16">
          <SectionHeading
            eyebrow="Customize Your Session"
            title="Add-Ons"
            className="mb-8"
          />
          <FadeInStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon) => (
              <FadeInItem
                key={addon.name}
                className="flex flex-col gap-2 border border-foreground/10 bg-card p-5 transition-colors duration-300 hover:border-primary/30"
              >
                <span className="text-sm leading-snug text-foreground/75">
                  {addon.name}
                </span>
                <span className="font-serif text-lg text-primary">
                  {addon.price}
                </span>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </FadeIn>

        <FadeIn className="border border-primary/20 bg-surface p-10 text-center lg:p-14">
          <h2 className="mb-4 font-serif text-3xl font-light text-foreground lg:text-4xl">
            Not sure which package is right?
          </h2>
          <p className="mx-auto mb-7 max-w-md leading-relaxed text-foreground/58">
            Let&apos;s chat. I&apos;ll help you choose the perfect session for
            your vision and budget — no pressure, just a friendly conversation.
          </p>
          <Button href="/contact">Get in Touch</Button>
        </FadeIn>
      </div>
    </>
  );
}
