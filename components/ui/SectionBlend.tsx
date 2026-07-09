import { cn } from "@/lib/utils";

type SectionBlendProps = {
  /** Gradient direction — bleeds into the section below or above */
  position: "top" | "bottom" | "both";
  /** Visual tone for the gradient anchor */
  tone?: "background" | "deep" | "surface" | "transparent";
  className?: string;
  /** Height of the bleed zone */
  size?: "sm" | "md" | "lg" | "xl";
};

const toneColors = {
  background: "var(--background)",
  deep: "#14110e",
  surface: "var(--surface)",
  transparent: "transparent",
};

const sizeHeights = {
  sm: "h-16 lg:h-24",
  md: "h-24 lg:h-32",
  lg: "h-32 lg:h-48",
  xl: "h-48 lg:h-64",
};

/** Soft gradient veil that dissolves hard section edges into one continuous flow. */
export function SectionBlend({
  position,
  tone = "background",
  className,
  size = "md",
}: SectionBlendProps) {
  const color = toneColors[tone];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-[1]",
        position === "top" && "top-0",
        position === "bottom" && "bottom-0",
        position === "both" && "inset-y-0",
        className,
      )}
    >
      {(position === "top" || position === "both") && (
        <div
          className={cn("w-full", sizeHeights[size])}
          style={{
            background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`,
          }}
        />
      )}
      {(position === "bottom" || position === "both") && (
        <div
          className={cn(
            "w-full",
            sizeHeights[size],
            position === "both" && "absolute bottom-0",
          )}
          style={{
            background: `linear-gradient(to top, ${color} 0%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
}

type FlowOverlapProps = {
  children: React.ReactNode;
  className?: string;
  /** Pull subsequent content upward into this section */
  bleed?: "sm" | "md" | "lg";
};

const bleedMargins = {
  sm: "-mb-12 lg:-mb-20",
  md: "-mb-20 lg:-mb-32",
  lg: "-mb-28 lg:-mb-40",
};

/** Wrapper that lets a section visually overlap the next — gallery-walk rhythm. */
export function FlowOverlap({
  children,
  className,
  bleed = "md",
}: FlowOverlapProps) {
  return (
    <div className={cn("relative", bleedMargins[bleed], className)}>
      {children}
    </div>
  );
}
