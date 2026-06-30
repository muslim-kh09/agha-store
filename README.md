# Agha Store — Luxury Clothing

> **Digital catalog & showcase website** for Agha Store, a premium menswear brand.  
> Built with **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion + Sanity CMS**.

---

## ✨ Features

- **Cinematic Splash Screen** — 3-phase lion logo animation (fade-in → brand name → upward exit)
- **Floating Navbar** — transparent on hero, solid onyx + blur on scroll, mobile full-screen overlay menu
- **Editorial Hero** — asymmetric split layout with parallax image and gold-gradient headline
- **Category Grid** — full-bleed asymmetric cards with zoom + gold hover micro-interactions
- **Product Catalog** — filterable 4-column grid with animated cards and quick-view modal
- **WhatsApp Order Flow** — size picker → pre-filled WhatsApp message with full product details
- **Brand Story Section** — double-bezel image frame, editorial copy, brand stats
- **Luxury Footer** — espresso brown with social icons and organized links
- **Sanity CMS Ready** — full schema defined; switch from static data to live CMS with one env variable

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Fill in your Sanity project ID, WhatsApp number, etc.
```

### 3. Run locally
```bash
npm run dev
# → http://localhost:3000
```

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page (orchestrates sections)
│   └── globals.css         # Design tokens, global styles
├── components/
│   ├── SplashScreen.tsx    # Cinematic opening animation
│   ├── Navbar.tsx          # Floating transparent → solid navbar
│   ├── HeroSection.tsx     # Split editorial hero + parallax
│   ├── CategoriesSection.tsx # Asymmetric category grid
│   ├── ProductCatalog.tsx  # Filterable product grid
│   ├── ProductCard.tsx     # Individual product card
│   ├── ProductModal.tsx    # Animated modal + WhatsApp CTA
│   ├── AboutSection.tsx    # Brand story section
│   └── Footer.tsx          # Espresso brown footer
├── lib/
│   ├── data.ts             # Static product/category data
│   └── sanity.ts           # Sanity client + GROQ queries
└── sanity/
    └── schemas/
        └── product.ts      # Sanity product document schema
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#121212` Carbon Onyx |
| Accent | `#C5A059` Antique Gold |
| Text | `#E8E0D0` Crisp Off-White |
| Muted | `#8A8278` Silver Gray |
| Footer | `#1A0F0A` Deep Espresso |
| Font | Cormorant Garamond (300–600) |

---

## 🧩 Connecting Sanity CMS

1. Create a project at [sanity.io](https://sanity.io)
2. Add your `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local`
3. Copy `src/sanity/schemas/product.ts` into your Sanity Studio `/schemas` folder
4. In `src/app/page.tsx`, replace the static import with the Sanity query from `src/lib/sanity.ts`

---

## 📱 WhatsApp Order Flow

The order button in the product modal builds a URL like:
```
https://wa.me/966XXXXXXXXX?text=Hello+Agha+Store%2C+I+would+like+to+order+...
```

Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` with the store's real number.

---

## 🌐 Deployment (Vercel)

```bash
# Push to GitHub, then connect repo to Vercel
# Add environment variables in Vercel dashboard
# Automatic deploys on every push to main
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
