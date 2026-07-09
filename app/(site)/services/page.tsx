import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageEditorialIntro } from "@/components/ui/PageEditorialIntro";
import { ServiceExperienceShowcase } from "@/components/services/ServiceExperienceShowcase";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { SignatureMark } from "@/components/ui/SignatureMark";
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

export default async function ServicesPage() {
  const categories = await getPublicPackageCategories();
  const serviceCategories = categories.filter((c) =>
    ["Portraits", "Families", "Events", "Headshots"].includes(c.category),
  );

  return (
    <>
      <PageEditorialIntro
        eyebrow="Investment"
        title="Sessions crafted like experiences — not transactions."
        description="Every package includes a private online gallery and Lulu's signature editing. Explore each session type, then begin your inquiry when you're ready."
        imageSrc={siteImages.servicesBanner}
        dark
      />

      <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <FadeIn className="mb-14">
          <PricingNotes />
        </FadeIn>

        <ServiceExperienceShowcase categories={serviceCategories} />

        <SignatureMark className="my-16" />

        <FadeIn className="mb-16">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] tracking-[0.28em] uppercase text-primary">
              Beyond the essentials
            </p>
            <h2 className="font-serif text-3xl font-light text-foreground">
              Weddings, brand, and more
            </h2>
          </div>
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
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
                className="group flex flex-col gap-3 py-8 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="max-w-xl">
                  <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                    {item.desc}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-primary">
                  View Packages <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mb-16 border-t border-foreground/10 pt-16">
          <p className="mb-8 text-[11px] tracking-[0.28em] uppercase text-primary">
            Customize your session
          </p>
          <h2 className="mb-8 font-serif text-3xl font-light text-foreground">
            Add-ons
          </h2>
          <FadeInStagger className="divide-y divide-foreground/10 border-y border-foreground/10">
            {addons.map((addon) => (
              <FadeInItem
                key={addon.name}
                className="flex items-center justify-between gap-4 py-5"
              >
                <span className="text-sm leading-snug text-foreground/75">
                  {addon.name}
                </span>
                <span className="font-serif text-lg text-primary shrink-0">
                  {addon.price}
                </span>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </FadeIn>

        <FadeIn className="border border-primary/20 bg-surface px-8 py-14 text-center lg:px-16">
          <h2 className="mb-4 font-serif text-3xl font-light text-foreground lg:text-4xl">
            Not sure which experience is right?
          </h2>
          <p className="mx-auto mb-8 max-w-md leading-relaxed text-foreground/58">
            Let&apos;s chat. Lulu will help you choose the perfect session — no
            pressure, just a friendly conversation.
          </p>
          <Button href="/contact">Begin your inquiry</Button>
        </FadeIn>
      </div>
    </>
  );
}
