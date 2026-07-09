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

const chapters = [
  {
    num: "01",
    title: "Documentary at heart",
    body: "Real moments matter. I watch for the in-between — laughter, glances, and the details you will want to remember.",
  },
  {
    num: "02",
    title: "Editorial in eye",
    body: "Every frame is composed with intention — light, color, and story working together like a magazine spread.",
  },
  {
    num: "03",
    title: "Relational in practice",
    body: "The best images come from trust. I take time to understand you before we ever pick up a camera.",
  },
];

export function AboutStoryChapters() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section ref={ref} className="relative bg-[#14110e] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <div className="relative lg:sticky lg:top-28 lg:self-start">
          <motion.div
            className="relative aspect-[3/4] overflow-hidden"
            style={reduced ? undefined : { scale: imageScale }}
          >
            <PhotoImage
              src={siteImages.brandDetail}
              alt="Portrait photography by CapturedByLulu"
              fill
              objectPosition={siteImageFraming.brandDetail.objectPosition}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110e]/60 via-transparent to-transparent" />
            <FilmGrain opacity={0.035} />
          </motion.div>
        </div>

        <div className="space-y-20 lg:pt-8">
          {chapters.map((chapter, i) => (
            <motion.article
              key={chapter.num}
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.85,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-foreground/10 pt-10 first:border-t-0 first:pt-0"
            >
              <span className="font-serif text-5xl font-light text-primary/30">
                {chapter.num}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-light text-foreground">
                {chapter.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/55">
                {chapter.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
