import type { Metadata } from "next";
import { CinematicHero } from "@/components/home/CinematicHero";
import { PhilosophyInterlude } from "@/components/home/PhilosophyInterlude";
import { EditorialTrustStrip } from "@/components/home/EditorialTrustStrip";
import { GalleryPassage } from "@/components/home/GalleryPassage";
import { ServicesManifest } from "@/components/home/ServicesManifest";
import { AboutEditorial } from "@/components/home/AboutEditorial";
import { TestimonialsSection } from "@/components/home/HomeSections";
import { InstagramFilmStrip } from "@/components/home/InstagramFilmStrip";
import { LuxuryBookingCTA } from "@/components/home/LuxuryBookingCTA";
import { SignatureMark } from "@/components/ui/SignatureMark";
import { EditorialDivider } from "@/components/ui/EditorialDivider";
import { getFeaturedTestimonials } from "@/lib/cms/testimonials";
import { getPublicContent } from "@/lib/cms/site";
import { pageMetadata } from "@/lib/metadata";
import { siteBranding } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Texas-Based Luxury Photography",
  description:
    "Texas-based luxury photography for weddings, portraits, families, and events. Cinematic, editorial imagery by Lulu at CapturedByLulu.",
  path: "/",
  image: siteBranding.ogImage,
});

function heroTitleFromContent(title?: string) {
  if (!title || title.toLowerCase().includes("breathe")) {
    return (
      <>
        Photographs that{" "}
        <em className="not-italic text-primary/90">breathe</em> with emotion
      </>
    );
  }
  return title;
}

export default async function HomePage() {
  const [testimonials, heroContent, ctaContent] = await Promise.all([
    getFeaturedTestimonials(),
    getPublicContent("hero", {
      eyebrow: "Texas Based",
      title: "Photographs that breathe with emotion",
      subtitle:
        "Luxury photography for weddings, portraits, families, and events. Every frame is crafted to tell your story.",
    }),
    getPublicContent("cta", {
      eyebrow: "Begin the experience",
      title: "Your story deserves more than a form.",
      description:
        "Tell Lulu what you're dreaming of — weddings, portraits, families, or events. Every inquiry is read personally, and you'll hear back within 24–48 hours.",
      ctaLabel: "Start your inquiry",
    }),
  ]);

  return (
    <>
      <CinematicHero
        eyebrow={heroContent?.eyebrow ?? "Texas Based"}
        title={heroTitleFromContent(heroContent?.title)}
        subtitle={
          heroContent?.subtitle ??
          "Luxury photography for weddings, portraits, families, and events. Every frame is crafted to tell your story."
        }
      />
      <PhilosophyInterlude />
      <SignatureMark />
      <EditorialTrustStrip />
      <EditorialDivider className="py-0" />
      <GalleryPassage />
      <EditorialDivider className="py-12" />
      <ServicesManifest />
      <AboutEditorial />
      <EditorialDivider tone="inverted" className="py-8" />
      <TestimonialsSection testimonials={testimonials} />
      <InstagramFilmStrip />
      <LuxuryBookingCTA
        eyebrow={ctaContent?.eyebrow}
        title={ctaContent?.title}
        description={ctaContent?.description}
        ctaLabel={ctaContent?.ctaLabel}
      />
    </>
  );
}
