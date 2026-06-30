// ─────────────────────────────────────────────────────────────
//  Agha Store – Sanity CMS client (stub until packages installed)
//
//  TO ACTIVATE:
//  1. npm install @sanity/client @sanity/image-url next-sanity
//  2. Uncomment the real implementation below
//  3. Set NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET
//     in your .env.local
// ─────────────────────────────────────────────────────────────

// ── Stub types so the rest of the codebase compiles without the package ──
export type SanityImageRef = { _type: "image"; asset: { _ref: string } };

/** Placeholder — returns the image path as-is when Sanity is not connected */
export function urlFor(source: string | SanityImageRef): { url: () => string } {
  const src = typeof source === "string" ? source : "";
  return { url: () => src };
}

/** Placeholder client — no-op until real credentials are provided */
export const sanityClient = {
  fetch: async (_query: string) => [],
};

// ── GROQ Queries (ready for when Sanity is connected) ────────

export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  price,
  "images": images[].asset->url,
  sizes,
  category,
  featured
}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  price,
  "images": images[].asset->url,
  sizes,
  category,
  featured
}`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id,
  name,
  slug,
  "image": image.asset->url,
  "count": count(*[_type == "product" && category == ^.slug.current])
}`;

/* ────────────────────────────────────────────────────────────
   REAL IMPLEMENTATION (uncomment after installing packages)
────────────────────────────────────────────────────────────

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

──────────────────────────────────────────────────────────── */
