#!/usr/bin/env node
/**
 * Audit per-page image duplicates. Run: node scripts/audit-page-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function normalize(src) {
  return src.replace("/site-images/_hero/", "/site-images/");
}

function findDups(label, srcs) {
  const seen = new Map();
  const dups = [];
  for (const { section, src } of srcs) {
    const key = normalize(src);
    if (seen.has(key)) {
      dups.push({ src: key, sections: [seen.get(key), section] });
    } else {
      seen.set(key, section);
    }
  }
  if (dups.length) {
    console.log(`\n❌ ${label}`);
    for (const d of dups) {
      console.log(`  ${d.src}: ${d.sections.join(" + ")}`);
    }
  } else {
    console.log(`✓ ${label}`);
  }
  return dups.length;
}

const portfolio = fs.readFileSync(path.join(root, "data/portfolio.ts"), "utf8");
const siteMatch = portfolio.match(/export const siteImages = ({[\s\S]*?}) as const/);
const siteImages = JSON.parse(siteMatch[1].replace(/(\w+):/g, '"$1":'));

const extractArray = (name) => {
  const m = portfolio.match(new RegExp(`export const ${name}[\\s\\S]*?=\\s*(\\[[\\s\\S]*?\\]);`));
  if (!m) return [];
  return [...m[1].matchAll(/"src":\s*"([^"]+)"/g)].map((x) => x[1]);
};

const scrollIds = [...portfolio.matchAll(/portfolioScrollShowcase[\s\S]*?\];/)[0][0].matchAll(/"id":\s*"([^"]+)"/g)].map((x) => x[1]);
const scrollSrcs = extractArray("portfolioScrollShowcase");
const services = extractArray("servicesTeaserImages");
const ig = extractArray("homeInstagramStrip");

let total = 0;
total += findDups("Homepage", [
  { section: "hero", src: siteImages.hero },
  { section: "philosophy", src: siteImages.aboutTeaser },
  { section: "about-editorial", src: siteImages.weddingsDetail2 },
  { section: "cta", src: siteImages.cta },
  ...scrollSrcs
    .filter((s) => !normalize(s).includes("DSC00201") && !normalize(s).includes("DSC07766"))
    .map((src) => ({ section: "scroll", src })),
  ...services.map((src) => ({ section: "services", src })),
  ...ig.map((src) => ({ section: "instagram", src })),
]);

const items = JSON.parse(fs.readFileSync(path.join(root, "data/portfolio-items.json"), "utf8"));
const scrollSet = new Set(scrollIds);
const masonryOverlap = items.filter((i) => scrollSet.has(i.id)).length;
if (masonryOverlap) {
  console.log(`\n⚠ Portfolio page: ${masonryOverlap} scroll images would appear in masonry (should be excluded in app)`);
} else {
  console.log("\n✓ Portfolio masonry exclusion");
}

process.exit(total > 0 ? 1 : 0);
