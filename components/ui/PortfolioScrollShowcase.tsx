"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap,
} from "@/components/ui/scroll-x-carousel";
import { PortfolioLightbox } from "@/components/ui/PortfolioLightbox";
import {
  portfolioScrollShowcase,
  type PortfolioScrollItem,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

type PortfolioScrollShowcaseProps = {
  items?: PortfolioScrollItem[];
};

function subscribeToCoarsePointer(onStoreChange: () => void) {
  const query = window.matchMedia("(pointer: coarse)");
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getCoarsePointerSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getCoarsePointerServerSnapshot() {
  return false;
}

function ShowcaseCard({
  item,
  index,
  onOpen,
  className,
}: {
  item: PortfolioScrollItem;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={cn(
        "group relative shrink-0 cursor-zoom-in overflow-hidden bg-card text-left",
        "h-[min(52dvh,480px)] w-[78vw] sm:w-[54vw] md:w-[38vw] lg:w-[30vw]",
        "snap-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      aria-label={`View ${item.category} photograph`}
    >
      <PhotoImage
        src={item.src}
        alt={`${item.category} photography by CapturedByLulu`}
        fill
        objectPosition={item.objectPosition}
        className="transition-transform duration-700 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 78vw, 30vw"
        priority={index < 3}
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="text-[10px] tracking-[0.2em] uppercase text-foreground">
          {item.category}
        </span>
        <span className="text-[10px] tracking-[0.15em] uppercase text-primary">
          View
        </span>
      </div>
    </button>
  );
}

function ShowcaseHeader({ count }: { count: number }) {
  return (
    <div className="relative z-10 flex shrink-0 items-end justify-between px-6 pt-8 pb-6 lg:px-10 lg:pt-10">
      <div>
        <p className="mb-2 text-[11px] tracking-[0.3em] uppercase text-primary">
          Selected work
        </p>
        <h2 className="font-serif text-3xl font-light text-foreground sm:text-4xl">
          Scroll to explore
        </h2>
      </div>
      <p className="hidden text-[10px] tracking-[0.2em] uppercase text-foreground/40 sm:block">
        {count} photographs
      </p>
    </div>
  );
}

function NativeScrollShowcase({
  items,
  onOpen,
}: {
  items: PortfolioScrollItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <section className="border-b border-foreground/10 bg-background pb-12">
      <ShowcaseHeader count={items.length} />
      <div
        className={cn(
          "flex gap-3 overflow-x-auto px-6 pb-2 lg:gap-4 lg:px-10",
          "snap-x snap-mandatory scroll-px-6 lg:scroll-px-10",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {items.map((item, index) => (
          <ShowcaseCard
            key={item.id}
            item={item}
            index={index}
            onOpen={onOpen}
          />
        ))}
      </div>
      <p className="mt-6 px-6 text-[10px] tracking-[0.2em] uppercase text-foreground/35 lg:px-10">
        Swipe to browse
      </p>
    </section>
  );
}

function ScrollLinkedShowcase({
  items,
  onOpen,
}: {
  items: PortfolioScrollItem[];
  onOpen: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollXCarousel className="bg-background">
      <ScrollXCarouselContainer>
        <ShowcaseHeader count={items.length} />

        <div className="flex flex-1 items-center overflow-hidden">
          <ScrollXCarouselWrap
            trackRef={trackRef}
            className="flex items-stretch gap-3 px-6 lg:gap-4 lg:px-10"
          >
            {items.map((item, index) => (
              <ShowcaseCard
                key={item.id}
                item={item}
                index={index}
                onOpen={onOpen}
              />
            ))}
          </ScrollXCarouselWrap>
        </div>

        <div className="shrink-0 px-6 pb-10 lg:px-10 lg:pb-12">
          <ScrollXCarouselProgress className="bg-foreground/10" />
        </div>
      </ScrollXCarouselContainer>
    </ScrollXCarousel>
  );
}

export function PortfolioScrollShowcase({
  items = portfolioScrollShowcase,
}: PortfolioScrollShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersNativeScroll = useSyncExternalStore(
    subscribeToCoarsePointer,
    getCoarsePointerSnapshot,
    getCoarsePointerServerSnapshot,
  );

  const lightboxItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        category: item.category,
        width: item.width,
        height: item.height,
        imageUrl: item.src,
      })),
    [items],
  );

  return (
    <>
      {prefersNativeScroll ? (
        <NativeScrollShowcase items={items} onOpen={setLightboxIndex} />
      ) : (
        <ScrollLinkedShowcase items={items} onOpen={setLightboxIndex} />
      )}

      <PortfolioLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
