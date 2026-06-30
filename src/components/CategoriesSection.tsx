"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { categories } from "@/lib/data";

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal via IntersectionObserver */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      style={{ padding: "112px 0", background: "#121212" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)" }}>

        {/* Header */}
        <div className="reveal" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700,
            fontFamily: "'Amiri', Georgia, serif", color: "#E8E0D0"
          }}>
            تسوق حسب القسم
          </h2>
          <a href="#collection" style={{
            fontSize: 12, letterSpacing: "0.1em", color: "#C5A059",
            textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
            borderBottom: "1px solid rgba(197,160,89,0.3)", paddingBottom: 2
          }}>
            عرض الكل <span style={{ fontSize: 14, transform: "scaleX(-1)" }}>→</span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid-cats" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {categories.map((cat, i) => (
            <a
              key={cat.id}
              href="#collection"
              id={`cat-${cat.slug}`}
              className="cat-card reveal"
              style={{
                height: i === 0 ? 520 : 440,
                display: "block",
                textDecoration: "none",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Image */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Base scrim */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(18,18,18,0.92) 0%, rgba(18,18,18,0.3) 50%, transparent 100%)",
              }} />

              {/* Hover tint */}
              <div className="cat-gold-tint" />

              {/* Gold border on hover */}
              <div className="cat-gold-border" />

              {/* Label */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px" }}>
                <p style={{
                  fontSize: "1.25rem", fontWeight: 700,
                  fontFamily: "'Amiri', Georgia, serif",
                  color: "#E8E0D0", marginBottom: 4
                }}>
                  {cat.name}
                </p>
                <p style={{ fontSize: 11, color: "rgba(232,224,208,0.7)", letterSpacing: "0.1em" }}>
                  {cat.count} قطع
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #categories .grid-cats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
