import type { Metadata } from "next";
import {
  HomeHero,
  StoryBridge,
  TrustBar,
  AboutTeaser,
  TestimonialsSection,
  ServicesTeaser,
  InstagramSection,
  HomeCTA,
} from "@/components/home/HomeSections";
import { getFeaturedTestimonials } from "@/lib/cms/testimonials";
import { getPublicContent } from "@/lib/cms/site";
import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/data/portfolio";

export const metadata: Metadata = pageMetadata({
  title: "Luxury Photography in San Antonio",
  description:
    "Luxury photography for weddings, portraits, families, and events in San Antonio, Texas. Cinematic, editorial imagery by Lulu at CapturedByLulu.",
  path: "/",
  image: siteImages.hero,
});

export default async function HomePage() {
  const [testimonials, heroContent, ctaContent] = await Promise.all([
    getFeaturedTestimonials(),
    getPublicContent("hero", {
      eyebrow: "San Antonio, Texas",
      title: "Photographs that breathe with emotion",
      subtitle:
        "Luxury photography for weddings, portraits, families, and events. Every frame is crafted to tell your story.",
    }),
    getPublicContent("cta", {
      eyebrow: "Let's Create Together",
      title: "Ready to tell your story?",
      description:
        "Reach out to check availability, ask a question, or start planning your session with Lulu.",
      ctaLabel: "Book a Session",
    }),
  ]);

  return (
    <>
      <HomeHero content={heroContent} />
      <StoryBridge />
      <TrustBar />
      <ServicesTeaser />
      <AboutTeaser />
      <TestimonialsSection testimonials={testimonials} />
      <InstagramSection />
      <HomeCTA content={ctaContent} />
    </>
  );
}
