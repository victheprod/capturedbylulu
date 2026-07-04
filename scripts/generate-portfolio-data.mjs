#!/usr/bin/env node
/**
 * Regenerate portfolio data from public/portfolio/* (local source, gitignored).
 * For production/Vercel, use the curated set instead:
 *   npm run curate:site-images
 *
 * This script is for local full-library regeneration only.
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = path.join(root, "public/portfolio");
const siteBase = path.join(root, "public/site-images");
const webBase = path.join(siteBase, "_web");
const heroBase = path.join(siteBase, "_hero");
const PUBLIC_PREFIX = "/site-images";

const MAX_BYTES = 4 * 1024 * 1024;
const WEB_MAX_PX = 1600;
const HERO_MAX_PX = 2400;

const FOLDERS = [
  { dir: "weddings", category: "Weddings" },
  { dir: "portraits", category: "Portraits" },
  { dir: "families", category: "Families" },
  { dir: "events", category: "Events" },
];

function isDuplicateExport(file) {
  return /_[A-Za-z0-9]+\.jpe?g$/i.test(file);
}

function resolveWebPath(dir, file, maxPx = WEB_MAX_PX, outRoot = webBase) {
  const absSource = path.join(base, dir, file);
  if (!fs.existsSync(absSource)) {
    return `${PUBLIC_PREFIX}/${dir}/${file}`;
  }

  const { size } = fs.statSync(absSource);
  const isDirectCopy = outRoot === webBase && size <= MAX_BYTES && maxPx === WEB_MAX_PX;

  if (isDirectCopy) {
    const directDir = path.join(siteBase, dir);
    fs.mkdirSync(directDir, { recursive: true });
    const directAbs = path.join(directDir, file);
    if (
      !fs.existsSync(directAbs) ||
      fs.statSync(directAbs).mtimeMs < fs.statSync(absSource).mtimeMs
    ) {
      fs.copyFileSync(absSource, directAbs);
    }
    return `${PUBLIC_PREFIX}/${dir}/${file}`;
  }

  const webDir = path.join(outRoot, dir);
  fs.mkdirSync(webDir, { recursive: true });
  const webAbs = path.join(webDir, file);
  const webRel = webAbs
    .replace(path.join(root, "public"), "")
    .split(path.sep)
    .join("/");

  if (
    !fs.existsSync(webAbs) ||
    fs.statSync(webAbs).mtimeMs < fs.statSync(absSource).mtimeMs
  ) {
    execSync(`sips -Z ${maxPx} "${absSource}" --out "${webAbs}"`, {
      stdio: "ignore",
    });
  }

  return webRel.startsWith("/") ? webRel : `/${webRel}`;
}

/** Landing-page hero — bride & groom, high-res web copy */
function resolveHeroPath(dir, file) {
  return resolveWebPath(dir, file, HERO_MAX_PX, heroBase);
}

function getDimensions(publicRelPath) {
  const abs = path.join(root, "public", publicRelPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    return { width: 1365, height: 2048 };
  }
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${abs}"`, {
      encoding: "utf8",
    });
    const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] || 1365);
    const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] || 2048);
    return { width, height };
  } catch {
    return { width: 1365, height: 2048 };
  }
}

function framingForDimensions(width, height) {
  const ratio = width / height;
  const objectPosition =
    ratio < 0.85 ? "50% 18%" : ratio > 1.15 ? "50% 50%" : "50% 35%";
  const aspectRatio = ratio >= 1 ? "4/3" : "3/4";
  return { width, height, objectPosition, aspectRatio };
}

function framingFromSrc(src) {
  return framingForDimensions(...Object.values(getDimensions(src)));
}

