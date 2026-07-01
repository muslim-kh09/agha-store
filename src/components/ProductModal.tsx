"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Product, buildWhatsAppLink } from "@/lib/data";

/* ── Icons ── */
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  settings?: any;
}

export default function ProductModal({ product, onClose, settings = {} }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(""); setImgIndex(0); setSizeError(false);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;

  const handleCheckout = () => {
    if (!product || !selectedSize) { setSizeError(true); return; }
    const number = settings?.whatsappNumber || WHATSAPP_NUMBER;
    const url = buildWhatsAppLink(product, selectedSize, number);
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(8,8,8,0.88)",
          backdropFilter: "blur(12px)",
          transition: "opacity 0.4s ease",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 201,
          transition: "transform 0.55s cubic-bezier(0.32,0.72,0,1), opacity 0.4s ease",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          background: "#1A1A1A",
          border: "1px solid rgba(197,160,89,0.15)",
          maxHeight: "92dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Close */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 20, right: 20, zIndex: 10,
              width: 36, height: 36, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.06)", border: "none",
              color: "#8A8278", cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <CloseIcon />
          </button>

          <div style={{ display: "flex", flexDirection: "row", height: 580, overflow: "hidden" }}>
            {/* Image */}
            <div id="modal-img-container" style={{ width: "50%", position: "relative", background: "#111", flexShrink: 0, overflow: "hidden" }}>
              <Image
                src={product.images[imgIndex] ?? product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "top", transition: "opacity 0.35s" }}
              />
              {product.images.length > 1 && (
                <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 8 }}>
                  {[ArrowLeftIcon, ArrowRightIcon].map((Icon, dir) => (
                    <button
                      key={dir}
                      onClick={() => setImgIndex(i => dir === 0 ? Math.max(0, i - 1) : Math.min(product.images.length - 1, i + 1))}
                      style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(18,18,18,0.85)", border: "none", color: "#E8E0D0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Icon />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div style={{ flex: 1, padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto" }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#C5A059", marginBottom: 16 }}>
                  {product.category}
                </p>
                <h2 style={{
                  fontSize: "2rem", fontWeight: 700,
                  fontFamily: "'Amiri', Georgia, serif",
                  color: "#E8E0D0", marginBottom: 12
                }}>
                  {product.title}
                </h2>
                <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "#C5A059", marginBottom: 24 }}>
                  {product.currency} {product.price.toLocaleString()}
                </p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "#7A7270", marginBottom: 32 }}>
                  {product.description}
                </p>

                {/* Size picker */}
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8A8278", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
                    اختر المقاس
                    {sizeError && <span style={{ color: "#f87171", fontSize: 10, letterSpacing: "normal" }}>— الرجاء اختيار المقاس</span>}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        id={`size-${size}`}
                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                        className={`size-btn${selectedSize === size ? " selected" : ""}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div>
                <button
                  id="whatsapp-order-btn"
                  onClick={handleCheckout}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 12, padding: "16px", fontSize: 11,
                    letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
                    background: "#25D366", color: "#fff", border: "none", cursor: "pointer",
                    transition: "transform 0.3s, background 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1da851")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
                  onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <WhatsAppIcon />
                  الطلب عبر واتساب
                </button>
                <p style={{ marginTop: 12, textAlign: "center", fontSize: 10, letterSpacing: "0.1em", color: "#4A4440" }}>
                  سيتم تحويلك إلى واتساب برسالة طلب جاهزة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #modal-close-btn { top: 16px !important; right: 16px !important; }
          [id="modal-close-btn"] ~ div { flex-direction: column !important; height: auto !important; max-height: 80vh !important; overflow-y: auto !important; }
          #modal-img-container { width: 100% !important; min-height: 50vh !important; flex-shrink: 0 !important; }
        }
      `}</style>
    </>
  );
}
