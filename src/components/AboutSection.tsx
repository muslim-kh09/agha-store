"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: "١٠٠٪", label: "راحة يومية" },
    { value: "٢٤/٧",   label: "أناقة مستمرة" },
    { value: "١",    label: "ستايل فريد" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ padding: "112px 0", background: "#141010", position: "relative", overflow: "hidden" }}
    >
      {/* Texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 5 L55 20 L70 20 L70 35 L55 40 L70 45 L70 60 L55 60 L40 75 L25 60 L10 60 L10 45 L25 40 L10 35 L10 20 L25 20 Z' fill='none' stroke='%232D1B15' stroke-width='0.6'/%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px", opacity: 0.06,
      }} />

      <div className="about-container" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)", position: "relative", zIndex: 1 }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Image */}
          <div
            className="reveal"
            style={{ position: "relative", aspectRatio: "4/5", transitionDelay: "0s" }}
          >
            {/* Double bezel shadow border */}
            <div style={{
              position: "absolute", inset: 0,
              border: "1px solid rgba(197,160,89,0.2)",
              transform: "translate(14px, 14px)",
              zIndex: 0,
            }} />
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", zIndex: 1 }}>
              <Image
                src="/images/prod-varsity.png"
                alt="أزياء شبابية وستريت وير"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(20,16,16,0.18)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -24, left: 0, height: 1, width: 96, background: "#C5A059", zIndex: 2 }} />
          </div>

          {/* Copy */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700, lineHeight: 1.25,
              fontFamily: "'Amiri', Georgia, serif",
              color: "#E8E0D0", marginBottom: 32,
            }}>
              ستايلك، قواعدك الخاصة.
            </h2>

            <div style={{ height: 1, width: 64, background: "rgba(197,160,89,0.4)", marginBottom: 32 }} />

            <p style={{ fontSize: "1rem", lineHeight: 1.95, color: "#6A6260", marginBottom: 24 }}>
              تأسس متجر آغا ليكون الوجهة الأولى للشباب الباحثين عن التميز. نحن نؤمن بأن الموضة هي لغة العصر، لذا نحرص على تقديم أحدث تصاميم الستريت وير والأزياء الكاجوال التي تجمع بين الراحة، الجرأة، والتفرد.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.95, color: "#6A6260", marginBottom: 40 }}>
              من القصات الأوفرسايز إلى التفاصيل العصرية، كل قطعة نختارها تعكس روح الشباب وطاقتهم المستمرة. نحن لا نمشي خلف الموضة، بل نصنعها لتعبر عنك بقوة في كل يوم.
            </p>

            {/* Stats */}
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24, paddingTop: 32,
              borderTop: "1px solid rgba(197,160,89,0.12)",
            }}>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p style={{
                    fontSize: "1.6rem", fontWeight: 700,
                    fontFamily: "'Amiri', Georgia, serif",
                    color: "#C5A059", marginBottom: 4,
                  }}>
                    {value}
                  </p>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#4A4440" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; text-align: center; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
