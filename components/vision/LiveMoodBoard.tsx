"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { VisionBoardImage } from "@/lib/vision/types";
import { cn } from "@/lib/utils";

type LiveMoodBoardProps = {
  images: VisionBoardImage[];
  className?: string;
  compact?: boolean;
  variant?: "scatter" | "strip";
};

const scatterSlots = [
  { top: "4%", left: "8%", rotate: -7, z: 2, w: "42%" },
  { top: "12%", left: "52%", rotate: 5, z: 4, w: "38%" },
  { top: "38%", left: "4%", rotate: 4, z: 1, w: "36%" },
  { top: "42%", left: "48%", rotate: -4, z: 3, w: "40%" },
  { top: "68%", left: "18%", rotate: -2, z: 5, w: "34%" },
  { top: "62%", left: "58%", rotate: 6, z: 2, w: "32%" },
];

export function LiveMoodBoard({
  images,
  className,
  compact,
  variant = "scatter",
}: LiveMoodBoardProps) {
  const reduceMotion = useReducedMotion();
  const visible = images.slice(0, compact ? 4 : 6);

  if (variant === "strip" || compact) {
    return (
      <div className={cn("vision-cork rounded-[1.75rem] p-3 sm:p-4", className)}>
        <BoardHeader count={visible.length} />
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="popLayout">
            {visible.length === 0 ? (
              <EmptyBoard compact />
            ) : (
              visible.map((img, i) => (
                <Polaroid
                  key={img.id}
                  img={img}
                  index={i}
                  reduceMotion={reduceMotion}
                  className="w-[88px] shrink-0 sm:w-[100px]"
                  rotate={i % 2 === 0 ? -3 : 3}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "vision-cork relative overflow-hidden rounded-[2rem] p-4 sm:p-5",
        "min-h-[280px] sm:min-h-[320px]",
        className,
      )}
    >
      <BoardHeader count={visible.length} />

      <div className="relative mx-auto aspect-[4/5] max-w-[280px] sm:max-w-[300px]">
        <AnimatePresence mode="popLayout">
          {visible.length === 0 ? (
            <EmptyBoard />
          ) : (
            visible.map((img, i) => {
              const slot = scatterSlots[i] ?? scatterSlots[0];
              return (
                <motion.div
                  key={img.id}
                  layout={!reduceMotion}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.85, rotate: slot.rotate - 8 }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: slot.rotate,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, scale: 0.9, rotate: slot.rotate + 4 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                    delay: reduceMotion ? 0 : i * 0.05,
                  }}
                  className="absolute"
                  style={{
                    top: slot.top,
                    left: slot.left,
                    width: slot.w,
                    zIndex: slot.z,
                  }}
                >
                  <Polaroid img={img} index={i} reduceMotion={reduceMotion} />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BoardHeader({ count }: { count: number }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-2">
      <p className="text-[9px] tracking-[0.32em] uppercase text-primary/90">
        Live board
      </p>
      <p className="text-[9px] text-foreground/40">
        {count === 0 ? "Awaiting picks" : `${count} pinned`}
      </p>
    </div>
  );
}

function EmptyBoard({ compact }: { compact?: boolean }) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-foreground/12 bg-background/20 text-center",
        compact ? "min-h-[100px] flex-1 px-4 py-6" : "absolute inset-4 px-6",
      )}
    >
      <p className="text-xs leading-relaxed text-foreground/42">
        Pin styles you love — they&apos;ll land here like polaroids on a board.
      </p>
    </motion.div>
  );
}

function Polaroid({
  img,
  index,
  reduceMotion,
  className,
  rotate = 0,
}: {
  img: VisionBoardImage;
  index: number;
  reduceMotion: boolean | null;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.div
      layout={!reduceMotion}
      style={{ rotate }}
      className={cn(
        "vision-polaroid overflow-hidden bg-[#f5f0e6] p-1.5 pb-5 shadow-[0_8px_24px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-background/30">
        <Image
          src={img.src}
          alt={img.styleLabel ?? img.category}
          fill
          sizes="140px"
          className="object-cover"
          style={{ objectPosition: img.objectPosition }}
        />
      </div>
      {img.styleLabel ? (
        <p className="mt-2 truncate px-1 text-center font-serif text-[10px] italic text-[#3d3630]/70">
          {img.styleLabel}
        </p>
      ) : (
        <p className="mt-2 px-1 text-center text-[9px] text-[#3d3630]/40">
          {String(index + 1).padStart(2, "0")}
        </p>
      )}
    </motion.div>
  );
}
