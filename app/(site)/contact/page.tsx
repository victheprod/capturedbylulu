import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { pricingNotes } from "@/data/packages";
import { siteConfig } from "@/data/site";
import { siteImages } from "@/data/portfolio";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BookingForm } from "@/components/ui/BookingForm";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeroBanner } from "@/components/ui/Hero";
import { PageHeading } from "@/components/ui/SectionHeading";
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
    "Inquire about wedding, portrait, family, brand, or event photography with Lulu at CapturedByLulu in San Antonio.",
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
      <PageHeroBanner
        eyebrow="Book a Session"
        title="Let's create something beautiful"
        description="Fill out the form and Lulu will be in touch within 24–48 hours. Every inquiry is read personally."
        imageSrc={siteImages.contactBanner}
      />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeIn className="order-2 lg:order-1">
            <PageHeading
              eyebrow="Get in Touch"
              title="Start your inquiry"
              description="Share your vision — wedding date, session type, location, or anything else that helps Lulu understand what you're looking for."
            />

            <div className="mb-8 mt-10 space-y-4">
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
                <div key={item.label} className="flex items-center gap-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary/40 text-primary">
                    <item.icon size={13} />
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

            <PricingNotes className="mb-8" showDeposit={false} />

            <div className="border border-foreground/10 bg-card p-7">
              <p className="mb-5 text-[11px] tracking-[0.2em] uppercase text-primary">
                What Happens Next
              </p>
              <div className="space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.n} className="flex items-center gap-3.5">
                    <span className="w-6 shrink-0 text-[11px] tracking-wider text-primary">
                      {step.n}
                    </span>
                    <span className="text-sm text-foreground/58">{step.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div className="border border-foreground/10 bg-card/40 p-6 sm:p-8">
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
