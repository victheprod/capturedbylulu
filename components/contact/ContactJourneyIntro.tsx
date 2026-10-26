"use client";

import { motion, useReducedMotion } from "framer-motion";

const journeySteps = [
  "You send the details here",
  "Lulu replies with a price, usually within a day or two",
  "You agree on the final quote and date by email",
];

export function ContactJourneyIntro() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#14110e] px-6 py-20 lg:px-10 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-5 text-[11px] tracking-[0.32em] uppercase text-primary">
              Estimates & custom quotes
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-foreground">
              Get an estimate.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/55 lg:text-base">
              Tell Lulu about the shoot: what it is, when, and where. If
              it&apos;s not on the price list, ask for a custom quote. Nothing is
              booked until you both agree.
            </p>
          </div>

          <ol className="space-y-5 border-t border-foreground/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {journeySteps.map((step, i) => (
              <motion.li
                key={step}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-baseline gap-4"
              >
                <span className="text-sm text-primary/70">{i + 1}.</span>
                <span className="text-sm text-foreground/70">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
