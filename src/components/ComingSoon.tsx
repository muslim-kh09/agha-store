"use client";
import { useState, useEffect, useCallback } from "react";
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

  const handleComplete = useCallback(() => setSplashDone(true), []);

  if (!mounted) return null;

  return (
    <>
      <SplashScreen onComplete={handleComplete} />
      
      <div style={{
        position: "relative",
        minHeight: "100vh", 
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#0A0A0A",
        color: "#E8E0D0", textAlign: "center",
        padding: "0 20px",
        transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: splashDone ? 1 : 0,
        overflow: "hidden"
      }}>
        
        {/* Subtle Luxury Gradient glow */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw", height: "60vw",
          background: "radial-gradient(circle, rgba(197,160,89,0.08) 0%, rgba(10,10,10,0) 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 800 }}>
          
          <div style={{ position: "relative", width: 70, height: 70, marginBottom: 40 }}>
            <Image src="/images/lion-logo.png" alt="Agha Store" fill style={{ objectFit: "contain" }} priority />
          </div>
          
          <h2 style={{
            fontSize: "11px", letterSpacing: "0.4em",
            color: "#C5A059", marginBottom: 16, fontWeight: 300,
            fontFamily: "'Amiri', serif"
          }}>
            مرحلة جديدة من الأناقة
          </h2>
          
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 400,
            fontFamily: "'Amiri', Georgia, serif", color: "#FFF",
            marginBottom: 24, lineHeight: 1.2
          }}>
            نُعيد صياغة الفخامة
          </h1>
          
          <div style={{ height: 1, width: 60, background: "rgba(197,160,89,0.3)", marginBottom: 40 }} />

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "#8A8278", marginBottom: 60, lineHeight: 1.8, maxWidth: 500, marginInline: "auto", fontWeight: 300
          }}>
            نعمل بشغف على تجهيز أحدث التشكيلات الحصرية. نعدكم بتجربة تسوق استثنائية ترتقي لذائقتكم، قريباً في ٢٥ يوليو.
          </p>

          <div style={{
            display: "flex", gap: "clamp(16px, 4vw, 40px)", justifyContent: "center",
            direction: "ltr", alignItems: "center"
          }}>
            {[
              { label: "أيام", value: timeLeft.days },
              { label: "ساعات", value: timeLeft.hours },
              { label: "دقائق", value: timeLeft.minutes },
              { label: "ثواني", value: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "clamp(60px, 12vw, 90px)" }}>
                <div style={{
                  fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#FFF",
                  lineHeight: 1
                }}>
                  {item.value.toString().padStart(2, "0")}
                </div>
                <span style={{ 
                  marginTop: 16, fontSize: "10px", color: "#C5A059", letterSpacing: "0.2em", fontWeight: 300, textTransform: "uppercase" 
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
