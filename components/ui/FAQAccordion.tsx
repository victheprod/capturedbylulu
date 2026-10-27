"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQSection } from "@/data/faq";
import { Label } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

export function FAQAccordion({ sections }: { sections: FAQSection[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-16 md:space-y-20">
      {sections.map((section, si) => (
        <section key={section.category} aria-labelledby={`faq-section-${si}`}>
          <Label as="h2" className="block text-oxblood">
            <span id={`faq-section-${si}`}>
              {String(si + 1).padStart(2, "0")} / {section.category}
            </span>
          </Label>
          <div className="mt-6 divide-y divide-ink/12 border-y border-ink/12">
            {section.items.map((item, qi) => {
              const key = `${si}-${qi}`;
              const isOpen = openKey === key;
              const panelId = `faq-answer-${key}`;

              return (
                <div key={key}>
                  <button
                    type="button"
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span
                      className={cn(
                        "font-serif text-xl leading-snug transition-colors duration-500 md:text-2xl",
                        isOpen ? "text-oxblood" : "group-hover:text-oxblood",
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-500",
                        isOpen ? "border-ink bg-ink text-ivory" : "border-ink/20 group-hover:border-ink",
                      )}
                      aria-hidden
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 leading-relaxed text-ink-soft">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
