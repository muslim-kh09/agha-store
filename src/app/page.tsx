import { client } from "@/sanity/lib/client";
import ComingSoon from "@/components/ComingSoon";

export const revalidate = 10;

export default async function Page() {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc) {
    "id": _id,
    title,
    "description": pt::text(description),
    price,
    discountedPrice,
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
    "description": description,
    "image": image.asset->url,
    "count": count(*[_type == "product" && references(^._id)])
  }`);

  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0] {
    "logo": logo.asset->url,
    primaryColor,
    backgroundColor,
    whatsappNumber,
    instagramLink,
    facebookLink
  }`) || {};

  const homePage = await client.fetch(`*[_type == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    ctaText,
    "heroImage": heroImage.asset->url
  }`) || {};

  return <ComingSoon />;
}
