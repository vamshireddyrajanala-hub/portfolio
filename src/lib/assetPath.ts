/**
 * Prepends the Next.js basePath to an asset URL so images, PDFs and other
 * static files resolve correctly on both localhost and GitHub Pages.
 *
 * In development basePath is "", so `/projects/foo.png` stays unchanged.
 * In production basePath is "/portfolio", so it becomes `/portfolio/projects/foo.png`.
 */

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
