import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { pricingNotes } from "@/data/packages";
import { siteImages } from "@/data/portfolio";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BookingForm } from "@/components/ui/BookingForm";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
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
  title: "Get an Estimate",
  description:
    "Request a photography estimate or custom quotation for weddings, portraits, families, events, and more. Lulu finalizes every booking by email.",
  path: "/contact",
  image: siteImages.contactBanner,
});

const journeySteps = [
  "You send the details here",
  "Lulu replies with a price, usually within a day or two",
  "You agree on the final quote and date by email",
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
    <>
      <PageHeader
        eyebrow="Estimates"
        tagline="Custom quotes for any event, too."
        title="Get an estimate."
        description="Tell Lulu about the shoot: what it is, when, and where. The form goes straight to his inbox. Nothing is booked until you both agree."
      />
      <Section className="border-t border-foreground/10 pt-14 lg:pt-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FadeIn className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="mb-6">How it works</Eyebrow>
            <ol className="space-y-4">
              {journeySteps.map((step, i) => (
                <li key={step} className="flex items-baseline gap-4 text-sm text-foreground/70">
                  <span className="text-primary/80">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>

            <Eyebrow className="mt-12 mb-6">Other ways to reach Lulu</Eyebrow>
            <div className="mb-10 space-y-4">
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
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon size={14} className="shrink-0 text-primary" />
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

            <PricingNotes showDeposit={false} />
          </FadeIn>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div className="border border-foreground/10 bg-card p-6 sm:p-9 lg:p-10">
              <BookingForm
                packageGroups={packageGroups}
                blockedDates={blockedDates}
                initialPackage={initialPackage}
              />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
