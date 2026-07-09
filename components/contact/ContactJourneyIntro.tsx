"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FilmGrain } from "@/components/ui/FilmGrain";

const journeySteps = [
  { n: "01", label: "Choose your experience" },
  { n: "02", label: "Share your vision" },
  { n: "03", label: "Review & confirm" },
];

export function ContactJourneyIntro() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#14110e] px-6 py-20 lg:px-10 lg:py-28">
      <FilmGrain opacity={0.04} className="z-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-5 text-[11px] tracking-[0.32em] uppercase text-primary">
              Your booking journey
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-foreground">
              Let&apos;s begin something{" "}
              <span className="text-foreground/45">beautiful.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/55 lg:text-base">
              This isn&apos;t a generic contact form — it&apos;s the first step of
              planning your session with Lulu. Take your time; every inquiry is
              read personally.
            </p>
          </div>

          <ol className="space-y-6 border-t border-foreground/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {journeySteps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-baseline gap-5"
              >
                <span className="font-serif text-2xl font-light text-primary/50">
                  {step.n}
                </span>
                <span className="text-sm tracking-wide text-foreground/70">
                  {step.label}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase text-foreground/35"
        >
          <span>Scroll to continue</span>
          <ArrowRight size={12} />
        </motion.div>
      </div>
    </section>
  );
}
