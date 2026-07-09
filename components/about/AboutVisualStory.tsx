"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PhotoImage } from "@/components/ui/PhotoImage";
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
    line: "Light that flatters without posing you into someone else.",
  },
  {
    src: "/site-images/families/IMG_3649.jpg",
    objectPosition: "50% 18%",
    caption: "Families",
    line: "Love as it actually looks — not as a stock photo.",
  },
];

export function AboutVisualStory() {
  const reduced = useReducedMotion();

  return (
    <section className="overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-12 text-[11px] tracking-[0.32em] uppercase text-primary">
          The work speaks
        </p>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {visualChapters.map((chapter, i) => (
            <motion.figure
              key={chapter.caption}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
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
                <p className="text-[10px] tracking-[0.22em] uppercase text-primary">
                  {chapter.caption}
                </p>
                <p className="mt-2 font-serif text-lg font-light leading-snug text-foreground/75">
                  {chapter.line}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary"
          >
            Enter the full gallery
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
