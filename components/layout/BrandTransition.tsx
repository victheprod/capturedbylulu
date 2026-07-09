"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import {
  BrandLoader,
  BRAND_ROUTE_DURATION_MS,
  BRAND_SPLASH_DURATION_MS,
} from "@/components/ui/BrandLoader";

type LoaderMode = "splash" | "route";

function isInternalPath(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  if (href.startsWith("/admin")) return false;
  return true;
}

export function BrandTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<LoaderMode | null>("splash");
  const modeRef = useRef<LoaderMode | null>("splash");
  const splashDone = useRef(false);
  const prevPath = useRef(pathname);
  const routeStartedAt = useRef(0);
  const routeFallbackTimer = useRef<number | undefined>(undefined);
  const splashTimer = useRef<number | undefined>(undefined);

  const setLoaderMode = useCallback((next: LoaderMode | null) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  const clearRouteFallback = useCallback(() => {
    if (routeFallbackTimer.current) {
      clearTimeout(routeFallbackTimer.current);
      routeFallbackTimer.current = undefined;
    }
  }, []);

  const beginRouteLoader = useCallback(() => {
    routeStartedAt.current = Date.now();
    setLoaderMode("route");
    clearRouteFallback();
    routeFallbackTimer.current = window.setTimeout(() => {
      setLoaderMode(null);
    }, BRAND_ROUTE_DURATION_MS + 400);
  }, [clearRouteFallback, setLoaderMode]);

  const endRouteLoader = useCallback(() => {
    if (!splashDone.current || modeRef.current !== "route") return;

    const elapsed = Date.now() - routeStartedAt.current;
    const remaining = Math.max(0, BRAND_ROUTE_DURATION_MS - elapsed);
    clearRouteFallback();
    window.setTimeout(() => {
      if (modeRef.current === "route") setLoaderMode(null);
    }, remaining);
  }, [clearRouteFallback, setLoaderMode]);

  useEffect(() => {
    splashTimer.current = window.setTimeout(() => {
      splashDone.current = true;
      if (modeRef.current === "splash") setLoaderMode(null);
    }, BRAND_SPLASH_DURATION_MS);

    return () => {
      if (splashTimer.current) clearTimeout(splashTimer.current);
    };
  }, [setLoaderMode]);

  useEffect(() => {
    if (!splashDone.current) {
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current === pathname) return;

    prevPath.current = pathname;
    if (modeRef.current !== "route") beginRouteLoader();
    endRouteLoader();
  }, [pathname, beginRouteLoader, endRouteLoader]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!splashDone.current) return;

      const anchor = (event.target as Element).closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !isInternalPath(href)) return;

      try {
        const nextPath = new URL(href, window.location.origin).pathname;
        if (nextPath === pathname) return;
        beginRouteLoader();
      } catch {
        /* ignore malformed href */
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, beginRouteLoader]);

  useEffect(() => {
    const lockScroll = mode === "splash";
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode]);

  useEffect(() => () => clearRouteFallback(), [clearRouteFallback]);

  return (
    <>
      {children}
      <AnimatePresence mode="wait">
        {mode ? <BrandLoader key={mode} variant={mode} /> : null}
      </AnimatePresence>
    </>
  );
}