const siteImageSources = {
  hero: ["weddings", "DSC00201.jpg"],
  about: ["families", "IMG_3621.jpg"],
  aboutTeaser: ["weddings", "DSC07766.jpg"],
  cta: ["weddings", "DSC00181.jpg"],
  servicesBanner: ["portraits", "DSC08205.jpg"],
  weddingsBanner: ["weddings", "DSC00201.jpg"],
  weddingsDetail1: ["weddings", "DSC02783.jpg"],
  weddingsDetail2: ["weddings", "DSC02836.jpg"],
  brandBanner: ["portraits", "DSC07888.jpg"],
  brandDetail: ["portraits", "DSC08173.jpg"],
  eventsBanner: ["events", "DSC09813.jpg"],
  eventsDetail: ["events", "DSC09870.jpg"],
  contactBanner: ["families", "IMG_3621.jpg"],
};

const siteImages = {
  ...Object.fromEntries(
    Object.entries(siteImageSources).map(([key, [dir, file]]) => [
      key,
      key === "hero" ? resolveHeroPath(dir, file) : resolveWebPath(dir, file),
    ]),
  ),
};

const siteImageFraming = Object.fromEntries(
  Object.entries(siteImages).map(([key, src]) => {
    const { width, height, objectPosition, aspectRatio } = framingFromSrc(src);
    return [key, { width, height, objectPosition, aspectRatio }];
  }),
);

/** One tile per category — used if portfolio strip is enabled elsewhere */
const homePortfolioPreview = [
  {
    id: "weddings/DSC00201",
    label: "Weddings",
    src: siteImages.hero,
    href: "/weddings",
    ...framingFromSrc(siteImages.hero),
  },
  {
    id: "portraits/DSC08205",
    label: "Portraits",
    src: siteImages.servicesBanner,
    href: "/portfolio",
    ...framingFromSrc(siteImages.servicesBanner),
  },
  {
    id: "families/IMG_3621",
    label: "Families",
    src: siteImages.contactBanner,
    href: "/portfolio",
    ...framingFromSrc(siteImages.contactBanner),
  },
  {
    id: "events/DSC09813",
    label: "Events",
    src: siteImages.eventsBanner,
    href: "/portfolio",
    ...framingFromSrc(siteImages.eventsBanner),
  },
].map((item) => ({
  ...item,
  tall: item.aspectRatio === "3/4",
}));

const instagramPhotos = [
  siteImages.hero,
  siteImages.servicesBanner,
  siteImages.contactBanner,
  siteImages.eventsBanner,
  siteImages.brandBanner,
  siteImages.weddingsDetail1,
  resolveWebPath("portraits", "DSC05682.jpg"),
  resolveWebPath("events", "DSC09870.jpg"),
  resolveWebPath("families", "IMG_3649.jpg"),
];

const instagramPhotoFraming = instagramPhotos.map((src) => {
  const { objectPosition } = framingFromSrc(src);
  return { src, objectPosition };
});

const servicesTeaserImages = [
  { label: "Weddings", src: siteImages.weddingsBanner, href: "/weddings", ...framingFromSrc(siteImages.weddingsBanner) },
  { label: "Portraits", src: siteImages.servicesBanner, href: "/portfolio", ...framingFromSrc(siteImages.servicesBanner) },
  { label: "Families", src: siteImages.contactBanner, href: "/portfolio", ...framingFromSrc(siteImages.contactBanner) },
  { label: "Events", src: siteImages.eventsBanner, href: "/portfolio", ...framingFromSrc(siteImages.eventsBanner) },
];

/** Curated horizontal scroll strip on /portfolio */
const portfolioScrollShowcase = [
  "weddings/DSC00201",
  "weddings/DSC07766",
  "weddings/DSC07789",
  "portraits/DSC08205",
  "portraits/DSC07888",
  "portraits/DSC05682",
  "portraits/DSC08173",
  "families/IMG_3621",
  "families/IMG_3649",
  "events/DSC09813",
  "events/DSC09870",
  "weddings/DSC00181",
].map((id) => {
  const [dir, rawFile] = id.split("/");
  const file = rawFile.includes(".") ? rawFile : `${rawFile}.jpg`;
  const src =
    id === "weddings/DSC00201"
      ? siteImages.hero
      : id === "weddings/DSC07766"
        ? siteImages.weddingsDetail1
        : id === "weddings/DSC07789"
          ? siteImages.weddingsDetail2
          : id === "portraits/DSC08205"
            ? siteImages.servicesBanner
            : id === "portraits/DSC07888"
              ? siteImages.brandBanner
              : id === "portraits/DSC08173"
                ? siteImages.brandDetail
                : id === "families/IMG_3621"
                  ? siteImages.contactBanner
                  : id === "events/DSC09813"
                    ? siteImages.eventsBanner
                    : id === "events/DSC09870"
                      ? siteImages.eventsDetail
                      : id === "weddings/DSC00181"
                        ? siteImages.cta
                        : resolveWebPath(dir, file);
  const category =
    dir === "weddings"
      ? "Weddings"
      : dir === "portraits"
        ? "Portraits"
        : dir === "families"
          ? "Families"
          : "Events";
  const { width, height, objectPosition } = framingFromSrc(src);
  return { id, src, category, width, height, objectPosition };
});

