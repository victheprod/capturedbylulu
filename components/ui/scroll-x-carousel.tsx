"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollXCarouselContextValue {
  scrollYProgress: MotionValue<number>;
  setScrollDistance: (distance: number) => void;
}

const ScrollXCarouselContext =
  React.createContext<ScrollXCarouselContextValue | null>(null);

function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext);
  if (!context) {
    throw new Error("useScrollXCarousel must be used within a ScrollXCarousel");
  }
  return context;
}

export function ScrollXCarousel({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"],
  });

  const sectionHeight =
    scrollDistance > 0
      ? `calc(100dvh + ${scrollDistance}px)`
      : "100dvh";

  return (
    <ScrollXCarouselContext.Provider
      value={{ scrollYProgress, setScrollDistance }}
    >
      <div
        ref={carouselRef}
        className={cn("relative w-full max-w-full", className)}
        style={{ height: sectionHeight, ...style }}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  );
}

export function ScrollXCarouselContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sticky top-16 flex h-[calc(100dvh-4rem)] w-full flex-col overflow-hidden lg:top-20 lg:h-[calc(100dvh-5rem)]",
        className,
      )}
      {...props}
    />
  );
}

type ScrollXCarouselWrapProps = HTMLMotionProps<"div"> & {
  trackRef?: React.RefObject<HTMLDivElement | null>;
};

export function ScrollXCarouselWrap({
  className,
  style,
  trackRef,
  ...props
}: ScrollXCarouselWrapProps) {
  const { scrollYProgress, setScrollDistance } = useScrollXCarousel();
  const [maxX, setMaxX] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = trackRef?.current;
    if (!el) return;

    const measure = () => {
      const distance = Math.max(0, el.scrollWidth - window.innerWidth);
      setMaxX(distance);
      setScrollDistance(distance);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [trackRef, setScrollDistance]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  return (
    <motion.div
      ref={trackRef}
      className={cn("w-fit will-change-transform", className)}
      style={{ x, ...style }}
      {...props}
    />
  );
}

export function ScrollXCarouselProgress({
  className,
  style,
  progressClassName,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  progressClassName?: string;
}) {
  const { scrollYProgress } = useScrollXCarousel();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={cn("w-full overflow-hidden", className)} {...props}>
      <motion.div
        className={cn("h-px origin-left bg-primary/80", progressClassName)}
        style={{ scaleX, ...style }}
      />
    </div>
  );
}
