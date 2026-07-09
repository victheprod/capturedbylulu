import { serviceCategories, trustItems } from "@/data/site";

function CategorySeparator() {
  return (
    <span
      aria-hidden
      className="mx-3 inline-flex items-center text-base leading-none text-primary/70 sm:mx-4 sm:text-lg"
    >
      ·
    </span>
  );
}

export function EditorialTrustStrip() {
  return (
    <div className="border-y border-foreground/8 bg-background/80 py-7 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="flex flex-wrap items-center justify-center text-center text-[10px] tracking-[0.2em] uppercase text-foreground/40 sm:text-[11px] sm:tracking-[0.22em]">
          {serviceCategories.map((category, index) => (
            <span key={category} className="inline-flex items-center">
              <span>{category}</span>
              {index < serviceCategories.length - 1 ? (
                <CategorySeparator />
              ) : null}
            </span>
          ))}
        </p>

        <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-foreground/8 pt-5 sm:gap-x-12">
          {trustItems.map((item) =>
            "href" in item && item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[10px] tracking-[0.2em] uppercase text-foreground/35 transition-colors hover:text-primary sm:text-[11px]"
              >
                {item.label}
              </a>
            ) : (
              <span
                key={item.label}
                className="text-center text-[10px] tracking-[0.2em] uppercase text-foreground/35 sm:text-[11px]"
              >
                {item.label}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