const items = [];
let webGenerated = 0;

for (const { dir, category } of FOLDERS) {
  const folder = path.join(base, dir);
  if (!fs.existsSync(folder)) continue;
  const files = fs
    .readdirSync(folder)
    .filter((f) => /\.(jpe?g|JPG)$/i.test(f) && !isDuplicateExport(f))
    .sort();

  for (const file of files) {
    const src = resolveWebPath(dir, file);
    if (src.includes("/_web/")) webGenerated++;

    const { width, height } = getDimensions(src);

    items.push({
      id: `${dir}/${file.replace(/\.(jpe?g|JPG)$/i, "")}`,
      src,
      category,
      width,
      height,
    });
  }
}

fs.writeFileSync(
  path.join(root, "data/portfolio-items.json"),
  JSON.stringify(items),
);

const tsOutput = `// Auto-generated — run: node scripts/generate-portfolio-data.mjs
import itemsJson from "./portfolio-items.json";

export type PortfolioCategory =
  | "All"
  | "Weddings"
  | "Portraits"
  | "Families"
  | "Events";

export const portfolioFilters: PortfolioCategory[] = [
  "All",
  "Weddings",
  "Portraits",
  "Families",
  "Events",
];

export type PortfolioItem = {
  id: string;
  src: string;
  category: Exclude<PortfolioCategory, "All">;
  height: number;
  width: number;
};

export type HomePreviewItem = {
  id: string;
  label: string;
  tall: boolean;
  src: string;
  href: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectPosition: string;
};

export type ServiceTeaserImage = {
  label: string;
  src: string;
  href: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectPosition: string;
};

export type SiteImageFraming = {
  width: number;
  height: number;
  objectPosition: string;
  aspectRatio: string;
};

export type PortfolioScrollItem = {
  id: string;
  src: string;
  category: Exclude<PortfolioCategory, "All">;
  width: number;
  height: number;
  objectPosition: string;
};

export const portfolioItems = itemsJson as PortfolioItem[];

export const siteImages = ${JSON.stringify(siteImages, null, 2)} as const;

export const siteImageFraming: Record<keyof typeof siteImages, SiteImageFraming> = ${JSON.stringify(siteImageFraming, null, 2)};

export const homePortfolioPreview: HomePreviewItem[] = ${JSON.stringify(homePortfolioPreview, null, 2)};

export const instagramPhotos = ${JSON.stringify(instagramPhotos, null, 2)};

export const instagramPhotoFraming = ${JSON.stringify(instagramPhotoFraming, null, 2)};

export const servicesTeaserImages: ServiceTeaserImage[] = ${JSON.stringify(servicesTeaserImages, null, 2)};

export const portfolioScrollShowcase: PortfolioScrollItem[] = ${JSON.stringify(portfolioScrollShowcase, null, 2)};
`;

fs.writeFileSync(path.join(root, "data/portfolio.ts"), tsOutput);
console.log(`Generated ${items.length} items → data/portfolio-items.json`);
console.log(`  Hero: ${siteImages.hero}`);
console.log(`  Web-optimized copies: ${webGenerated}`);
for (const { category } of FOLDERS) {
  const n = items.filter((i) => i.category === category).length;
  console.log(`  ${category}: ${n}`);
}
