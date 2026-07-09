"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ConciergeShellProps = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

/** Rounded experience frame — distinct from generic full-width wizard */
export function ConciergeShell({ children, className, compact }: ConciergeShellProps) {
  return (
    <div
      className={cn(
        "concierge-shell relative overflow-hidden",
        compact ? "rounded-[1.75rem]" : "rounded-[2rem] sm:rounded-[2.5rem]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl"
      />
      {children}
    </div>
  );
}
