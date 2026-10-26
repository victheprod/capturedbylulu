import { trustItems } from "@/data/site";

export function EditorialTrustStrip() {
  return (
    <div className="border-b border-foreground/10 px-6 lg:px-10">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 sm:justify-between">
        {trustItems.map((item) => (
          <li
            key={item.label}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/45"
          >
            {"href" in item && item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
