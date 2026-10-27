"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PENDING = ".reveal:not(.is-in), .curtain:not(.is-in)";

/**
 * Adds `is-in` to `.reveal` and `.curtain` elements once their top reaches the
 * viewport, including anything skipped past by a fast scroll or jump, and
 * anything rendered later (filters, tabs, client-only sections). Content is
 * only hidden after this arms the page, so it degrades to static.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = new Set<HTMLElement>();
    let frame = 0;
    let listening = false;

    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      for (const el of pending) {
        if (el.isConnected && el.getBoundingClientRect().top >= line) continue;
        el.classList.add("is-in");
        pending.delete(el);
      }
      listen(pending.size > 0);
    };
    function schedule() {
      if (!frame) frame = requestAnimationFrame(check);
    }
    const collect = (node: Element | Document) => {
      if (node instanceof HTMLElement && node.matches(PENDING)) pending.add(node);
      node.querySelectorAll<HTMLElement>(PENDING).forEach((el) => pending.add(el));
    };

    collect(document);
    check();
    root.dataset.reveal = "on";

    const mutations = new MutationObserver((records) => {
      const before = pending.size;
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) collect(node);
        });
      }
      if (pending.size > before) schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      listen(false);
      cancelAnimationFrame(frame);
      delete root.dataset.reveal;
    };
  }, [pathname]);

  return null;
}
