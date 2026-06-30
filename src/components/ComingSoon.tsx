"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SplashScreen from "./SplashScreen";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-07-25T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#080808", color: "#E8E0D0", textAlign: "center",
        padding: "0 20px",
        transition: "opacity 0.7s ease",
        opacity: splashDone ? 1 : 0
      }}>
        <div style={{ position: "relative", width: 80, height: 80, marginBottom: 40 }}>
          <Image src="/images/lion-logo.png" alt="Agha Store" fill style={{ objectFit: "contain" }} />
        </div>
        
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700,
          fontFamily: "'Amiri', Georgia, serif", color: "#C5A059",
          marginBottom: 16
        }}>
          قريباً جداً
        </h1>
        
        <p style={{
          fontSize: "1.2rem", color: "#8A8278", marginBottom: 48, maxWidth: 500, lineHeight: 1.8
        }}>
          نعمل على تجهيز أحدث تشكيلات الأزياء الشبابية و الستريت وير. المتجر مغلق حالياً وسنعود بقوة في ٢٥ يوليو!
        </p>

        <div style={{
          display: "flex", gap: "clamp(12px, 3vw, 24px)", justifyContent: "center", flexWrap: "wrap",
          direction: "ltr"
        }}>
          {[
            { label: "يوم", value: timeLeft.days },
            { label: "ساعة", value: timeLeft.hours },
            { label: "دقيقة", value: timeLeft.minutes },
            { label: "ثانية", value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: "clamp(60px, 15vw, 80px)", height: "clamp(60px, 15vw, 80px)", borderRadius: 8,
                background: "#121212", border: "1px solid rgba(197,160,89,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 700, fontFamily: "monospace", color: "#E8E0D0"
              }}>
                {item.value.toString().padStart(2, "0")}
              </div>
              <span style={{ marginTop: 12, fontSize: 13, color: "#C5A059", letterSpacing: "0.1em" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
