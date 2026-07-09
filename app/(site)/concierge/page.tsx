import type { Metadata } from "next";
import { CaptureConcierge } from "@/components/concierge/CaptureConcierge";
import { ConciergePageHero } from "@/components/concierge/ConciergePageHero";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { siteImages } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Capture Concierge — Find Your Package",
  description:
    "Not sure which photography package is right for you? Let Lulu guide you through a personalized consultation and receive a recommendation tailored to your vision.",
  path: "/concierge",
  image: siteImages.servicesBanner,
});

export default function ConciergePage() {
  return (
    <div className="concierge-page-bg relative min-h-screen overflow-hidden">
      <FilmGrain opacity={0.025} className="z-0" />

      <ConciergePageHero />

      <section className="relative z-10 px-5 pb-28 pt-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <CaptureConcierge />
        </div>
      </section>
    </div>
  );
}
