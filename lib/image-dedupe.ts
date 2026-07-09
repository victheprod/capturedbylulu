/** Normalize hero vs gallery paths to the same logical image */
export function normalizeImageKey(src: string): string {
  return src.replace("/site-images/_hero/", "/site-images/");
}

export function dedupeByImageSrc<T extends { src: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeImageKey(item.src);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function excludeImageKeys<T extends { src: string }>(
  items: T[],
  blocked: string[],
): T[] {
  const blockedKeys = new Set(blocked.map(normalizeImageKey));
  return items.filter((item) => !blockedKeys.has(normalizeImageKey(item.src)));
}

export function excludeIds<T extends { id: string }>(
  items: T[],
  blocked: string[],
): T[] {
  const blockedSet = new Set(blocked);
  return items.filter((item) => !blockedSet.has(item.id));
}
