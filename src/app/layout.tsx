import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { client } from "@/sanity/lib/client";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "متجر آغا — أزياء فاخرة",
  description:
    "يقدم متجر آغا أرقى الأزياء الرجالية المصنوعة من أفضل الأقمشة العالمية. اكتشف تشكيلتنا من القمصان، البناطيل، والبدلات المصممة لأصحاب الذوق الرفيع.",
  keywords: ["أزياء فاخرة", "ملابس رجالية", "بدلات تفصيل", "متجر آغا"],
  openGraph: {
    title: "متجر آغا — أزياء فاخرة",
    description: "حرفية عالية في كل خيط.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
    primaryColor,
    backgroundColor
  }`) || {};

  const bg = siteSettings.backgroundColor || "#121212";
  const primary = siteSettings.primaryColor || "#C5A059";

  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Amiri for serif/headings, Tajawal for sans/body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: bg, margin: 0, padding: 0 }}>
        <style>{`
          :root {
            --primary-color: ${primary};
            --bg-color: ${bg};
          }
          /* Override any hardcoded colors with CSS variables globally */
          h2, h3, a, button { color: inherit; } /* fallback reset */
          .text-primary { color: var(--primary-color) !important; }
        `}</style>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
