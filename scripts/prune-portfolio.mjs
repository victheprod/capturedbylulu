#!/usr/bin/env node
/**
 * Shrink public/portfolio (local source library) while keeping every image
 * used on the site, plus optional extras up to a target size.
 *
 * Usage:
 *   node scripts/prune-portfolio.mjs --dry-run
 *   node scripts/prune-portfolio.mjs --target-gb 5.5
 *   node scripts/prune-portfolio.mjs --spare-per-category 12
 *
 * Vercel only deploys public/site-images (~15MB). This script trims the
 * gitignored public/portfolio/ folder on your machine.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const portfolioRoot = path.join(root, "public/portfolio");
const siteImagesRoot = path.join(root, "public/site-images");

const CATEGORIES = ["weddings", "portraits", "families", "events"];
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const EXCLUDED_IDS = new Set(["portraits/DSC00189"]);

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const targetGb = Number(
    args.find((a) => a.startsWith("--target-gb="))?.split("=")[1] ??
      (args.includes("--target-gb")
        ? args[args.indexOf("--target-gb") + 1]
        : NaN),
  );
  const spare = Number(
    args.find((a) => a.startsWith("--spare-per-category="))?.split("=")[1] ??
      (args.includes("--spare-per-category")
        ? args[args.indexOf("--spare-per-category") + 1]
        : 12),
  );
  return {
    dryRun,
    targetBytes: Number.isFinite(targetGb) ? targetGb * 1024 ** 3 : null,
    sparePerCategory: spare,
  };
}

function dirSize(absPath) {
  if (!fs.existsSync(absPath)) return 0;
  let total = 0;
  for (const entry of fs.readdirSync(absPath, { withFileTypes: true })) {
    const p = path.join(absPath, entry.name);
    total += entry.isDirectory() ? dirSize(p) : entry.isFile() ? fs.statSync(p).size : 0;
  }
  return total;
}

function formatBytes(bytes) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function srcToId(src) {
  const m = src.match(/\/site-images(?:\/_hero)?\/([^/]+)\/([^/]+)\.(jpe?g|png|webp)$/i);
  return m ? `${m[1]}/${m[2]}` : null;
}

function collectEssentialIds() {
  const ids = new Set();

  const items = JSON.parse(
    fs.readFileSync(path.join(root, "data/portfolio-items.json"), "utf8"),
  );
  for (const item of items) {
    if (!EXCLUDED_IDS.has(item.id)) ids.add(item.id);
  }

  const portfolioTs = fs.readFileSync(path.join(root, "data/portfolio.ts"), "utf8");
  for (const match of portfolioTs.matchAll(/"src":\s*"(\/site-images[^"]+)"/g)) {
    const id = srcToId(match[1]);
    if (id && !EXCLUDED_IDS.has(id)) ids.add(id);
  }

  return ids;
}

function listCategoryFiles(category, { includeDuplicates = false } = {}) {
  const dir = path.join(portfolioRoot, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(
      (name) =>
        IMAGE_EXT.test(name) && (includeDuplicates || !isDuplicateExport(name)),
    )
    .map((name) => {
      const abs = path.join(dir, name);
      const base = name.replace(/\.(jpe?g|png|webp)$/i, "");
      return {
        id: `${category}/${base}`,
        abs,
        size: fs.statSync(abs).size,
        name,
        duplicate: isDuplicateExport(name),
      };
    });
}

/** Camera export duplicates like DSC02748_1.jpg / foo_abcd.jpg */
function isDuplicateExport(file) {
  return /_[A-Za-z0-9]+\.(jpe?g|png|webp)$/i.test(file);
}

