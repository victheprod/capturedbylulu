"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ChoiceCardProps = {
  label: string;
  description: string;
  icon?: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
  layout?: "default" | "compact";
};

export function ChoiceCard({
  label,
  description,
  icon,
  selected,
  onClick,
  className,
  layout = "default",
}: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "group relative w-full overflow-hidden text-left transition-colors duration-400",
        layout === "default" && "min-h-[140px] p-6 sm:p-7",
        layout === "compact" && "p-5",
        selected
          ? "glass-panel border-primary/35 shadow-[0_12px_48px_rgba(0,0,0,0.22)]"
          : "border border-foreground/10 bg-card/40 hover:border-foreground/20 hover:bg-card/60",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {icon ? (
            <span
              aria-hidden
              className={cn(
                "mb-4 block font-serif text-2xl transition-colors duration-300",
                selected ? "text-primary" : "text-foreground/25 group-hover:text-primary/50",
              )}
            >
              {icon}
            </span>
          ) : null}
          <p
            className={cn(
              "font-serif text-xl font-light leading-snug transition-colors duration-300 sm:text-2xl",
              selected ? "text-foreground" : "text-foreground/85",
            )}
          >
            {label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/50">
            {description}
          </p>
        </div>
        <span
          className={cn(
            "mt-1 flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-foreground/15 text-transparent group-hover:border-foreground/30",
          )}
        >
          <Check size={14} strokeWidth={2.5} />
        </span>
      </div>
      {selected ? (
        <motion.span
          layoutId="choice-glow-concierge"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />
      ) : null}
    </motion.button>
  );
}

type MultiChoiceCardProps = Omit<ChoiceCardProps, "selected"> & {
  selected?: boolean;
};

export function MultiChoiceCard(props: MultiChoiceCardProps) {
  return <ChoiceCard {...props} layout="compact" />;
}
