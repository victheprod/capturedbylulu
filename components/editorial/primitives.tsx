import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Staggers `.reveal`, `.curtain`, and `.hero-rise` elements. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Label({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "h2";
}) {
  return <Tag className={cn("font-label text-[10.5px]", className)}>{children}</Tag>;
}

export function EstimateButton({
  href = "/contact",
  tone = "ink",
  children = "Request an estimate",
  className,
}: {
  href?: string;
  tone?: "ink" | "light";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 border px-7 py-4 text-sm font-medium tracking-wide transition-colors duration-500",
        tone === "ink"
          ? "border-ink bg-ink text-ivory hover:border-oxblood hover:bg-oxblood"
          : "border-ivory/45 text-ivory hover:bg-ivory hover:text-ink",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

export function Wordmark({ className, accent = "text-oxblood" }: { className?: string; accent?: string }) {
  return (
    <span className={cn("font-serif tracking-tight", className)}>
      Captured<em className={cn("italic", accent)}>by</em>Lulu
    </span>
  );
}
