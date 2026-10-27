import type { Metadata } from "next";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { siteConfig } from "@/data/site";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { luluPortrait } from "@/data/lulu";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateCTA } from "@/components/ui/EstimateCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AboutStoryChapters } from "@/components/about/AboutStoryChapters";
import { AboutVisualStory } from "@/components/about/AboutVisualStory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Meet Lulu, the Texas-based photographer behind CapturedByLulu. Weddings, portraits, families, and events.",
  path: "/about",
  image: siteImages.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        tagline="Photographer based in Texas."
        title="Hi, I'm Lulu."
        description="I photograph weddings, portraits, families, and events across Texas, and I travel when a shoot calls for it."
        primaryCta={{ label: "Get an estimate", href: "/contact" }}
        secondaryCta={{ label: "See the work", href: "/portfolio" }}
      />

      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="curtain relative aspect-[4/5] bg-bone lg:col-span-6">
            <PhotoImage
              src={siteImages.about}
              alt={luluPortrait.alt}
              fill
              objectPosition={siteImageFraming.about.objectPosition}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <FadeIn delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              eyebrow="Working together"
              title="You work with me, start to finish."
            />
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              There&apos;s no team handing you off. I answer your estimate
              request, plan the shoot with you, take the photos, and edit every
              gallery myself.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Nothing is booked online. We agree on the details by email first,
              so there are no surprises.
            </p>
            <div className="mt-8">
              <Button href={siteConfig.instagramUrl} external variant="link">
                Follow {siteConfig.instagram}
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <AboutVisualStory />
      <AboutStoryChapters />
      <EstimateCTA />
    </>
  );
}
