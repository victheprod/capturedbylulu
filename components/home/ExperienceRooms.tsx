import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/home";
import { Label } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

export function ExperienceRooms() {
  const total = String(experiences.length).padStart(2, "0");

  return (
    <section
      aria-labelledby="experiences-title"
      className="bg-ink py-24 text-ivory md:py-36"
      style={{ "--curtain": "var(--color-ink)" } as CSSProperties}
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="reveal mb-16 max-w-3xl md:mb-24">
          <Label className="text-brass">Room Two</Label>
          <h2
            id="experiences-title"
            className="mt-4 font-serif text-5xl leading-[0.95] font-light tracking-tight md:text-7xl"
          >
            Four ways to be <em className="text-brass italic">seen.</em>
          </h2>
        </div>

        <div className="space-y-24 md:space-y-36">
          {experiences.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={item.title} className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
                <Link
                  href={item.href}
                  className={cn("plate col-span-12 block md:col-span-7", flip && "md:order-2 md:col-start-6")}
                  aria-label={`${item.title} photography`}
                >
                  <div className="curtain" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: item.position }}
                    />
                  </div>
                </Link>
                <div className={cn("reveal col-span-12 md:col-span-5", flip ? "md:order-1 md:pr-10" : "md:pl-6")}>
                  <Label className="text-brass">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </Label>
                  <h3 className="mt-3 font-serif text-6xl leading-[0.9] font-light tracking-tight md:text-[7.5vw] 2xl:text-9xl">
                    {item.title}
                  </h3>
                  <p className="mt-6 max-w-sm leading-relaxed text-ivory/75">{item.line}</p>
                  <Link href={item.href} className="link-line mt-8 inline-flex items-center gap-2 pb-1 text-sm">
                    Explore {item.title.toLowerCase()} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
