"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteImages, siteImageFraming } from "@/data/portfolio";

const visualChapters = [
  {
    src: siteImages.weddingsDetail1,
    objectPosition: siteImageFraming.weddingsDetail1.objectPosition,
    caption: "Weddings",
    line: "The quiet glance before the vows.",
  },
  {
    src: "/site-images/portraits/DSC08765.jpg",
    objectPosition: "50% 18%",
    caption: "Portraits",
    line: "Flattering light, without posing you into someone else.",
  },
  {
    src: "/site-images/families/IMG_3649.jpg",
    objectPosition: "50% 18%",
    caption: "Families",
    line: "Everyone looking like themselves.",
  },
];

export function AboutVisualStory() {
  const reduced = useReducedMotion();

  return (
    <Section tone="surface" bordered>
      <SectionHeading
        eyebrow="The work"
        title="What I shoot most."
        action={
          <Button href="/portfolio" variant="link">
            Full portfolio
          </Button>
        }
      />
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
        {visualChapters.map((chapter, i) => (
          <motion.figure
            key={chapter.caption}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-card">
              <PhotoImage
                src={chapter.src}
                alt={`${chapter.caption} photography by CapturedByLulu`}
                fill
                objectPosition={chapter.objectPosition}
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <figcaption className="mt-5">
              <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-primary">
                {chapter.caption}
              </p>
              <p className="mt-2 font-serif text-lg font-light leading-snug text-foreground/75">
                {chapter.line}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
