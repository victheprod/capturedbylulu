"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { servicesTeaserImages } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const details: Record<string, { tag: string; description: string; href: string }> = {
  Weddings: {
    tag: "Ceremonies to receptions",
    description:
      "Courthouse vows to full-day celebrations, with coverage sized to your day. Pre-wedding sessions available.",
    href: "/weddings",
  },
  Portraits: {
    tag: "Headshots, birthdays, grads",
    description:
      "Headshots, birthdays, graduations, and personal shoots. Lulu directs, so you're never guessing what to do with your hands.",
    href: "/services",
  },
  Families: {
    tag: "All ages welcome",
    description:
      "Relaxed sessions for the whole crew, kids and grandparents included. Indoors, outdoors, or at home.",
    href: "/services",
  },
  Events: {
    tag: "Parties and corporate",
    description:
      "Birthdays, parties, and corporate events, covered start to finish. Custom quotes for anything bigger.",
    href: "/services",
  },
};

/** Accordion service list, adapted from 21st.dev "Editorial service list". */
export function ServicesManifest() {
  const [expanded, setExpanded] = useState(0);
  const id = useId();

  return (
    <Section>
      <FadeIn>
        <SectionHeading
          eyebrow="Services"
          title="What Lulu shoots."
          description="Open a category for a quick look, or go straight to pricing."
          action={
            <Button href="/services" variant="link">
              Full pricing
            </Button>
          }
        />
      </FadeIn>

      <div className="mt-12 border-b border-foreground/10">
        {servicesTeaserImages.map((service, i) => {
          const open = expanded === i;
          const info = details[service.label];
          return (
            <div key={service.label} className="border-t border-foreground/10">
              <button
                type="button"
                id={`${id}-button-${i}`}
                aria-expanded={open}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setExpanded(open ? -1 : i)}
                className="group flex w-full items-center gap-6 py-6 text-left lg:py-7"
              >
                <span
                  className={cn(
                    "font-serif text-3xl font-light transition-all duration-300 lg:text-5xl",
                    open
                      ? "translate-x-2 text-primary"
                      : "text-foreground group-hover:translate-x-2",
                  )}
                >
                  {service.label}
                </span>
                <span className="ml-auto hidden text-sm text-foreground/45 sm:inline">
                  {info?.tag}
                </span>
                <ChevronRight
                  size={18}
                  aria-hidden
                  className={cn(
                    "shrink-0 text-foreground/40 transition-transform duration-300 group-hover:text-foreground sm:ml-0",
                    open && "rotate-90 text-primary",
                  )}
                />
              </button>

              <div
                id={`${id}-panel-${i}`}
                role="region"
                aria-labelledby={`${id}-button-${i}`}
                inert={!open}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 gap-6 pb-8 sm:grid-cols-[1.4fr_1fr] sm:gap-10 lg:pb-10">
                    <div className="relative aspect-[16/10] overflow-hidden bg-card">
                      <PhotoImage
                        src={service.src}
                        alt={`${service.label} photography by CapturedByLulu`}
                        fill
                        objectPosition={service.objectPosition}
                        sizes="(max-width: 640px) 100vw, 55vw"
                      />
                    </div>
                    <div className="flex flex-col justify-end gap-6">
                      <p className="max-w-sm text-[0.95rem] leading-relaxed text-foreground/60">
                        {info?.description}
                      </p>
                      <Button href={info?.href ?? service.href} variant="link">
                        See packages
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <FadeIn className="mt-10">
        <Link
          href="/contact?quote=custom"
          className="text-sm text-foreground/60 underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
        >
          Planning something that isn&apos;t listed? Ask for a custom quote.
        </Link>
      </FadeIn>
    </Section>
  );
}
