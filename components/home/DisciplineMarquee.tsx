import type { CSSProperties } from "react";

const words = ["Weddings", "Portraits", "Families", "Events", "Texas based", "Travel available"];

export function DisciplineMarquee() {
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-bone/60 py-5" aria-hidden>
      <div
        className="animate-marquee flex w-max gap-12 font-serif text-3xl font-light whitespace-nowrap italic md:text-4xl"
        style={{ "--gap": "3rem", "--duration": "48s" } as CSSProperties}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center gap-12">
            {word}
            <span className="inline-block h-2 w-2 bg-oxblood" />
          </span>
        ))}
      </div>
    </div>
  );
}
