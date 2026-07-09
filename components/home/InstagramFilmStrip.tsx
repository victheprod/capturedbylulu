"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/data/site";
import { homeInstagramStrip } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

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
    <section ref={ref} className="overflow-hidden border-y border-foreground/10 bg-surface py-20 lg:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-10">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-primary"
            >
              <InstagramIcon size={14} />
              {siteConfig.instagram}
            </a>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light text-foreground">
              Behind the lens, in real time
            </h2>
          </div>
          <Link
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-foreground/50 transition-colors hover:text-primary"
          >
            Follow on Instagram
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </div>

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
            <div className="absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
