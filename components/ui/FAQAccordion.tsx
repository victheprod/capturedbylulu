"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQSection } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQAccordion({ sections }: { sections: FAQSection[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {sections.map((section, si) => (
        <div key={section.category}>
          <p className="mb-5 text-[11px] tracking-[0.25em] uppercase text-primary">
            {section.category}
          </p>
          <div className="border-t border-foreground/10">
            {section.items.map((item, qi) => {
              const key = `${si}-${qi}`;
              const isOpen = openKey === key;

              return (
                <div key={key} className="border-b border-foreground/10">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "font-serif text-lg text-foreground transition-colors duration-200",
                        "group-hover:text-primary",
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 transition-colors duration-200",
                        isOpen ? "text-primary" : "text-foreground/40",
                      )}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm leading-relaxed text-foreground/58">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
