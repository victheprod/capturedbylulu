"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const BRAND_SPLASH_DURATION_MS = 3200;
export const BRAND_ROUTE_DURATION_MS = 820;

type BrandLoaderProps = {
  variant: "splash" | "route";
  className?: string;
  /** When false, fills the parent instead of the viewport (e.g. route loading.tsx). */
  fixed?: boolean;
};

type ShutterState = "closed" | "opening" | "open" | "closing" | "flash" | "reopening";

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;
const shutterSnap = [0.82, 0, 0.95, 0.35] as const;

const BLADE_COUNT = 6;
const BLADE_OPEN_DEG = -44;
const BLADE_CLOSED_DEG = 0;

const openTransition: Transition = { duration: 0.62, ease: easeOut };
const closeTransition: Transition = { duration: 0.11, ease: shutterSnap };
const reopenTransition: Transition = { duration: 0.48, ease: easeOut };

function bladeTransition(state: ShutterState): Transition {
  if (state === "closing") return closeTransition;
  if (state === "reopening" || state === "opening") return reopenTransition;
  return openTransition;
}

function bladeAngle(state: ShutterState) {
  if (state === "open" || state === "reopening") return BLADE_OPEN_DEG;
  if (state === "opening") return BLADE_OPEN_DEG;
  return BLADE_CLOSED_DEG;
}

function LensShutter({
  className,
  shutterState,
}: {
  className?: string;
  shutterState: ShutterState;
}) {
  const angle = bladeAngle(shutterState);
  const transition = bladeTransition(shutterState);

  return (
    <div className={cn("brand-shutter", className)} aria-hidden>
      {Array.from({ length: BLADE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="brand-shutter-arm"
          style={{ transform: `rotate(${(360 / BLADE_COUNT) * i}deg)` }}
        >
          <motion.div
            className="brand-shutter-blade"
            animate={{ rotate: angle }}
            transition={transition}
          />
        </div>
      ))}
      <div className="brand-shutter-ring" />
    </div>
  );
}

