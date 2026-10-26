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
  title: "Get an Estimate",
  description:
    "Request a photography estimate or custom quotation for weddings, portraits, families, events, and more. Lulu finalizes every booking by email.",
  path: "/contact",
  image: siteImages.contactBanner,
});

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
            <h2 className="font-serif text-3xl font-light text-foreground lg:text-4xl">
              The form goes straight to Lulu.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              No email app needed. Fill it out here and Lulu gets your request
              in his inbox, then replies with a quote, usually within a day or
              two. If you&apos;d rather text or DM, that works too.
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

            <PricingNotes showDeposit={false} />
          </FadeIn>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div className="glass-panel p-6 sm:p-9 lg:p-10">
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
