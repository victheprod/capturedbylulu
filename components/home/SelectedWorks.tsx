import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { selectedWorks } from "@/data/home";
import { Label, delay } from "@/components/editorial/primitives";
import { cn } from "@/lib/utils";

export function SelectedWorks() {
  return (
    <section aria-labelledby="work-title" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-16 grid grid-cols-12 items-end gap-x-6 md:mb-24">
        <div className="reveal col-span-12 md:col-span-7">
          <Label className="text-oxblood">Room One</Label>
          <h2
            id="work-title"
            className="mt-4 font-serif text-5xl leading-[0.95] font-light tracking-tight md:text-7xl"
          >
            Selected <em className="italic">work</em>
          </h2>
        </div>
        <p className="reveal col-span-12 mt-6 text-ink-soft md:col-span-4 md:col-start-9 md:mt-0" style={delay(150)}>
          Hung like a show, not a feed. Real clients across Texas, photographed in studios, churches,
          backyards and ballrooms.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        {selectedWorks.map((work, i) => (
          <figure key={work.src} className={cn(work.layout, i % 2 ? "ml-10 md:ml-0" : "mr-10 md:mr-0")}>
            <Link href="/portfolio" className="plate block" aria-label={`View the portfolio: ${work.caption}`}>
              <div className="curtain" style={{ ...delay(i * 60), aspectRatio: `${work.width} / ${work.height}` }}>
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <figcaption className="reveal mt-4 flex items-baseline gap-4">
              <Label className="text-oxblood">Plate {work.plate}</Label>
              <span className="font-serif text-lg italic">{work.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="reveal mt-20 flex justify-center md:mt-28">
        <Link href="/portfolio" className="group inline-flex items-center gap-3 font-serif text-2xl italic md:text-3xl">
          <span className="link-line pb-1">Walk the full portfolio</span>
          <ArrowUpRight
            className="h-6 w-6 text-oxblood transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
