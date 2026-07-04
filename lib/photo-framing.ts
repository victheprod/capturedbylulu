import { siteImages, siteImageFraming } from "@/data/portfolio";

export function framingForSrc(src: string) {
  const key = (Object.keys(siteImages) as Array<keyof typeof siteImages>).find(
    (k) => siteImages[k] === src,
  );
  return key ? siteImageFraming[key] : siteImageFraming.hero;
}