function buildKeepSet(essentialIds, sparePerCategory, targetBytes) {
  const keep = new Map();

  for (const category of CATEGORIES) {
    const files = listCategoryFiles(category);
    const essential = files.filter((f) => essentialIds.has(f.id));
    const spare = files
      .filter((f) => !essentialIds.has(f.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const file of essential) keep.set(file.abs, file);
    for (const file of spare.slice(0, sparePerCategory)) keep.set(file.abs, file);
  }

  if (targetBytes) {
    let total = [...keep.values()].reduce((sum, f) => sum + f.size, 0);
    const pools = CATEGORIES.map((category) =>
      listCategoryFiles(category).filter((f) => !keep.has(f.abs)),
    );

    let round = 0;
    while (total < targetBytes) {
      let added = false;
      for (const pool of pools) {
        const file = pool[round];
        if (!file) continue;
        keep.set(file.abs, file);
        total += file.size;
        added = true;
        if (total >= targetBytes) break;
      }
      if (!added) break;
      round += 1;
    }
  }

  return keep;
}

function pruneSiteImages(essentialIds, dryRun) {
  let removed = 0;
  let saved = 0;

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
        continue;
      }
      if (!IMAGE_EXT.test(entry.name)) continue;
      const rel = abs.replace(siteImagesRoot, "").replace(/\\/g, "/");
      const id = srcToId(`/site-images${rel}`);
      if (!id || essentialIds.has(id)) continue;
      if (EXCLUDED_IDS.has(id)) {
        saved += fs.statSync(abs).size;
        removed += 1;
        if (!dryRun) fs.unlinkSync(abs);
      }
    }
  }

  walk(siteImagesRoot);
  return { removed, saved };
}

function main() {
  const { dryRun, targetBytes, sparePerCategory } = parseArgs();
  const before = dirSize(portfolioRoot);

  if (!fs.existsSync(portfolioRoot)) {
    console.error("No public/portfolio folder found.");
    process.exit(1);
  }

  const essentialIds = collectEssentialIds();
  console.log(`Essential images used on site: ${essentialIds.size}`);

  const keep = buildKeepSet(essentialIds, sparePerCategory, targetBytes);
  const allFiles = CATEGORIES.flatMap((c) => listCategoryFiles(c));
  const duplicates = CATEGORIES.flatMap((c) =>
    listCategoryFiles(c, { includeDuplicates: true }).filter((f) => f.duplicate),
  );
  const toDelete = [
    ...allFiles.filter((f) => !keep.has(f.abs)),
    ...duplicates,
  ];

  const redundantPaths = ["_web", "_hero", "tmp-hero-preview"].map((d) =>
    path.join(portfolioRoot, d),
  );

  console.log(`\nMode: ${dryRun ? "DRY RUN" : "DELETE"}`);
  console.log(`Spare per category: ${sparePerCategory}`);
  if (targetBytes) console.log(`Target library size: ${formatBytes(targetBytes)}`);
  console.log(`Keeping: ${keep.size} portfolio files`);
  console.log(
    `Removing: ${toDelete.length} portfolio files (${duplicates.length} duplicate exports)`,
  );
  console.log(
    `Removing redundant paths: ${redundantPaths.filter(fs.existsSync).join(", ") || "(none)"}`,
  );

  const redundantBytes = redundantPaths.reduce((sum, p) => {
    if (!fs.existsSync(p)) return sum;
    return sum + (fs.statSync(p).isDirectory() ? dirSize(p) : fs.statSync(p).size);
  }, 0);

  if (!dryRun) {
    for (const file of toDelete) {
      fs.unlinkSync(file.abs);
    }
    for (const p of redundantPaths) {
      if (!fs.existsSync(p)) continue;
      fs.rmSync(p, { recursive: true, force: true });
    }
  }

  const sitePrune = pruneSiteImages(essentialIds, dryRun);
  if (sitePrune.removed) {
    console.log(`Removed ${sitePrune.removed} unused site-images (${formatBytes(sitePrune.saved)})`);
  }

  const after = dryRun
    ? before -
      toDelete.reduce((s, f) => s + f.size, 0) -
      redundantBytes
    : dirSize(portfolioRoot);

  console.log(`\nPortfolio library: ${formatBytes(before)} → ${formatBytes(after)}`);
  console.log(`Deployable site-images: ${formatBytes(dirSize(siteImagesRoot))} (unchanged unless unused removed)`);

  if (dryRun) {
    console.log("\nRe-run without --dry-run to apply.");
  }
}

main();
