"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

/* ── Arrow icon ── */
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

export default function HeroSection({ homePage = {} }: { homePage?: any }) {
  const heroTitle = homePage.heroTitle || "أناقة تليق بك";
  const heroSubtitle = homePage.heroSubtitle || "نقدم لك أحدث صيحات الموضة الكلاسيكية والحديثة بأجود أنواع الأقمشة الفاخرة.";
  const ctaText = homePage.ctaText || "اكتشف التشكيلة الجديدة";
  const heroImage = homePage.heroImage || "/images/hero.png";
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal for text */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const text = section.querySelector<HTMLElement>(".hero-text-wrap");
      if (text) text.style.transform = `translateY(${scrolled * 0.1}%)`;
    };
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#121212",
      }}
    >
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={heroImage}
          alt="Luxury Fashion Model"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      {/* Islamic Pattern Background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg stroke='%23C5A059' stroke-width='0.4' fill='none' opacity='0.16'%3E%3Cpath d='M70 0 L82 58 L140 70 L82 82 L70 140 L58 82 L0 70 L58 58 Z'/%3E%3Cpath d='M20 20 L70 35 L120 20 L105 70 L120 120 L70 105 L20 120 L35 70 Z'/%3E%3Ccircle cx='70' cy='70' r='46'/%3E%3Ccircle cx='70' cy='70' r='20'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "140px 140px",
      }} />
      
      {/* Gradient Vignette to focus center */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(circle at center, transparent 20%, rgba(18,18,18,0.85) 90%)"
      }} />

      {/* Editorial content — Centered */}
      <div className="hero-text-wrap" style={{
        position: "relative", zIndex: 10,
        maxWidth: 1000, margin: "0 auto", width: "100%",
        padding: "0 clamp(20px, 5vw, 32px)",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>
        {/* Eyebrow */}
        <p
          className="anim-fade-up"
          style={{
            fontSize: 11, letterSpacing: "0.2em",
            color: "var(--primary-color, #C5A059)",
            marginBottom: 32,
            fontFamily: "'Amiri', serif"
          }}
        >
          دروب الموسم — ٢٠٢٦
        </p>

        <h1 className="hero-text hero-title anim-fade-up delay-200" style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#FFFFFF",
          marginBottom: "1rem",
          fontFamily: "'Amiri', Georgia, serif",
        }}>
          {heroTitle}
        </h1>
        <p className="hero-text hero-subtitle anim-fade-up delay-300" style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "rgba(255, 255, 255, 0.8)",
          maxWidth: "600px",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}>
          {heroSubtitle}
        </p>

        <div className="hero-text anim-fade-up delay-400">
          <a href="#collection" style={{
            display: "inline-block",
            padding: "16px 36px",
            backgroundColor: "var(--primary-color, #C5A059)",
            color: "#121212",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.05em",
            borderRadius: "2px",
            transition: "transform 0.3s, background-color 0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {ctaText}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="anim-fade-in delay-900"
        style={{
          position: "absolute", bottom: 40,
          left: "50%", transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8,
        }}
      >
        <div
          className="anim-scroll-bob"
          style={{
            width: 1, height: 40,
            background: "linear-gradient(to bottom, #C5A059, transparent)",
          }}
        />
        <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#5A524A" }}>
          مرر للأسفل
        </span>
      </div>
    </section>
  );
}
