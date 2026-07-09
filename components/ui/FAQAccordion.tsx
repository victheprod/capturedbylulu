"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { FAQSection } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQAccordion({ sections }: { sections: FAQSection[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <LayoutGroup>
      <div className="space-y-14">
        {sections.map((section, si) => (
          <div key={section.category}>
            <p className="mb-6 text-[11px] tracking-[0.28em] uppercase text-primary">
              {section.category}
            </p>
            <div className="divide-y divide-foreground/8">
              {section.items.map((item, qi) => {
                const key = `${si}-${qi}`;
                const isOpen = openKey === key;

                return (
                  <div key={key} className="group">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      aria-expanded={isOpen}
                    >
                      <span
                        className={cn(
                          "font-serif text-lg leading-snug text-foreground transition-colors duration-300 lg:text-xl",
                          isOpen ? "text-primary" : "group-hover:text-foreground/85",
                        )}
                      >
                        {item.question}
                      </span>
                      <motion.span
                        layout
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-300",
                          isOpen
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-foreground/12 text-foreground/40 group-hover:border-foreground/25",
                        )}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-foreground/58 lg:text-[0.95rem]">
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
    </LayoutGroup>
  );
}
