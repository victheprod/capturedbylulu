import type { Metadata } from "next";
import { BuildYourVision } from "@/components/vision/BuildYourVision";
import { VisionProvider } from "@/components/vision/VisionContext";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { siteImages } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Build Your Vision — Style Discovery",
  description:
    "Discover your photography style through an immersive mood board experience. Curate inspiration, shape your dream session, and receive a personalized package recommendation from CapturedByLulu.",
  path: "/vision",
  image: siteImages.servicesBanner,
});

export default function VisionPage() {
  return (
    <div className="vision-page-bg relative min-h-screen overflow-hidden">
      <FilmGrain opacity={0.025} className="z-0" />

      <section className="relative z-10 px-5 pb-32 pt-28 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          <VisionProvider>
            <BuildYourVision />
          </VisionProvider>
        </div>
      </section>
    </div>
  );
}