function ViewfinderChrome({
  className,
  visible,
}: {
  className?: string;
  visible: boolean;
}) {
  return (
    <motion.div
      className={cn("brand-viewfinder pointer-events-none absolute inset-0", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
      aria-hidden
    >
      <span className="brand-viewfinder-corner brand-viewfinder-corner-tl" />
      <span className="brand-viewfinder-corner brand-viewfinder-corner-tr" />
      <span className="brand-viewfinder-corner brand-viewfinder-corner-bl" />
      <span className="brand-viewfinder-corner brand-viewfinder-corner-br" />
      <span className="brand-viewfinder-crosshair-h" />
      <span className="brand-viewfinder-crosshair-v" />
      <span className="brand-viewfinder-meta brand-viewfinder-meta-tl">f/2.8</span>
      <span className="brand-viewfinder-meta brand-viewfinder-meta-tr">1/125</span>
      <span className="brand-viewfinder-meta brand-viewfinder-meta-bl">ISO 400</span>
      <span className="brand-viewfinder-rec">
        <span className="brand-viewfinder-rec-dot" />
        CAPTURING
      </span>
    </motion.div>
  );
}

function FullScreenShutter({
  shutterState,
}: {
  shutterState: ShutterState;
}) {
  const open =
    shutterState === "open" ||
    shutterState === "opening" ||
    shutterState === "reopening";
  const angle = open ? -38 : 0;
  const transition =
    shutterState === "closing" ? closeTransition : reopenTransition;

  return (
    <div className="brand-shutter-fullscreen pointer-events-none absolute inset-0 z-20" aria-hidden>
      {Array.from({ length: BLADE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="brand-shutter-fullscreen-arm"
          style={{ transform: `rotate(${(360 / BLADE_COUNT) * i}deg)` }}
        >
          <motion.div
            className="brand-shutter-fullscreen-blade"
            animate={{ rotate: angle }}
            transition={transition}
          />
        </div>
      ))}
    </div>
  );
}

function useSplashShutterSequence(enabled: boolean) {
  const [shutterState, setShutterState] = useState<ShutterState>("closed");

  useEffect(() => {
    if (!enabled) return;

    const steps: { at: number; state: ShutterState }[] = [
      { at: 120, state: "opening" },
      { at: 780, state: "open" },
      { at: 1580, state: "closing" },
      { at: 1700, state: "flash" },
      { at: 1880, state: "reopening" },
      { at: 2380, state: "open" },
    ];

    const timers = steps.map(({ at, state }) =>
      window.setTimeout(() => setShutterState(state), at),
    );

    return () => timers.forEach(clearTimeout);
  }, [enabled]);

  return shutterState;
}

function useRouteShutterSequence(enabled: boolean) {
  const [shutterState, setShutterState] = useState<ShutterState>(
    enabled ? "closing" : "open",
  );

  useEffect(() => {
    if (!enabled) return;

    const t1 = window.setTimeout(() => setShutterState("flash"), 105);
    const t2 = window.setTimeout(() => setShutterState("reopening"), 250);
    const t3 = window.setTimeout(() => setShutterState("open"), 540);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [enabled]);

  return shutterState;
}

export function BrandLoader({
  variant,
  className,
  fixed = true,
}: BrandLoaderProps) {
  const reduceMotion = useReducedMotion();
  const isSplash = variant === "splash";
  const splashShutter = useSplashShutterSequence(isSplash && !reduceMotion);
  const routeShutter = useRouteShutterSequence(!isSplash && !reduceMotion);
  const shutterState = isSplash ? splashShutter : routeShutter;

  const flashVisible =
    shutterState === "flash" ||
    (isSplash && shutterState === "closing");

  const viewfinderVisible =
    shutterState === "open" ||
    shutterState === "opening" ||
    shutterState === "reopening" ||
    (isSplash && shutterState === "closed");

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
        "brand-loader z-[220] flex items-center justify-center overflow-hidden bg-[#050504]",
        fixed ? "fixed inset-0" : "relative min-h-[60dvh] w-full",
        className,
      )}
      role="status"
      aria-label={isSplash ? "Loading CapturedByLulu" : "Loading page"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        isSplash
          ? {
              opacity: 0,
              transition: { duration: 0.55, ease: easeOut, delay: 0.08 },
            }
          : {
              opacity: 0,
              transition: { duration: 0.28, ease: easeOut },
            }
      }
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <div className="brand-loader-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="brand-loader-vignette pointer-events-none absolute inset-0" aria-hidden />

      {isSplash && shutterState === "closing" ? (
        <FullScreenShutter shutterState={shutterState} />
      ) : null}

      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-white"
        initial={{ opacity: 0 }}
        animate={{
          opacity: flashVisible ? (shutterState === "flash" ? 0.92 : 0.35) : 0,
        }}
        transition={{
          duration: shutterState === "flash" ? 0.08 : 0.06,
          ease: "easeOut",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.95),rgba(220,38,38,0.25)_38%,transparent_62%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: shutterState === "flash" ? 0.55 : 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={cn(
            "relative",
            isSplash
              ? "h-[min(76vw,24rem)] w-[min(76vw,24rem)]"
              : "h-40 w-40 sm:h-44 sm:w-44",
          )}
        >
          <motion.div
            className="absolute inset-[14%] overflow-hidden rounded-full bg-[#0a0908]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity:
                shutterState === "closed" || shutterState === "closing" ? 0.15 : 1,
              scale: 1,
            }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity:
                  shutterState === "closed" || shutterState === "closing" ? 0 : 1,
                filter:
                  shutterState === "closed" || shutterState === "closing"
                    ? "blur(6px)"
                    : "blur(0px)",
              }}
              transition={{ duration: shutterState === "closing" ? 0.08 : 0.4 }}
            >
              <Image
                src="/brand-splash-logo.png"
                alt={siteConfig.name}
                width={512}
                height={512}
                className="h-[88%] w-[88%] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                priority
              />
            </motion.div>
          </motion.div>

          <LensShutter
            className="absolute inset-0"
            shutterState={shutterState}
          />
          <ViewfinderChrome visible={viewfinderVisible} />
        </div>

        {isSplash ? (
          <motion.div
            className="mt-10 flex w-[min(72vw,16rem)] flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: shutterState === "flash" || shutterState === "closing" ? 0 : 1,
              y: 0,
            }}
            transition={{ delay: 0.9, duration: 0.5, ease: easeOut }}
          >
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <motion.span
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: shutterState === "open" ? "100%" : "35%" }}
                transition={{ duration: 1.6, ease: easeInOut }}
              />
            </div>
            <p className="text-[10px] tracking-[0.38em] uppercase text-white/42">
              {shutterState === "closing" || shutterState === "flash"
                ? "Exposing"
                : "Through the lens"}
            </p>
          </motion.div>
        ) : (
          <motion.p
            className="mt-5 text-[9px] tracking-[0.34em] uppercase text-white/35"
            animate={{ opacity: shutterState === "flash" ? 0 : 1 }}
          >
            {shutterState === "closing" ? "Capturing" : "Loading"}
          </motion.p>
        )}
      </div>

      {isSplash ? (
        <motion.div
          className="brand-loader-scanline pointer-events-none absolute inset-x-0 top-0 z-10 h-20"
          initial={{ y: "-20%" }}
          animate={{ y: "120vh" }}
          transition={{ delay: 0.5, duration: 1.8, ease: easeInOut }}
          aria-hidden
        />
      ) : null}
    </motion.div>
  );
}
