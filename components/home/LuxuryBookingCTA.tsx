"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { SectionBlend } from "@/components/ui/SectionBlend";
import { siteImages, siteImageFraming } from "@/data/portfolio";

type LuxuryBookingCTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
};

export function LuxuryBookingCTA({
  eyebrow = "Begin the experience",
  title = "Your story deserves more than a form.",
  description = "Tell Lulu what you're dreaming of — weddings, portraits, families, or events. Every inquiry is read personally, and you'll hear back within 24–48 hours.",
  ctaLabel = "Start your inquiry",
  ctaHref = "/contact",
  imageSrc = siteImages.cta,
}: LuxuryBookingCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className="relative -mt-8 overflow-hidden bg-[#14110e] lg:-mt-12"
      aria-labelledby="booking-cta-heading"
    >
      <SectionBlend position="top" tone="background" size="lg" />
      <div className="grid min-h-[85dvh] grid-cols-1 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 py-20 lg:px-14 lg:py-28 xl:px-20">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-[11px] tracking-[0.32em] uppercase text-primary"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            id="booking-cta-heading"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.08] text-foreground"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-foreground/55 lg:text-base"
          >
            {description}
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-10"
          >
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-3 bg-primary px-9 py-4 text-[11px] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-[#d4b87a]"
            >
              {ctaLabel}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <div className="relative min-h-[45dvh] lg:min-h-0">
          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { scale: imageScale, y: imageY }}
          >
            <PhotoImage
              src={imageSrc}
              alt=""
              fill
              objectPosition={siteImageFraming.cta?.objectPosition ?? "50% 40%"}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="opacity-90"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#14110e] via-[#14110e]/40 to-transparent lg:via-transparent" />
          <FilmGrain opacity={0.04} />
        </div>
      </div>
    </section>
  );
}
