"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { siteConfig } from "@/data/site";
import { siteImages, siteImageFraming } from "@/data/portfolio";

export function AboutEditorial() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-28 lg:py-40"
      aria-labelledby="about-editorial-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="relative lg:col-span-7 lg:col-start-1">
          <motion.div
            className="relative aspect-[4/5] max-w-lg overflow-hidden bg-card lg:max-w-none"
            style={reduced ? undefined : { y: imageY }}
          >
            <PhotoImage
              src={siteImages.weddingsDetail2}
              alt="Wedding photography by CapturedByLulu"
              fill
              objectPosition={siteImageFraming.weddingsDetail2.objectPosition}
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -right-2 z-10 max-w-[220px] border border-foreground/10 bg-background/90 p-5 backdrop-blur-sm sm:-right-8 lg:-bottom-10 lg:-right-12"
            style={reduced ? undefined : { y: floatY }}
          >
            <p className="font-serif text-4xl font-light text-primary">TX</p>
            <p className="mt-1 text-[10px] tracking-[0.18em] uppercase text-foreground/45">
              Texas Based · Available for travel
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:-mt-16">
          <p className="mb-5 text-[11px] tracking-[0.32em] uppercase text-primary">
            About Lulu
          </p>
          <h2
            id="about-editorial-heading"
            className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.1] text-foreground"
          >
            A photographer who sees what others feel
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-foreground/58 lg:text-[0.95rem]">
            CapturedByLulu is Lulu&apos;s Texas-based studio — weddings, portraits,
            families, and events across Texas and beyond. Cinematic, editorial,
            and deeply personal.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/58 lg:text-[0.95rem]">
            Follow along at{" "}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-foreground"
            >
              {siteConfig.instagram}
            </a>{" "}
            or read the full story.
          </p>
          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary"
          >
            Read my story
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
