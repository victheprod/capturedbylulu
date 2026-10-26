"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
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

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

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
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const motionProps = (delay: number) => (reduced ? {} : fadeUp(delay));

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background lg:block"
    >
      <motion.div
        className="relative h-[55dvh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[58%]"
        style={reduced ? undefined : { y: imageY }}
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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/20 lg:to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-16 lg:min-h-[100dvh] lg:justify-center lg:px-10 lg:pb-0">
        <div className="max-w-xl">
          <motion.div {...motionProps(0.1)}>
            <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            {...motionProps(0.2)}
            className="text-balance font-serif text-[clamp(2.75rem,7vw,5.25rem)] font-light leading-[1] tracking-[-0.02em] text-foreground"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              {...motionProps(0.35)}
              className="mt-7 max-w-md text-base leading-relaxed text-foreground/60 lg:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            {...motionProps(0.45)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Button href={primaryHref} arrow>
              Get an estimate
            </Button>
            <Button href={secondaryHref} variant="outline">
              See the work
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
