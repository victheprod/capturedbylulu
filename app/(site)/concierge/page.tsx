import type { Metadata } from "next";
import { CaptureConcierge } from "@/components/concierge/CaptureConcierge";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { siteImages } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Capture Concierge — Find Your Package",
  description:
    "Not sure which photography package is right for you? Take a brief guided consultation and receive a personalized recommendation from CapturedByLulu.",
  path: "/concierge",
  image: siteImages.servicesBanner,
});

export default function ConciergePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,169,106,0.06),transparent_55%)]" />
      <FilmGrain opacity={0.03} className="z-0" />

      <section className="relative z-10 px-6 pb-24 pt-28 lg:px-10 lg:pb-32 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <CaptureConcierge />
        </div>
      </section>
    </div>
  );
}
