"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const BRAND_SPLASH_DURATION_MS = 2800;
export const BRAND_ROUTE_DURATION_MS = 780;

type BrandLoaderProps = {
  variant: "splash" | "route";
  className?: string;
  /** When false, fills the parent instead of the viewport (e.g. route loading.tsx). */
  fixed?: boolean;
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;

function ApertureBlades({ className }: { className?: string }) {
  return (
    <div className={cn("brand-loader-aperture", className)} aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="brand-loader-aperture-blade"
          style={{ transform: `rotate(${i * 45}deg)` }}
        />
      ))}
    </div>
  );
}

export function BrandLoader({
  variant,
  className,
  fixed = true,
}: BrandLoaderProps) {
  const reduceMotion = useReducedMotion();
  const isSplash = variant === "splash";

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "z-[220] flex items-center justify-center bg-background",
          fixed ? "fixed inset-0" : "relative min-h-[60dvh] w-full",
          className,
        )}
        role="status"
        aria-label="Loading"
      >
        <Image
          src="/brand-splash-logo.png"
          alt={siteConfig.name}
          width={160}
          height={160}
          className="h-24 w-24 object-contain opacity-90 sm:h-28 sm:w-28"
          priority
        />
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "brand-loader z-[220] flex items-center justify-center overflow-hidden bg-[#080706]",
        fixed ? "fixed inset-0" : "relative min-h-[60dvh] w-full",
        className,
      )}
      role="status"
      aria-label={isSplash ? "Loading CapturedByLulu" : "Loading page"}
      initial={{ opacity: 0, clipPath: "circle(120% at 50% 45%)" }}
      animate={{ opacity: 1, clipPath: "circle(120% at 50% 45%)" }}
      exit={
        isSplash
          ? {
              clipPath: "circle(0% at 50% 45%)",
              opacity: 0,
              transition: { duration: 0.95, ease: easeInOut },
            }
          : {
              opacity: 0,
              scale: 1.02,
              transition: { duration: 0.32, ease: easeOut },
            }
      }
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <div className="brand-loader-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="brand-loader-vignette pointer-events-none absolute inset-0" aria-hidden />

      {isSplash ? (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,169,106,0.14),transparent_58%)]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: easeOut }}
            aria-hidden
          />
          <motion.div
            className="brand-loader-flash pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.55, 0, 0.12, 0] }}
            transition={{ duration: 1.35, times: [0, 0.42, 0.48, 0.56, 0.62, 1], ease: "easeOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(220,38,38,0.35),transparent_42%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.7, 0] }}
            transition={{ duration: 1.2, times: [0, 0.44, 0.5, 0.7], ease: "easeOut" }}
            aria-hidden
          />
        </>
      ) : (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-primary/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          aria-hidden
        />
      )}

      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: isSplash ? 0.82 : 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: isSplash ? 1 : 0.45,
            ease: easeOut,
            delay: isSplash ? 0.15 : 0,
          }}
        >
          <ApertureBlades
            className={cn(
              isSplash ? "h-[min(72vw,22rem)] w-[min(72vw,22rem)]" : "h-36 w-36 sm:h-40 sm:w-40",
            )}
          />
          <motion.div
            className="absolute inset-[18%] flex items-center justify-center"
            animate={isSplash ? { rotate: [0, 0.4, -0.25, 0] } : { scale: [1, 1.03, 1] }}
            transition={
              isSplash
                ? { duration: 2.2, ease: "easeInOut" }
                : { duration: 0.7, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Image
              src="/brand-splash-logo.png"
              alt={siteConfig.name}
              width={512}
              height={512}
              className={cn(
                "object-contain drop-shadow-[0_12px_48px_rgba(0,0,0,0.55)]",
                isSplash ? "h-full w-full" : "h-full w-full",
              )}
              priority
            />
          </motion.div>
        </motion.div>

        {isSplash ? (
          <motion.div
            className="mt-10 flex w-[min(72vw,16rem)] flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65, ease: easeOut }}
          >
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <motion.span
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 1.45, ease: easeInOut }}
              />
            </div>
            <motion.p
              className="text-[10px] tracking-[0.42em] uppercase text-white/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.65] }}
              transition={{ delay: 0.85, duration: 1.4, ease: "easeOut" }}
            >
              Loading
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="mt-6 h-px w-24 overflow-hidden bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="block h-full bg-primary/80"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.65, ease: easeInOut, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>

      {isSplash ? (
        <motion.div
          className="brand-loader-scanline pointer-events-none absolute inset-x-0 top-0 h-24"
          initial={{ y: "-20%" }}
          animate={{ y: "120vh" }}
          transition={{ delay: 0.35, duration: 1.55, ease: easeInOut }}
          aria-hidden
        />
      ) : null}

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: isSplash ? 0.4 : 0, duration: 0.8, ease: easeOut }}
        aria-hidden
      />
    </motion.div>
  );
}
