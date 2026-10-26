"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { siteImages, siteImageFraming } from "@/data/portfolio";

export function PhilosophyInterlude() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-foreground/10 bg-[#14110e]"
      aria-labelledby="philosophy-heading"
    >
      <div className="absolute inset-0">
        <PhotoImage
          src={siteImages.aboutTeaser}
          alt=""
          fill
          objectPosition={siteImageFraming.aboutTeaser.objectPosition}
          sizes="100vw"
          className="opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#14110e]/70 via-[#14110e]/50 to-[#14110e]/80" />
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center lg:px-10 lg:py-40"
      >
        <Eyebrow className="mb-6">A note from Lulu</Eyebrow>
        <blockquote
          id="philosophy-heading"
          className="text-balance font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] font-light leading-[1.2] text-foreground"
        >
          &ldquo;I&apos;ll direct you when you need it and stay out of the way
          when you don&apos;t. Most of the good ones happen{" "}
          <span className="text-primary">in between</span>.&rdquo;
        </blockquote>
        <p className="mt-8 font-serif text-lg italic text-foreground/45">Lulu</p>
      </motion.div>
    </section>
  );
}
