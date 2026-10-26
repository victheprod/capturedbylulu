"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `is-in` to `.reveal` and `.curtain` elements once their top reaches the
 * viewport, including anything skipped past by a fast scroll or jump. Content
 * is only hidden after this arms the page, so it degrades to static.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .curtain:not(.is-in)"));
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top >= line) return true;
        el.classList.add("is-in");
        return false;
      });
      if (!pending.length) stop();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    check();
    root.dataset.reveal = "on";
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      stop();
      cancelAnimationFrame(frame);
      delete root.dataset.reveal;
    };
  }, [pathname]);

  return null;
}
