"use client";
// ─────────────────────────────────────────────────────────────
//  Root page — orchestrates splash + all sections
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductCatalog from "@/components/ProductCatalog";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Cinematic splash screen */}
      <SplashScreen onComplete={() => setSplashDone(true)} />

      {/* Main site — fades in after splash exits */}
      <main
        className="transition-opacity duration-700"
        style={{ opacity: splashDone ? 1 : 0 }}
      >
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <ProductCatalog />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
