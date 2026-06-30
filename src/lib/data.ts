// ─────────────────────────────────────────────────────────────
//  Agha Store – Static data (replace with Sanity queries later)
// ─────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  sizes: string[];
  category: string;
  featured: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
  count: number;
}

export const WHATSAPP_NUMBER = "201067842694";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "هوديز وتيشرتات",
    image: "/images/prod-hoodie.png",
    slug: "hoodies_tees",
    count: 24,
  },
  {
    id: "cat-2",
    name: "بناطيل كارغو",
    image: "/images/prod-cargo.png",
    slug: "cargos",
    count: 15,
  },
  {
    id: "cat-3",
    name: "جواكيت",
    image: "/images/prod-varsity.png",
    slug: "jackets",
    count: 8,
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    title: "هودي أوفرسايز أساسي",
    description:
      "هودي ثقيل بقصة أوفرسايز مريحة جداً. مصنوع من القطن الفاخر ليوفر الدفء والراحة اليومية بلمسة عصرية تناسب يومك الطويل.",
    price: 450,
    currency: "جنيه",
    images: ["/images/prod-hoodie.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "hoodies_tees",
    featured: true,
    slug: "essential-oversized-hoodie",
  },
  {
    id: "prod-2",
    title: "تيشرت جرافيك عصري",
    description:
      "تيشرت قطني ثقيل بطبعة جرافيك حصرية تناسب أسلوب الستريت وير. قصة واسعة تضمن لك مظهراً مميزاً ومريحاً للصيف.",
    price: 250,
    currency: "جنيه",
    images: ["/images/prod-tee.png"],
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies_tees",
    featured: true,
    slug: "graphic-street-tee",
  },
  {
    id: "prod-3",
    title: "بنطال كارغو تقني",
    description:
      "بنطال كارغو باللون الأسود بتصميم تقني (Techwear) يضم جيوباً متعددة وأحزمة قابلة للتعديل لمظهر جريء وعملي.",
    price: 550,
    currency: "جنيه",
    images: ["/images/prod-cargo.png"],
    sizes: ["30", "32", "34", "36"],
    category: "cargos",
    featured: true,
    slug: "techwear-cargo-pants",
  },
  {
    id: "prod-4",
    title: "جاكيت فارستي شبابي",
    description:
      "جاكيت فارستي بتصميم جامعي أنيق، مزين برقع عصرية ومصنوع من خامات ممتازة ليمنحك إطلالة ملفتة في كل مكان.",
    price: 850,
    currency: "جنيه",
    images: ["/images/prod-varsity.png"],
    sizes: ["M", "L", "XL"],
    category: "jackets",
    featured: true,
    slug: "youth-varsity-jacket",
  },
];

export function buildWhatsAppLink(
  product: Product,
  size: string
): string {
  const message = encodeURIComponent(
    `مرحباً متجر آغا،\n\nأود طلب القطعة التالية:\n\n` +
    `• القطعة: ${product.title}\n` +
    `• المقاس: ${size}\n` +
    `• السعر: ${product.price.toLocaleString()} ${product.currency}\n\n` +
    `أرجو تأكيد توفر القطعة وترتيب التوصيل.\n\nشكراً لكم.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
