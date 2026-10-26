"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { SectionBlend } from "@/components/ui/SectionBlend";
import { siteBranding } from "@/data/site";
import { siteImages } from "@/data/portfolio";
import { framingForSrc } from "@/lib/photo-framing";

type CinematicHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export function CinematicHero({
  eyebrow = siteBranding.eyebrow,
  title,
  subtitle,
  imageSrc = siteImages.hero,
  primaryHref = "/contact",
  secondaryHref = "/portfolio",
}: CinematicHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const framing = framingForSrc(imageSrc);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative z-10 min-h-[100dvh] overflow-hidden bg-background"
    >
      <div className="absolute inset-0 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <motion.div
          className="relative h-[52dvh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[58%]"
          style={reduced ? undefined : { scale: imageScale, y: imageY }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhotoImage
            src={imageSrc}
            alt="Portrait session photographed by Lulu"
            fill
            priority
            objectPosition={framing.objectPosition}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-l lg:from-background lg:via-background/35 lg:to-transparent" />
          <FilmGrain opacity={0.035} />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end px-6 pb-16 pt-10 lg:justify-center lg:px-10 lg:pb-24 lg:pt-28"
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-xl lg:max-w-2xl">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.32em] uppercase text-primary"
            >
              <span className="h-px w-10 bg-primary/70" aria-hidden />
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2.85rem,8vw,5.75rem)] font-light leading-[0.98] tracking-[-0.02em] text-foreground"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 max-w-md text-base leading-relaxed text-foreground/60 lg:text-lg"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={primaryHref}
                className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a]"
              >
                Get an Estimate
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center border border-foreground/20 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                See the work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <SectionBlend position="bottom" tone="deep" size="xl" className="z-[2]" />
    </section>
  );
}
