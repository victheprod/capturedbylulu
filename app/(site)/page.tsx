import type { Metadata } from "next";
import { CinematicHero } from "@/components/home/CinematicHero";
import { PhilosophyInterlude } from "@/components/home/PhilosophyInterlude";
import { EditorialTrustStrip } from "@/components/home/EditorialTrustStrip";
import { GalleryPassage } from "@/components/home/GalleryPassage";
import { ServicesManifest } from "@/components/home/ServicesManifest";
import { AboutEditorial } from "@/components/home/AboutEditorial";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InstagramFilmStrip } from "@/components/home/InstagramFilmStrip";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { getFeaturedTestimonials } from "@/lib/cms/testimonials";
import { getPublicContent } from "@/lib/cms/site";
import { pageMetadata } from "@/lib/metadata";
import { siteBranding } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Texas-Based Luxury Photography",
  description:
    "Lulu photographs weddings, portraits, families, and events across Texas. See the work and request an estimate online.",
  path: "/",
  image: siteBranding.ogImage,
});

const HERO_SUBTITLE =
  "Lulu photographs weddings, portraits, families, and events across Texas, and travels when the shoot calls for it.";

function heroTitleFromContent(title?: string) {
  if (!title || title.toLowerCase().includes("breathe")) {
    return (
      <>
        Photos that look like you on your{" "}
        <em className="not-italic text-primary/90">best</em> day.
      </>
    );
  }
  return title;
}

function heroSubtitleFromContent(subtitle?: string) {
  if (!subtitle || subtitle.toLowerCase().includes("every frame is crafted")) {
    return HERO_SUBTITLE;
  }
  return subtitle;
}

export default async function HomePage() {
  const [testimonials, heroContent, ctaContent] = await Promise.all([
    getFeaturedTestimonials(),
    getPublicContent("hero", {
      eyebrow: "Photographer · Texas",
      title: "",
      subtitle: HERO_SUBTITLE,
    }),
    getPublicContent("cta", {
      eyebrow: "Estimates",
      title: "Tell Lulu what you're planning.",
      description:
        "Send the date, the place, and the idea. Lulu replies by email with a price, usually within a day or two. Nothing is booked until you both agree.",
      ctaLabel: "Get an estimate",
    }),
  ]);

  return (
    <>
      <CinematicHero
        eyebrow={heroContent?.eyebrow || "Photographer · Texas"}
        title={heroTitleFromContent(heroContent?.title)}
        subtitle={heroSubtitleFromContent(heroContent?.subtitle)}
      />
      <EditorialTrustStrip />
      <GalleryPassage />
      <PhilosophyInterlude />
      <ServicesManifest />
      <AboutEditorial />
      <TestimonialsSection testimonials={testimonials} />
      <InstagramFilmStrip />
      <EstimateCTA
        eyebrow={ctaContent?.eyebrow}
        title={ctaContent?.title}
        description={ctaContent?.description}
        ctaLabel={ctaContent?.ctaLabel}
      />
    </>
  );
}
