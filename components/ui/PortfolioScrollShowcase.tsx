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
import { excludeIds, excludeImageKeys } from "@/lib/image-dedupe";

type PortfolioScrollShowcaseProps = {
  items?: PortfolioScrollItem[];
  hideHeader?: boolean;
  excludeIds?: string[];
  excludeSrcs?: string[];
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
        "group relative shrink-0 cursor-zoom-in overflow-hidden bg-bone text-left",
        "h-[min(52dvh,480px)] w-[78vw] sm:w-[54vw] md:w-[38vw] lg:w-[30vw]",
        "snap-center",
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
        loading={index < 3 ? "eager" : undefined}
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-5 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="font-label text-[10.5px]">
          {String(index + 1).padStart(2, "0")} / {item.category}
        </span>
        <span className="font-label text-[10.5px]">View</span>
      </div>
    </button>
  );
}

function ShowcaseHeader({ count }: { count: number }) {
  return (
    <div className="relative z-10 mx-5 flex shrink-0 items-center justify-between gap-6 border-b border-ink/15 pt-6 pb-4 md:mx-10">
      <h2 className="font-label text-[10.5px] text-oxblood">The highlights</h2>
      <p className="font-label text-[10.5px] text-ink-soft">{count} photographs</p>
    </div>
  );
}

function NativeScrollShowcase({
  items,
  onOpen,
  hideHeader,
}: {
  items: PortfolioScrollItem[];
  onOpen: (index: number) => void;
  hideHeader?: boolean;
}) {
  return (
    <section className="bg-background pb-12">
      {!hideHeader && <ShowcaseHeader count={items.length} />}
      <div
        className={cn(
          "flex gap-3 overflow-x-auto px-5 pb-2 md:px-10 lg:gap-4",
          "snap-x snap-mandatory scroll-px-5 md:scroll-px-10",
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
      <p className="font-label mt-6 px-5 text-[10.5px] text-ink-soft md:px-10">
        Swipe to browse
      </p>
    </section>
  );
}

function ScrollLinkedShowcase({
  items,
  onOpen,
  hideHeader,
}: {
  items: PortfolioScrollItem[];
  onOpen: (index: number) => void;
  hideHeader?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollXCarousel className="bg-background">
      <ScrollXCarouselContainer>
        {!hideHeader && <ShowcaseHeader count={items.length} />}

        <div className="flex flex-1 items-center overflow-hidden">
          <ScrollXCarouselWrap
            trackRef={trackRef}
            className="flex items-stretch gap-3 px-5 md:px-10 lg:gap-4"
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

        <div className="shrink-0 px-5 pb-10 md:px-10 lg:pb-12">
          <ScrollXCarouselProgress className="bg-ink/15" progressClassName="bg-ink" />
        </div>
      </ScrollXCarouselContainer>
    </ScrollXCarousel>
  );
}

export function PortfolioScrollShowcase({
  items = portfolioScrollShowcase,
  hideHeader = false,
  excludeIds: excludeIdList = [],
  excludeSrcs = [],
}: PortfolioScrollShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersNativeScroll = useSyncExternalStore(
    subscribeToCoarsePointer,
    getCoarsePointerSnapshot,
    getCoarsePointerServerSnapshot,
  );

  const displayItems = useMemo(() => {
    let filtered = items;
    if (excludeIdList.length) {
      filtered = excludeIds(filtered, excludeIdList);
    }
    if (excludeSrcs.length) {
      filtered = excludeImageKeys(filtered, excludeSrcs);
    }
    return filtered;
  }, [items, excludeIdList, excludeSrcs]);

  const lightboxItems = useMemo(
    () =>
      displayItems.map((item) => ({
        id: item.id,
        category: item.category,
        width: item.width,
        height: item.height,
        imageUrl: item.src,
      })),
    [displayItems],
  );

  return (
    <>
      {prefersNativeScroll ? (
        <NativeScrollShowcase
          items={displayItems}
          onOpen={setLightboxIndex}
          hideHeader={hideHeader}
        />
      ) : (
        <ScrollLinkedShowcase
          items={displayItems}
          onOpen={setLightboxIndex}
          hideHeader={hideHeader}
        />
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
