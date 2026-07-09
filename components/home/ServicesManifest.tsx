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
import { FadeIn } from "@/components/ui/FadeIn";
import { servicesTeaserImages } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ServicesManifest() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="mb-12 max-w-2xl lg:mb-16">
          <p className="mb-4 text-[11px] tracking-[0.32em] uppercase text-primary">
            Experiences
          </p>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] text-foreground">
            Four ways to be photographed —{" "}
            <span className="text-foreground/40">each with its own rhythm.</span>
          </h2>
        </FadeIn>

        {/* Mobile: uniform 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {servicesTeaserImages.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative aspect-[4/5] overflow-hidden bg-card"
            >
              <PhotoImage
                src={item.src}
                alt={`${item.label} photography by CapturedByLulu`}
                fill
                objectPosition={item.objectPosition}
                sizes="50vw"
                className="transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
              <p className="absolute right-0 bottom-0 left-0 p-4 font-serif text-lg text-foreground">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Desktop: editorial alternating rows */}
        <div className="hidden space-y-10 lg:block">
          {servicesTeaserImages.map((item, i) => (
            <ServiceRow key={item.label} item={item} index={i} />
          ))}
        </div>

        <FadeIn className="mt-12 flex flex-wrap items-center gap-8 lg:mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary"
          >
            View full pricing
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <span className="hidden h-px w-16 bg-foreground/15 lg:block" aria-hidden />
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.18em] uppercase text-foreground/45 transition-colors hover:text-foreground"
          >
            Not sure yet? Start a conversation →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function ServiceRow({
  item,
  index,
}: {
  item: (typeof servicesTeaserImages)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? ["-3%", "3%"] : ["3%", "-3%"],
  );

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        ref={ref}
        href={item.href}
        className={cn(
          "group relative grid grid-cols-12 items-center gap-10",
          !isEven && "[direction:rtl]",
        )}
      >
        <div
          className={cn(
            "service-row-image relative col-span-7 overflow-hidden bg-card",
            isEven ? "col-start-1" : "col-start-6 [direction:ltr]",
          )}
          style={
            {
              "--service-aspect": item.aspectRatio.replace("/", " / "),
            } as React.CSSProperties
          }
        >
          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { x: imageX }}
          >
            <PhotoImage
              src={item.src}
              alt={`${item.label} photography by CapturedByLulu`}
              fill
              objectPosition={item.objectPosition}
              sizes="55vw"
              className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div
          className={cn(
            "col-span-4 flex flex-col justify-center [direction:ltr]",
            isEven ? "col-start-9 pl-4" : "col-start-1 pr-4 text-right",
          )}
        >
          <span className="mb-3 font-serif text-6xl font-light text-foreground/10 transition-colors duration-500 group-hover:text-primary/25">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-4xl font-light text-foreground">
            {item.label}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/50">
            {descriptions[item.label] ??
              "Tailored sessions with Lulu's signature cinematic style."}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-primary opacity-0 transition-all duration-400 group-hover:opacity-100">
            Explore
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

const descriptions: Record<string, string> = {
  Weddings:
    "Intimate ceremonies to full-day celebrations — every glance, every vow.",
  Portraits:
    "Editorial headshots and personal portraits with depth and intention.",
  Families:
    "Warm, honest sessions that capture the way you actually love each other.",
  Events: "Milestone moments documented with energy and elegance.",
};
