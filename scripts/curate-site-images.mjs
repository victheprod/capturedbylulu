#!/usr/bin/env node
/**
 * Curate public/site-images for Vercel (~50–60 images, <250MB).
 * Run: node scripts/curate-site-images.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const siteRoot = path.join(root, "public/site-images");
const stagingRoot = path.join(root, "public/.site-images-staging");

const GALLERY_MAX_PX = 1400;
const HERO_MAX_PX = 1800;
const JPEG_QUALITY = 82;
const HERO_ID = "weddings/DSC07841";

const MUST_KEEP = {
  Weddings: [
    "weddings/DSC07841",
    "weddings/DSC07766",
    "weddings/DSC07789",
    "weddings/DSC02657",
    "weddings/DSC02726",
    "weddings/DSC03291",
    "weddings/DSC08756",
    "weddings/DSC09871",
    "weddings/DSC09882",
    "weddings/DSC09996",
  ],
  Portraits: [
    "portraits/DSC08205",
    "portraits/DSC07888",
    "portraits/DSC08173",
    "portraits/DSC05682",
    "portraits/DSC04123",
    "portraits/DSC05533",
    "portraits/DSC05604",
    "portraits/DSC08149",
  ],
  Events: [
    "events/DSC09813",
    "events/DSC09870",
    "events/DSC01224",
    "events/DSC06941",
    "events/9G3A8506",
  ],
  Families: [
    "families/IMG_3621",
    "families/IMG_3649",
    "families/DSC00439",
    "families/DSC00528",
    "families/DSC00602",
    "families/DSC01897",
    "families/DSC00572",
    "families/DSC00819",
  ],
};

const TARGET_COUNTS = {
  Weddings: 15,
  Portraits: 12,
  Events: 12,
  Families: 10,
};

function getDimensions(absPath) {
  if (!fs.existsSync(absPath)) return { width: 1365, height: 2048 };
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${absPath}"`, {
      encoding: "utf8",
    });
    return {
      width: Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] || 1365),
      height: Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] || 2048),
    };
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

function findSourceAbs(id) {
  const [dir, base] = id.split("/");
  const file = base.includes(".") ? base : `${base}.jpg`;
  const candidates = [
    path.join(siteRoot, "_hero", dir, file),
    path.join(siteRoot, "_web", dir, file),
    path.join(siteRoot, dir, file),
  ];
  for (const abs of candidates) {
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

function optimizeImage(srcAbs, destAbs, maxPx) {
  fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  execSync(
    `sips -Z ${maxPx} -s format jpeg -s formatOptions ${JPEG_QUALITY} "${srcAbs}" --out "${destAbs}"`,
    { stdio: "ignore" },
  );
  return getDimensions(destAbs);
}

function publicPath(relFromSiteImages) {
  return `/site-images/${relFromSiteImages}`.replace(/\\/g, "/");
}

function pathForId(id, hero = false) {
  const [dir, base] = id.split("/");
  const file = base.includes(".") ? base : `${base}.jpg`;
  if (hero) return publicPath(`_hero/${dir}/${file}`);
  return publicPath(`${dir}/${file}`);
}

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) rmDir(abs);
    else fs.unlinkSync(abs);
  }
  fs.rmdirSync(dir);
}

function dirSize(dir) {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(abs) : fs.statSync(abs).size;
  }
  return total;
}

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    n += entry.isDirectory() ? countFiles(abs) : 1;
  }
  return n;
}

function formatBytes(bytes) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function pickCuratedIds(allItems) {
  const result = {};

  for (const [category, target] of Object.entries(TARGET_COUNTS)) {
    const must = MUST_KEEP[category] ?? [];
    const pool = allItems
      .filter((i) => i.category === category)
      .map((i) => i.id);
    const set = new Set(must.filter((id) => pool.includes(id) || findSourceAbs(id)));

    const rest = pool.filter((id) => !set.has(id));
    const need = target - set.size;
    const step = Math.max(1, Math.floor(rest.length / Math.max(need, 1)));

    for (let i = 0; i < rest.length && set.size < target; i += step) {
      set.add(rest[i]);
    }

    result[category] = [...set];
  }

  return result;
}

const allItems = JSON.parse(
  fs.readFileSync(path.join(root, "data/portfolio-items.json"), "utf8"),
);
const CURATED_IDS = pickCuratedIds(allItems);

rmDir(stagingRoot);
fs.mkdirSync(stagingRoot, { recursive: true });

const curatedItems = [];
const optimized = new Map();
const srcFraming = new Map();

for (const [category, ids] of Object.entries(CURATED_IDS)) {
  for (const id of ids) {
    const [dir, base] = id.split("/");
    const file = base.includes(".") ? base : `${base}.jpg`;
    const srcAbs = findSourceAbs(id);
    if (!srcAbs) {
      console.warn(`Skipping missing source: ${id}`);
      continue;
    }

    const galleryDest = path.join(stagingRoot, dir, file);
    const dims = optimizeImage(srcAbs, galleryDest, GALLERY_MAX_PX);
    const publicSrc = pathForId(id);
    optimized.set(id, { dims, publicSrc });
    srcFraming.set(publicSrc, framingForDimensions(dims.width, dims.height));

    if (id === HERO_ID) {
      const heroDest = path.join(stagingRoot, "_hero", dir, file);
      const heroDims = optimizeImage(srcAbs, heroDest, HERO_MAX_PX);
      const heroSrc = pathForId(id, true);
      optimized.set(`${id}:hero`, { dims: heroDims, publicSrc: heroSrc });
      srcFraming.set(heroSrc, framingForDimensions(heroDims.width, heroDims.height));
    }

    curatedItems.push({
      id,
      src: publicSrc,
      category,
      width: dims.width,
      height: dims.height,
    });
  }
}

const ref = (id, hero = false) =>
  hero ? optimized.get(`${id}:hero`)?.publicSrc : optimized.get(id)?.publicSrc;

const siteImages = {
  hero: ref(HERO_ID, true),
  about: ref("families/IMG_3621"),
  aboutTeaser: ref("weddings/DSC07766"),
  cta: ref("weddings/DSC02657"),
  servicesBanner: ref("portraits/DSC08205"),
  weddingsBanner: ref("weddings/DSC07841"),
  weddingsDetail1: ref("weddings/DSC07766"),
  weddingsDetail2: ref("weddings/DSC07789"),
  brandBanner: ref("portraits/DSC07888"),
  brandDetail: ref("portraits/DSC08173"),
  eventsBanner: ref("events/DSC09813"),
  eventsDetail: ref("events/DSC09870"),
  contactBanner: ref("families/IMG_3621"),
};

const siteImageFraming = Object.fromEntries(
  Object.entries(siteImages).map(([key, src]) => [
    key,
    srcFraming.get(src) ?? framingForDimensions(1400, 933),
  ]),
);

const homePortfolioPreview = [
  {
    id: "weddings/DSC07841",
    label: "Weddings",
    src: siteImages.hero,
    href: "/weddings",
    ...srcFraming.get(siteImages.hero),
    tall: false,
  },
  {
    id: "portraits/DSC08205",
    label: "Portraits",
    src: siteImages.servicesBanner,
    href: "/portfolio",
    ...srcFraming.get(siteImages.servicesBanner),
    tall: true,
  },
  {
    id: "families/IMG_3621",
    label: "Families",
    src: siteImages.contactBanner,
    href: "/portfolio",
    ...srcFraming.get(siteImages.contactBanner),
    tall: false,
  },
  {
    id: "events/DSC09813",
    label: "Events",
    src: siteImages.eventsBanner,
    href: "/portfolio",
    ...srcFraming.get(siteImages.eventsBanner),
    tall: false,
  },
];

const instagramPhotos = [
  siteImages.hero,
  siteImages.servicesBanner,
  siteImages.contactBanner,
  siteImages.eventsBanner,
  siteImages.brandBanner,
  siteImages.aboutTeaser,
  ref("portraits/DSC05682"),
  siteImages.eventsDetail,
  ref("families/IMG_3649"),
];

const instagramPhotoFraming = instagramPhotos.map((src) => ({
  src,
  objectPosition: (srcFraming.get(src) ?? framingForDimensions(1400, 933))
    .objectPosition,
}));

const servicesTeaserImages = [
  {
    label: "Weddings",
    src: siteImages.weddingsBanner,
    href: "/weddings",
    ...siteImageFraming.weddingsBanner,
  },
  {
    label: "Portraits",
    src: siteImages.servicesBanner,
    href: "/portfolio",
    ...siteImageFraming.servicesBanner,
  },
  {
    label: "Families",
    src: siteImages.contactBanner,
    href: "/portfolio",
    ...siteImageFraming.contactBanner,
  },
  {
    label: "Events",
    src: siteImages.eventsBanner,
    href: "/portfolio",
    ...siteImageFraming.eventsBanner,
  },
];

const showcaseIds = [
  "weddings/DSC07841",
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
  "weddings/DSC02657",
];

const portfolioScrollShowcase = showcaseIds
  .filter((id) => optimized.has(id) || id === HERO_ID)
  .map((id) => {
    const dir = id.split("/")[0];
    const category =
      dir === "weddings"
        ? "Weddings"
        : dir === "portraits"
          ? "Portraits"
          : dir === "families"
            ? "Families"
            : "Events";
    const src = id === HERO_ID ? siteImages.hero : optimized.get(id).publicSrc;
    const dims =
      id === HERO_ID
        ? optimized.get(`${HERO_ID}:hero`).dims
        : optimized.get(id).dims;
    return {
      id,
      src,
      category,
      width: dims.width,
      height: dims.height,
      objectPosition: framingForDimensions(dims.width, dims.height).objectPosition,
    };
  });

rmDir(siteRoot);
fs.renameSync(stagingRoot, siteRoot);

fs.writeFileSync(
  path.join(root, "data/portfolio-items.json"),
  JSON.stringify(curatedItems),
);

const tsOutput = `// Curated for Vercel — regenerate: node scripts/curate-site-images.mjs
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

const breakdown = {};
for (const item of curatedItems) {
  breakdown[item.category] = (breakdown[item.category] || 0) + 1;
}

const fileCount = countFiles(siteRoot);
const totalSize = dirSize(siteRoot);

console.log("\n=== Curated portfolio for Vercel ===");
console.log("Gallery items:", curatedItems.length);
console.log("Files on disk:", fileCount, "(includes hero duplicate)");
console.log("Total size:", formatBytes(totalSize));
console.log("Category breakdown:", breakdown);

const manifest = [];
function walk(d, prefix = "") {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) walk(path.join(d, e.name), rel);
    else manifest.push(`/site-images/${rel}`);
  }
}
walk(siteRoot);
fs.writeFileSync(
  path.join(root, "scripts/site-images-manifest.txt"),
  manifest.sort().join("\n"),
);
console.log("\nImages kept:");
manifest.sort().forEach((p) => console.log(" ", p));
