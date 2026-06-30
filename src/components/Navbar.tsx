"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "التشكيلة", href: "#collection" },
  { label: "الأقسام", href: "#categories" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

/* ── Inline SVG icons ── */
const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        className="anim-fade-in"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(18,18,18,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(197,160,89,0.12)" : "1px solid transparent",
          transition: "background 0.6s ease, border-color 0.6s ease, backdrop-filter 0.6s ease",
        }}
      >
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 40px)", height: 72,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Bag icon */}
          <button
            id="nav-bag-btn"
            aria-label="Shopping bag"
            style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#E8E0D0", background: "none", border: "none", cursor: "pointer" }}
          >
            <BagIcon />
          </button>

          {/* Nav links — desktop */}
          <nav style={{ gap: 40 }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — logo + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" aria-label="متجر آغا الرئيسية">
              <div style={{ width: 36, height: 36, position: "relative" }}>
                <Image src="/images/lion-logo.png" alt="متجر آغا" fill sizes="36px" style={{ objectFit: "contain" }} />
              </div>
            </Link>
              <button
              id="nav-menu-btn"
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(v => !v)}
              style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#E8E0D0", background: "none", border: "none", cursor: "pointer" }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(12,12,12,0.97)",
          backdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.4s ease",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "1.5rem", letterSpacing: "0.25em",
                textTransform: "uppercase", fontWeight: 300,
                color: "#E8E0D0", textDecoration: "none",
                transition: "color 0.3s, opacity 0.5s, transform 0.5s",
                transitionDelay: menuOpen ? `${i * 0.07}s` : "0s",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C5A059")}
              onMouseLeave={e => (e.currentTarget.style.color = "#E8E0D0")}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: 48, height: 1, width: 60, background: "#C5A059" }} />
        <p style={{ marginTop: 16, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A059" }}>
          متجر آغا
        </p>
      </div>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
