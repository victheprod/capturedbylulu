"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Package, PackageCategory } from "@/data/packages";
import { getContactHref } from "@/data/packages";
import { cn } from "@/lib/utils";

const categoryStories: Record<string, { headline: string; story: string }> = {
  Portraits:
    {
      headline: "Portraits that feel like you — not a stock photo.",
      story:
        "Editorial framing, natural direction, and light that flatters without feeling staged. From mini sessions to full creative portraits.",
    },
  Families:
    {
      headline: "The way you actually love each other.",
      story:
        "Warm, honest family sessions built around connection — not forced poses. Laughter, chaos, and the quiet moments in between.",
    },
  Events:
    {
      headline: "Milestone moments, documented with energy.",
      story:
        "Birthdays, celebrations, and gatherings captured with cinematic presence — every toast, dance, and detail worth remembering.",
    },
  Headshots:
    {
      headline: "Confidence you can see.",
      story:
        "Professional headshots and brand-ready portraits with editorial polish — for LinkedIn, teams, and entrepreneurs who want to stand out.",
    },
};

type ServiceExperienceShowcaseProps = {
  categories: PackageCategory[];
};

export function ServiceExperienceShowcase({
  categories,
}: ServiceExperienceShowcaseProps) {
  const [openId, setOpenId] = useState(categories[0]?.id ?? "");
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {categories.map((category, index) => {
        const isOpen = openId === category.id;
        const story =
          categoryStories[category.category] ?? {
            headline: `${category.category} sessions`,
            story: "Tailored photography with Lulu's signature cinematic style.",
          };

        return (
          <motion.article
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={cn(
              "border transition-colors duration-500",
              isOpen
                ? "border-primary/30 bg-card/40"
                : "border-foreground/10 bg-transparent",
            )}
          >
            <button
              type="button"
              onClick={() => {
                setOpenId(isOpen ? "" : category.id);
                setExpandedPackage(null);
              }}
              className="flex w-full items-start justify-between gap-6 p-6 text-left sm:p-8"
              aria-expanded={isOpen}
            >
              <div className="flex gap-5 sm:gap-8">
                <span className="font-serif text-4xl font-light text-primary/25 sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    {category.category}
                  </h2>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/50">
                    {story.headline}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={cn(
                  "mt-2 shrink-0 text-primary transition-transform duration-400",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-foreground/10 px-6 pb-8 sm:px-8">
                    <p className="mb-8 max-w-2xl text-sm leading-relaxed text-foreground/55">
                      {story.story}
                    </p>
                    {category.note && (
                      <p className="mb-6 text-sm italic text-foreground/45">
                        {category.note}
                      </p>
                    )}

                    <div className="divide-y divide-foreground/10 border-y border-foreground/10">
                      {category.packages.map((pkg) => (
                        <PackageExperienceRow
                          key={pkg.id}
                          pkg={pkg}
                          category={category.category}
                          isExpanded={expandedPackage === pkg.id}
                          onToggle={() =>
                            setExpandedPackage((current) =>
                              current === pkg.id ? null : pkg.id,
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}

function PackageExperienceRow({
  pkg,
  category,
  isExpanded,
  onToggle,
}: {
  pkg: Package;
  category: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const href = getContactHref(category, pkg);

  return (
    <div className="py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-serif text-xl text-foreground sm:text-2xl">
            {pkg.name}
          </span>
          {pkg.popular && (
            <span className="text-[10px] tracking-[0.15em] uppercase text-primary">
              Most popular
            </span>
          )}
          <span className="text-xs tracking-wide text-foreground/40">
            {pkg.duration}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="font-serif text-2xl text-primary">{pkg.price}</span>
          <ChevronDown
            size={14}
            className={cn(
              "text-foreground/40 transition-transform duration-300",
              isExpanded && "rotate-180",
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="pt-5 pl-0 sm:pl-2">
              {pkg.details && (
                <p className="mb-4 text-sm text-foreground/55">{pkg.details}</p>
              )}
              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground/65"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-primary"
              >
                Begin with this package
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
