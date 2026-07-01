import { client } from "@/sanity/lib/client";
import HomePageClient from "./HomePageClient";

export const revalidate = 10;

export default async function Page() {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc) {
    "id": _id,
    title,
    description,
    price,
    "category": category->title,
    sizes,
    "images": images[].asset->url,
    "currency": "EGP",
    featured
  }`);

  const categories = await client.fetch(`*[_type == "category"] | order(_createdAt asc) {
    "id": _id,
    "name": title,
    "slug": slug.current,
    "image": image.asset->url,
    "count": count(*[_type == "product" && references(^._id)])
  }`);

  return <HomePageClient products={products} categories={categories} />;
}
