"use client";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductCatalog from "@/components/ProductCatalog";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function HomePageClient({ products, categories }: { products: any[], categories: any[] }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      <main
        className="transition-opacity duration-700"
        style={{ opacity: splashDone ? 1 : 0 }}
      >
        <Navbar />
        <HeroSection />
        <CategoriesSection categories={categories} />
        <ProductCatalog products={products} />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
