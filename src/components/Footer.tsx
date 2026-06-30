"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Social icons ── */
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const SOCIALS = [
  { Icon: InstagramIcon, href: "https://www.instagram.com/agha__store.1?igsh=MTVwcWZzbTh0bGJoYQ%3D%3D&utm_source=qr", label: "Instagram" },
  { Icon: WhatsAppIcon, href: "https://wa.me/201067842694", label: "WhatsApp" },
  { Icon: FacebookIcon, href: "https://www.facebook.com/share/1BQGnm6BQ5/?mibextid=wwXIfr", label: "Facebook" },
  { Icon: EmailIcon, href: "mailto:hello@aghastore.com", label: "Email" },
];

const LINKS = {
  "روابط سريعة": [
    { label: "التشكيلة", href: "#collection" },
    { label: "من نحن", href: "#about" },
    { label: "تواصل معنا", href: "#contact" }
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = footerRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      style={{ background: "#1A0F0A", paddingTop: 0, paddingBottom: 40 }}
    >
      {/* Top gold rule */}
      <div style={{ height: 1, background: "rgba(197,160,89,0.2)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px clamp(20px, 5vw, 40px) 0" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40, marginBottom: 64 }}>

          {/* Brand */}
          <div className="reveal">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ position: "relative", width: 40, height: 40 }}>
                <Image src="/images/lion-logo.png" alt="Agha Store" fill sizes="40px" style={{ objectFit: "contain" }} />
              </div>
              <div>
                <span style={{
                  display: "block", fontSize: "1.2rem",
                  letterSpacing: "0.05em", fontWeight: 700,
                  fontFamily: "'Amiri', Georgia, serif",
                  color: "#E8E0D0",
                }}>متجر آغا</span>
                <span style={{ display: "block", fontSize: 11, letterSpacing: "0.1em", color: "#C5A059" }}>
                  أزياء فاخرة
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#3A2820", maxWidth: 280, marginBottom: 32 }}>
              وجهتك الأولى لأحدث صيحات الأزياء الشبابية والستريت وير. ستايل يعبر عنك في كل الأوقات.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 12 }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#4A3830", transition: "border-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#C5A059"; e.currentTarget.style.color = "#C5A059"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#4A3830"; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links], i) => (
            <div key={category} className="reveal" style={{ transitionDelay: `${(i + 1) * 0.08}s` }}>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#C5A059", marginBottom: 24 }}>
                {category}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontSize: "0.9rem", fontWeight: 500, color: "#4A3830", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#C5A059")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#4A3830")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 32, borderTop: "1px solid rgba(197,160,89,0.1)",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 11, letterSpacing: "0.05em", color: "#3A2820" }}>
            © {new Date().getFullYear()} متجر آغا. جميع الحقوق محفوظة.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.05em", color: "#3A2820" }}>
              تم تطوير الموقع بواسطة <a href="https://github.com/muslim-kh09" target="_blank" rel="noopener noreferrer" style={{ color: "#C5A059", textDecoration: "none" }}>خالد هاني</a>.
              لبناء ونشر موقعك تواصل عبر <a href="https://t.me/A245F" target="_blank" rel="noopener noreferrer" style={{ color: "#C5A059", textDecoration: "none" }}>تيليجرام</a>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </footer>
  );
}
