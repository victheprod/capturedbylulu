"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/site";
import { homeInstagramStrip } from "@/data/portfolio";

export function InstagramFilmStrip() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const photos = homeInstagramStrip;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const stripX = useTransform(scrollYProgress, [0, 1], ["2%", "-8%"]);

  return (
    <section
      ref={ref}
      className="overflow-hidden border-t border-foreground/10 py-20 lg:py-28"
    >
      <FadeIn className="mx-auto mb-12 max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={siteConfig.instagram}
          title="More on Instagram"
          action={
            <Button href={siteConfig.instagramUrl} external variant="link">
              Follow along
            </Button>
          }
        />
      </FadeIn>

      <motion.div
        className="flex gap-3 px-6 lg:gap-4 lg:px-10"
        style={reduced ? undefined : { x: stripX }}
      >
        {photos.map(({ src, objectPosition }, i) => (
          <a
            key={src}
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 overflow-hidden bg-card"
            style={{
              width: i % 3 === 0 ? "min(42vw, 320px)" : "min(32vw, 240px)",
              aspectRatio: i % 3 === 0 ? "3/4" : "4/5",
            }}
          >
            <PhotoImage
              src={src}
              alt="Photography by CapturedByLulu on Instagram"
              fill
              objectPosition={objectPosition}
              sizes="320px"
              className="transition-transform duration-700 group-hover:scale-105"
            />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
