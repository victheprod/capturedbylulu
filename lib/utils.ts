import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Local portfolio image path */
export function portfolioImageUrl(
  item: { src: string; height?: number },
  _w = 800,
) {
  return item.src;
}

/** Normalize phone numbers for tel: links */
export function formatTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("1") ? `tel:+${digits}` : `tel:+1${digits}`;
}
