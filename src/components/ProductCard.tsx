"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onClick, index }: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      style={{
        opacity: 0,
        transform: "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      <button
        id={`product-card-${product.id}`}
        onClick={() => onClick(product)}
        className="prod-card"
        aria-label={`View ${product.title}`}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        {/* Image */}
        <div style={{
          position: "relative", overflow: "hidden",
          aspectRatio: "3/4", background: "#161616",
          marginBottom: 20,
        }}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          <div className="prod-hover-tint" />

          {/* Featured badge */}
          {product.featured && (
            <div style={{
              position: "absolute", top: 16, left: 16,
              padding: "4px 10px", fontSize: 8,
              letterSpacing: "0.22em", textTransform: "uppercase",
              background: "rgba(18,18,18,0.88)",
              border: "1px solid rgba(197,160,89,0.4)",
              color: "#C5A059",
            }}>
              Featured
            </div>
          )}

          {/* Quick view */}
          <div
            className="quick-view"
            style={{
              position: "absolute", bottom: 20,
              left: "50%", transform: "translateX(-50%) translateY(16px)",
              padding: "8px 20px", fontSize: 9,
              letterSpacing: "0.22em", textTransform: "uppercase",
              whiteSpace: "nowrap",
              background: "rgba(18,18,18,0.92)",
              border: "1px solid rgba(197,160,89,0.35)",
              color: "#C5A059",
              backdropFilter: "blur(8px)",
            }}
          >
            عرض التفاصيل
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "0 4px" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5A524A", marginBottom: 6 }}>
            {product.category}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 className="prod-name" style={{
              fontSize: "1.05rem", fontWeight: 300,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}>
              {product.title}
            </h3>
            <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "#C5A059" }}>
              {product.currency} {product.price.toLocaleString()}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {product.sizes.slice(0, 4).map(s => (
              <span key={s} style={{ fontSize: 8, letterSpacing: "0.1em", color: "#4A4440" }}>{s}</span>
            ))}
            {product.sizes.length > 4 && (
              <span style={{ fontSize: 8, color: "#3A3230" }}>+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}
