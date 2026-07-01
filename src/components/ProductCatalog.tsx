"use client";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import type { Product } from "@/lib/data";

export default function ProductCatalog({ products = [] }: { products: Product[] }) {
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

  const dynamicFilters = ["الكل", ...Array.from(new Set(products.filter(p => p.category).map(p => p.category)))];

  const filtered = activeFilter === "الكل"
    ? products
    : products.filter(p => p.category === activeFilter);

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
          {dynamicFilters.map((f: any) => (
            <button
              key={f}
              id={`filter-${f}`}
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
          <div style={{ textAlign: "center", padding: "96px 0", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px dashed rgba(197,160,89,0.3)" }}>
            <p style={{ fontSize: "1.5rem", color: "#E8E0D0", fontFamily: "'Amiri', serif" }}>مجموعتنا الجديدة ستتوفر قريباً...</p>
            <p style={{ color: "#6A6260", marginTop: 8 }}>New collection dropping soon</p>
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
