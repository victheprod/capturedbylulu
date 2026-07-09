"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type VisionAtelierShellProps = {
  children: ReactNode;
  className?: string;
  withBoard?: boolean;
};

/** Distinct arch-shaped canvas — not the concierge glass-card wizard shell */
export function VisionAtelierShell({
  children,
  className,
  withBoard,
}: VisionAtelierShellProps) {
  return (
    <div
      className={cn(
        "vision-atelier relative overflow-hidden",
        withBoard && "lg:pr-[min(38%,320px)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/[0.03] blur-2xl"
      />
      {children}
    </div>
  );
}
