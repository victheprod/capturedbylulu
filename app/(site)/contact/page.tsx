import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { pricingNotes } from "@/data/packages";
import { siteImages } from "@/data/portfolio";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BookingForm } from "@/components/ui/BookingForm";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactJourneyIntro } from "@/components/contact/ContactJourneyIntro";
import { formatTelHref } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSiteConfig } from "@/lib/cms/site";
import {
  getPublicBookingPackageGroups,
  getPublicPackageBookingValue,
  getPublicPackageEntryById,
} from "@/lib/cms/packages";
import { getPublicBlockedDates } from "@/lib/cms/availability";

export const metadata: Metadata = pageMetadata({
  title: "Book a Session",
  description:
    "Inquire about wedding, portrait, family, brand, or event photography with Lulu at CapturedByLulu.",
  path: "/contact",
  image: siteImages.contactBanner,
});

const nextSteps = [
  { n: "01", t: "Lulu responds personally within 24–48 hours" },
  { n: "02", t: "You connect for a quick discovery call" },
  { n: "03", t: "You receive a custom proposal" },
  { n: "04", t: "Sign, retainer, and your date is yours" },
];

type PageProps = {
  searchParams: Promise<{ package?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [site, packageGroups, blockedDates] = await Promise.all([
    getPublicSiteConfig(),
    getPublicBookingPackageGroups(),
    getPublicBlockedDates(),
  ]);

  let initialPackage: { sessionType: string; package: string } | undefined;
  if (params.package) {
    const entry = await getPublicPackageEntryById(params.package);
    if (entry) {
      initialPackage = {
        sessionType: entry.category,
        package: await getPublicPackageBookingValue(entry.category, entry.pkg),
      };
    }
  }

  return (
    <div>
      <ContactJourneyIntro />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <FadeIn className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-[11px] tracking-[0.28em] uppercase text-primary">
              Direct line to Lulu
            </p>
            <h2 className="font-serif text-3xl font-light text-foreground lg:text-4xl">
              Prefer to reach out directly?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              Share your vision — wedding date, session type, location, or
              anything else that helps Lulu understand what you&apos;re looking
              for.
            </p>

            <div className="mb-10 mt-10 space-y-5">
              {[
                {
                  icon: Mail,
                  label: site.email,
                  href: `mailto:${site.email}`,
                },
                {
                  icon: Phone,
                  label: site.phone,
                  href: formatTelHref(site.phone),
                },
                {
                  icon: InstagramIcon,
                  label: site.instagram,
                  href: site.instagramUrl,
                  external: true,
                },
                {
                  icon: MapPin,
                  label: pricingNotes.serviceArea,
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/35 text-primary">
                    <item.icon size={14} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="break-all text-sm text-foreground/65 transition-colors hover:text-foreground sm:break-normal"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground/65">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <PricingNotes className="mb-10" showDeposit={false} />

            <div className="border-t border-foreground/10 pt-10">
              <p className="mb-6 text-[11px] tracking-[0.22em] uppercase text-primary">
                What happens next
              </p>
              <div className="space-y-5">
                {nextSteps.map((step) => (
                  <div key={step.n} className="flex items-start gap-4">
                    <span className="font-serif text-xl font-light text-primary/50">
                      {step.n}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed text-foreground/58">
                      {step.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div className="border border-foreground/10 bg-card/30 p-6 sm:p-9 lg:p-10">
              <BookingForm
                packageGroups={packageGroups}
                blockedDates={blockedDates}
                initialPackage={initialPackage}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
