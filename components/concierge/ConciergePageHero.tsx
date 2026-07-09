import { conciergeHero, conciergeTrustStrip } from "@/lib/concierge/copy";

export function ConciergePageHero() {
  return (
    <section className="relative z-10 px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] tracking-[0.36em] uppercase text-primary">
          Capture Concierge
        </p>
        <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.05] text-foreground">
          {conciergeHero.title}
          <br />
          <span className="text-primary/90">{conciergeHero.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/50 sm:text-base">
          {conciergeHero.description}
        </p>

        <ul className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {conciergeTrustStrip.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-[11px] tracking-wide text-foreground/42"
            >
              <span className="text-primary/70" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
