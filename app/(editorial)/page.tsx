import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { DisciplineMarquee } from "@/components/home/DisciplineMarquee";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { ExperienceRooms } from "@/components/home/ExperienceRooms";
import { MeetLulu } from "@/components/home/MeetLulu";
import { GuestBook } from "@/components/home/GuestBook";
import { EstimateClose } from "@/components/home/EstimateClose";
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

const HERO_EYEBROW = "Exhibition No. 01 / Texas";
const HERO_SUBTITLE =
  "Personal, confident photographs for the moments you will want to remember exactly right. Directed with care, never stiff, always yours.";
const CLOSE_EYEBROW = "Final room / Your estimate";
const CLOSE_CTA = "Request an estimate";

/** Copy saved by earlier homepage designs; ignored so the new defaults apply. */
const legacyCopy = [
  "breathe",
  "every frame is crafted",
  "photos that look like you",
  "photographer · texas",
  "tell lulu what you're planning",
  "get an estimate",
  "estimates",
];

function cmsOverride(value?: string) {
  const text = value?.trim();
  if (!text) return undefined;
  const lower = text.toLowerCase();
  return legacyCopy.some((legacy) => lower.includes(legacy)) ? undefined : text;
}

export default async function HomePage() {
  const [testimonials, heroContent, ctaContent] = await Promise.all([
    getFeaturedTestimonials(),
    getPublicContent("hero", { eyebrow: "", title: "", subtitle: "" }),
    getPublicContent("cta", { eyebrow: "", title: "", ctaLabel: "" }),
  ]);

  return (
    <>
      <HomeHero
        eyebrow={cmsOverride(heroContent?.eyebrow) ?? HERO_EYEBROW}
        title={cmsOverride(heroContent?.title)}
        subtitle={cmsOverride(heroContent?.subtitle) ?? HERO_SUBTITLE}
      />
      <DisciplineMarquee />
      <SelectedWorks />
      <ExperienceRooms />
      <MeetLulu />
      <GuestBook testimonials={testimonials} />
      <EstimateClose
        eyebrow={cmsOverride(ctaContent?.eyebrow) ?? CLOSE_EYEBROW}
        title={cmsOverride(ctaContent?.title)}
        ctaLabel={cmsOverride(ctaContent?.ctaLabel) ?? CLOSE_CTA}
      />
    </>
  );
}
