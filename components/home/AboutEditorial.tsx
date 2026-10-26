"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/site";
import { siteImages, siteImageFraming } from "@/data/portfolio";
import { luluPortrait } from "@/data/lulu";

export function AboutEditorial() {
  return (
    <Section tone="surface" bordered>
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <FadeIn className="lg:col-span-6">
          <div className="relative aspect-[4/5] max-w-lg overflow-hidden bg-card lg:max-w-none">
            <PhotoImage
              src={siteImages.lulu}
              alt={luluPortrait.alt}
              fill
              objectPosition={siteImageFraming.lulu.objectPosition}
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <SectionHeading eyebrow="About" title="Hi, I'm Lulu." />
          <p className="mt-6 text-[0.95rem] leading-relaxed text-foreground/60">
            I run CapturedByLulu out of Texas. I photograph weddings, portraits,
            families, and events here, and I travel when a shoot calls for it.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground/60">
            You&apos;ll deal with me from the first message to the final
            gallery. New work goes up on Instagram at{" "}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-foreground"
            >
              {siteConfig.instagram}
            </a>
            .
          </p>
          <div className="mt-9">
            <Button href="/about" variant="link">
              More about Lulu
            </Button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
