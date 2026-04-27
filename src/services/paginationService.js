export function getPaginationPages(current, total) {
  const pages = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // 1 always
  pages.push(1);

  // Left dots
  if (current > 3) {
    pages.push("...");
  }

  // Middle pages
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Right dots
  if (current < total - 2) {
    pages.push("...");
  }

  // Last always
  pages.push(total);

  return pages;
}
