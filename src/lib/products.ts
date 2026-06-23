import "server-only";
import fs from "fs";
import path from "path";
import type { Product } from "./types";

export type { Product };

const SHIRTS_DIR = path.join(process.cwd(), "public", "shirts");

function formatProductName(filename: string): string {
  const base = filename.replace(/\.[^/.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\bda\b/gi, "DA")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function hashToPrice(filename: string): number {
  let hash = 0;
  for (let i = 0; i < filename.length; i++) {
    hash = filename.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 49 + (Math.abs(hash) % 41);
}

export function getProducts(): Product[] {
  if (!fs.existsSync(SHIRTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(SHIRTS_DIR)
    .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file));

  return files
    .map((file) => {
      const filePath = path.join(SHIRTS_DIR, file);
      const stats = fs.statSync(filePath);

      return {
        id: file,
        name: formatProductName(file),
        slug: file.replace(/\.[^/.]+$/, ""),
        image: `/shirts/${file}`,
        price: hashToPrice(file),
        createdAt: stats.mtimeMs,
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}
