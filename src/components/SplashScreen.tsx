"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "name" | "exit" | "done">("logo");

  useEffect(() => {
    // 0ms    : Logo fades/scales in (CSS)
    // 600ms  : Name fades in
    // 1400ms : Start exit animation (slide up + fade out)
    // 2000ms : Unmount
    const t1 = setTimeout(() => setPhase("name"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 1400);
    const t3 = setTimeout(() => { setPhase("done"); onComplete(); }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#121212",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transition: phase === "exit"
          ? "opacity 0.85s cubic-bezier(0.76,0,0.24,1), transform 0.85s cubic-bezier(0.76,0,0.24,1)"
          : "none",
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "translateY(-28px)" : "translateY(0)",
      }}
    >
      {/* Subtle damask texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 5 L55 20 L70 20 L70 35 L55 40 L70 45 L70 60 L55 60 L40 75 L25 60 L10 60 L10 45 L25 40 L10 35 L10 20 L25 20 Z' fill='none' stroke='%232D1B15' stroke-width='0.6'/%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px", opacity: 0.045,
      }} />

      {/* Lion logo — real AI-generated gold lion */}
      <div
        className="anim-scale-in"
        style={{ width: 220, height: 220, position: "relative" }}
      >
        <Image
          src="/images/lion-logo.png"
          alt="Agha Store Lion"
          fill
          sizes="220px"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Brand name — fades in after logo */}
      <div
        style={{
          marginTop: 24, textAlign: "center",
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          opacity: phase === "name" || phase === "exit" ? 1 : 0,
          transform: phase === "name" || phase === "exit" ? "translateY(0)" : "translateY(14px)",
        }}
      >
        <span style={{
          display: "block",
          fontSize: "1.5rem",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          fontWeight: 300,
          color: "#E8E0D0",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}>
          Agha Store
        </span>
        <span style={{
          display: "block", marginTop: 8,
          fontSize: "9px", letterSpacing: "0.28em",
          textTransform: "uppercase", color: "#C5A059",
        }}>
          Luxury Clothing
        </span>
      </div>

      {/* Gold rule */}
      <div style={{
        marginTop: 20, height: 1,
        background: "#C5A059",
        transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, opacity 0.6s",
        width: phase === "name" || phase === "exit" ? 60 : 0,
        opacity: phase === "name" || phase === "exit" ? 1 : 0,
      }} />
    </div>
  );
}
