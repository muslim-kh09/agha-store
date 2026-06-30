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
        backgroundColor: "#050505",
        color: "#fff", textAlign: "center",
        padding: "0 20px",
        transition: "opacity 1s ease",
        opacity: splashDone ? 1 : 0,
        overflow: "hidden"
      }}>
        {/* Background Image with Heavy Dark Overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image 
            src="/images/prod-varsity.png" 
            alt="Background" 
            fill 
            style={{ objectFit: "cover", objectPosition: "center", filter: "grayscale(50%)" }} 
            priority
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%)",
            backdropFilter: "blur(6px)"
          }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 800 }}>
          <div style={{ position: "relative", width: 90, height: 90, marginBottom: 32 }}>
            <Image src="/images/lion-logo.png" alt="Agha Store" fill style={{ objectFit: "contain" }} />
          </div>
          
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 40px)",
            width: "100%",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <p style={{
              fontSize: "clamp(0.7rem, 2vw, 0.9rem)", letterSpacing: "0.4em", textTransform: "uppercase",
              color: "#C5A059", marginBottom: 12, fontWeight: 700
            }}>
              الافتتاح الأول — The First Drop
            </p>
            <h1 style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 800,
              fontFamily: "'Tajawal', sans-serif", color: "#FFF",
              marginBottom: 16, lineHeight: 1.1
            }}>
              استعدوا لشيء مختلف
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "#A09A96", marginBottom: 48, lineHeight: 1.6, maxWidth: 600, marginInline: "auto"
            }}>
              نحن نجهز لإطلاق تشكيلتنا الأولى من أزياء الستريت وير. المتجر يفتح أبوابه رسمياً يوم ٢٥ يوليو. كن أول من يمتلك القطع الحصرية.
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
                    width: "clamp(70px, 15vw, 90px)", height: "clamp(70px, 15vw, 90px)", borderRadius: 16,
                    background: "rgba(0,0,0,0.4)", border: "1px solid rgba(197,160,89,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 800, fontFamily: "monospace", color: "#FFF",
                    boxShadow: "inset 0 0 20px rgba(197,160,89,0.1)"
                  }}>
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <span style={{ marginTop: 16, fontSize: 13, color: "#C5A059", letterSpacing: "0.15em", fontWeight: 500 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
