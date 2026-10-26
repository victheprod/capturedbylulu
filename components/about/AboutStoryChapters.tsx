"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteImages, siteImageFraming } from "@/data/portfolio";

const chapters = [
  {
    title: "I watch more than I pose",
    body: "Most of my favorite photos happen between the planned shots: a laugh, a look, someone fixing a collar.",
  },
  {
    title: "I direct when it helps",
    body: "If you're not sure what to do with your hands, I'll tell you. Nobody has to pretend to be a model.",
  },
  {
    title: "I get to know you first",
    body: "A quick conversation before the shoot makes the photos better. You'll be more relaxed, and I'll know what matters to you.",
  },
];

export function AboutStoryChapters() {
  const reduced = useReducedMotion();

  return (
    <Section>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative aspect-[3/4] overflow-hidden bg-card lg:sticky lg:top-28 lg:self-start">
          <PhotoImage
            src={siteImages.brandDetail}
            alt="Portrait photography by CapturedByLulu"
            fill
            objectPosition={siteImageFraming.brandDetail.objectPosition}
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>

        <div>
          <SectionHeading eyebrow="How I work" title="Three things I keep in mind." />
          <div className="mt-12 space-y-10">
            {chapters.map((chapter, i) => (
              <motion.article
                key={chapter.title}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-foreground/10 pt-8"
              >
                <h3 className="font-serif text-2xl font-light text-foreground">
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/60">
                  {chapter.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
