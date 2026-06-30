"use client";
import { useState, useEffect, useRef } from "react";
import { products } from "@/lib/data";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const FILTERS = ["الكل", "هوديز وتيشرتات", "بناطيل كارغو", "جواكيت"];

export default function ProductCatalog() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in-view"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filterMap: Record<string, string> = {
    "هوديز وتيشرتات": "hoodies_tees",
    "بناطيل كارغو": "cargos",
    "جواكيت": "jackets"
  };

  const filtered = activeFilter === "الكل"
    ? products
    : products.filter(p => p.category.toLowerCase() === filterMap[activeFilter]);

  return (
    <section id="collection" style={{ padding: "112px 0", background: "#121212" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)" }}>

        {/* Header */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700,
            fontFamily: "'Amiri', Georgia, serif",
            color: "#E8E0D0",
          }}>
            أحدث القطع
          </h2>
          <div style={{ marginTop: 16, height: 1, width: 48, background: "#C5A059" }} />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 56 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 20px", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300,
                border: activeFilter === f ? "1px solid #C5A059" : "1px solid rgba(255,255,255,0.1)",
                color: activeFilter === f ? "#C5A059" : "#6A6260",
                background: activeFilter === f ? "rgba(197,160,89,0.08)" : "transparent",
                cursor: "pointer",
                transition: "border-color 0.3s, color 0.3s, background 0.3s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="prod-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
        }}>
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onClick={setSelectedProduct}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "96px 0" }}>
            <p style={{ fontSize: "1rem", color: "#4A4440" }}>لا توجد قطع في هذا القسم بعد.</p>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <style>{`
        @media (max-width: 1024px) { #collection .prod-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { #collection .prod-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
