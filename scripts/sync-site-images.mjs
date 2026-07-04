#!/usr/bin/env node
/**
 * Copy every image referenced by the site into public/site-images
 * and rewrite data paths from /portfolio/ to /site-images/.
 *
 * Run: node scripts/sync-site-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const portfolioRoot = path.join(root, "public/portfolio");
const siteImagesRoot = path.join(root, "public/site-images");

const SCAN_FILES = [
  "data/portfolio.ts",
  "data/portfolio-items.json",
  "scripts/generate-portfolio-data.mjs",
  "supabase/seed.sql",
];

const EXT_FIXES = {
  "/portfolio/portraits/DSC05682": "/portfolio/portraits/DSC05682.jpg",
  "/portfolio/families/IMG_3649": "/portfolio/families/IMG_3649.jpg",
};

function collectPaths() {
  const paths = new Set();

  const add = (p) => {
    if (!p || typeof p !== "string") return;
    if (p.startsWith("/portfolio/")) paths.add(p);
  };

  for (const rel of SCAN_FILES) {
    const abs = path.join(root, rel);
    if (!fs.existsSync(abs)) continue;
    const text = fs.readFileSync(abs, "utf8");
    for (const m of text.matchAll(/(\/portfolio\/[^\s"'`*]+)/g)) {
      add(m[1].replace(/\\$/, ""));
    }
  }

  const items = JSON.parse(
    fs.readFileSync(path.join(root, "data/portfolio-items.json"), "utf8"),
  );
  for (const item of items) add(item.src);

  return [...paths]
    .map((p) => EXT_FIXES[p] ?? p)
    .sort();
}

function toSitePath(portfolioPath) {
  return portfolioPath.replace(/^\/portfolio\//, "/site-images/");
}

function copyImage(portfolioPath) {
  const rel = portfolioPath.replace(/^\/portfolio\//, "");
  const srcAbs = path.join(portfolioRoot, rel);
  const destAbs = path.join(siteImagesRoot, rel);

  if (!fs.existsSync(srcAbs)) {
    return { portfolioPath, ok: false, reason: "source missing" };
  }

  fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  fs.copyFileSync(srcAbs, destAbs);
  const size = fs.statSync(destAbs).size;
  return { portfolioPath, sitePath: toSitePath(portfolioPath), ok: true, size };
}

function rewriteFile(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return false;
  const before = fs.readFileSync(abs, "utf8");
  let after = before;

  for (const [broken, fixed] of Object.entries(EXT_FIXES)) {
    after = after.replaceAll(`"${broken}"`, `"${fixed}"`);
  }

  after = after.replaceAll("/portfolio/", "/site-images/");

  if (after !== before) {
    fs.writeFileSync(abs, after);
    return true;
  }
  return false;
}

function formatBytes(bytes) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) total += dirSize(abs);
    else total += fs.statSync(abs).size;
  }
  return total;
}

const paths = collectPaths();
console.log(`Found ${paths.length} unique /portfolio/ paths referenced by the site.\n`);

const copied = [];
const failed = [];

for (const portfolioPath of paths) {
  const result = copyImage(portfolioPath);
  if (result.ok) copied.push(result);
  else failed.push(result);
}

const rewritten = [
  "data/portfolio.ts",
  "data/portfolio-items.json",
  "scripts/generate-portfolio-data.mjs",
  "supabase/seed.sql",
].filter(rewriteFile);

console.log("Copied images:");
for (const item of copied) {
  console.log(`  ${item.sitePath} (${formatBytes(item.size)})`);
}

if (failed.length) {
  console.log("\nFailed to copy:");
  for (const item of failed) {
    console.log(`  ${item.portfolioPath} — ${item.reason}`);
  }
}

const totalSize = fs.existsSync(siteImagesRoot) ? dirSize(siteImagesRoot) : 0;

console.log(`\nTotal: ${copied.length} files copied to public/site-images`);
console.log(`Folder size: ${formatBytes(totalSize)}`);
console.log(`Rewrote paths in: ${rewritten.join(", ") || "(none)"}`);

if (failed.length) process.exit(1);
