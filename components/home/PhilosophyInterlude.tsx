"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { siteImages, siteImageFraming } from "@/data/portfolio";

export function PhilosophyInterlude() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.75, 0.9], [0, 1, 1, 0.4]);
  const quoteY = useTransform(scrollYProgress, [0.15, 0.4], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[115dvh] overflow-hidden bg-[#14110e]"
      aria-labelledby="philosophy-heading"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: imageY }}
      >
        <PhotoImage
          src={siteImages.aboutTeaser}
          alt=""
          fill
          objectPosition={siteImageFraming.aboutTeaser.objectPosition}
          sizes="100vw"
          className="scale-105 opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-background" />
        <FilmGrain opacity={0.05} />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[115dvh] max-w-5xl flex-col items-center justify-center px-6 py-32 text-center lg:px-10">
        <motion.p
          style={reduced ? undefined : { opacity: quoteOpacity, y: quoteY }}
          className="mb-6 text-[11px] tracking-[0.35em] uppercase text-primary"
        >
          A note from Lulu
        </motion.p>
        <motion.blockquote
          id="philosophy-heading"
          style={reduced ? undefined : { opacity: quoteOpacity, y: quoteY }}
          className="font-serif text-[clamp(1.75rem,5vw,3.5rem)] font-light leading-[1.2] tracking-[-0.01em] text-foreground"
        >
          &ldquo;The best photographs aren&apos;t taken — they&apos;re{" "}
          <span className="text-primary/90">felt</span>. I create space for the
          quiet moments that become your most treasured memories.&rdquo;
        </motion.blockquote>
        <motion.p
          style={reduced ? undefined : { opacity: quoteOpacity }}
          className="mt-10 text-[11px] tracking-[0.22em] uppercase text-foreground/40"
        >
          — Lulu · CapturedByLulu
        </motion.p>
      </div>
    </section>
  );
}
