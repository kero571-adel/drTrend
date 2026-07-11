"use client";

import { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .about-wrap { font-family: 'Inter', sans-serif; color: #0d2420; }
        .df { font-family: 'Cormorant Garamond', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(300px) scale(0.8); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .fu  { animation: fadeUp 0.85s ease both; }
        .fi  { animation: fadeIn 1s ease both; }
        .su  { animation: slideUp 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .d1  { animation-delay: 0.1s; }
        .d2  { animation-delay: 0.25s; }
        .d3  { animation-delay: 0.4s; }
        .d4  { animation-delay: 0.55s; }
        .d5  { animation-delay: 0.7s; }
        .d6  { animation-delay: 0.85s; }

        .chapter {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 20px;
          align-items: start;
          padding: 28px 32px;
          background: white;
          border-radius: 0 10px 10px 0;
          border-left: 3px solid #1a7a6e;
          transition: border-color 0.25s, transform 0.25s;
        }
        .chapter:hover { border-left-color: #0d2420; transform: translateX(4px); }

        .world-card { border-radius: 16px; padding: 44px 36px; transition: transform 0.3s ease; }
        .world-card:hover { transform: translateY(-6px); }

        .bullet {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          display: inline-block;
        }

        .stat-cell {
          padding: 36px 20px; background: #0d2420; text-align: center;
        }

        .section-label {
          font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
          text-transform: uppercase; color: #1a7a6e; margin-bottom: 48px;
          display: block;
        }

        .hero-desktop { display: flex; }
        .hero-mobile  { display: none; }

        @media (max-width: 768px) {
          .hero-desktop { display: none !important; }
          .hero-mobile  { display: flex !important; }
          .worlds-grid  { grid-template-columns: 1fr !important; }
          .stats-grid   { grid-template-columns: 1fr !important; }
          .chapter { grid-template-columns: 40px 1fr; padding: 20px 18px; }
        }

        .hero-btn {
          padding: 10px 24px;
          color: white;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .hero-btn:active { transform: scale(0.96); }
      `}</style>

      <div className="about-wrap">
        {/* ══ HERO — DESKTOP ══ */}
        <section
          className="hero-desktop"
          style={{
            height: "calc(100vh - 64px)",
            background: "#0d2420",
            position: "relative",
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          {/* Watermark */}
          <span
            aria-hidden
            className="df"
            style={{
              position: "absolute",
              bottom: "-2%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(72px, 16vw, 240px)",
              fontWeight: 600,
              color: "white",
              opacity: 0.04,
              whiteSpace: "nowrap",
              lineHeight: 1,
              pointerEvents: "none",
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            DR TREND
          </span>

          {/* Teal glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(26,122,110,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "clamp(40px,6vw,80px) clamp(24px,6vw,64px)",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Text */}
            <div>
              <p
                className="fu d1 section-label"
                style={{ marginBottom: "24px" }}
              >
                Faculty of Medicine · Al-Wadi Al-Jadid
              </p>
              <h1
                className="df fu d2"
                style={{
                  fontSize: "clamp(40px, 6.5vw, 88px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "white",
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Welcome to.
              </h1>
              <h1
                className="df fu d3"
                style={{
                  fontSize: "clamp(40px, 6.5vw, 88px)",
                  fontWeight: 600,
                  color: "#1a7a6e",
                  lineHeight: 1.05,
                  marginBottom: "36px",
                }}
              >
                the Dr.Trend brand
              </h1>
              <div className="fu d4" style={{ marginBottom: "44px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.92)",
                    fontWeight: 300,
                    margin: "0 0 6px",
                  }}
                >
                  Bishoy Riad
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.06em",
                  }}
                >
                  4th Year Medical Student · Founder of Dr Trend
                </p>
              </div>
            </div>

            {/* Photo */}
            <div
              className="fi d2"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "min(380px, 100%)",
                  aspectRatio: "3 / 4",
                  position: "relative",
                  borderRadius: "4px",
                  overflow: "hidden",
                  outline: "1px solid rgba(26,122,110,0.35)",
                  outlineOffset: "10px",
                }}
              >
                {!imgError ? (
                  <Image
                    src="/about/WhatsApp Image 2026-06-19 at 3.18.23 PM.jpeg"
                    alt="Bishoy Riad"
                    fill
                    priority
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(160deg, #1b4f48 0%, #0d2420 100%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      className="df"
                      style={{
                        fontSize: "80px",
                        color: "rgba(255,255,255,0.12)",
                        fontStyle: "italic",
                      }}
                    >
                      BR
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Add your photo
                    </span>
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "#1a7a6e",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══ HERO — MOBILE ══ */}
        <section
          className="hero-mobile"
          style={{
            height: "calc(100dvh - 64px)",
            background: "#0d2420",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            paddingTop: "32px",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-8%",
              right: "-10%",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(26,122,110,0.22) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div
            style={{
              textAlign: "center",
              padding: "0 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="fu d1"
              style={{ display: "inline-flex", marginBottom: "20px" }}
            >
              <span
                style={{
                  border: "1px solid rgba(26,122,110,0.6)",
                  padding: "6px 20px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.1em",
                }}
              >
                Faculty of Medicine · Al-Wadi Al-Jadid
              </span>
            </div>

            <h1
              className="df fu d2"
              style={{
                fontSize: "clamp(34px, 9vw, 52px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "white",
                lineHeight: 1.08,
                margin: "0",
              }}
            >
              Welcom to.
            </h1>
            <h1
              className="df fu d3"
              style={{
                fontSize: "clamp(34px, 9vw, 52px)",
                fontWeight: 600,
                color: "#1a7a6e",
                lineHeight: 1.08,
                marginBottom: "16px",
              }}
            >
              the Dr.Trend brand
            </h1>

            <div className="fu d4">
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 300,
                  margin: "0 0 4px",
                }}
              >
                Bishoy Riad
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                4th Year Medical Student · Founder of Dr Trend
              </p>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              minHeight: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "110vw",
                height: "320px",
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                background: "rgba(68,68,68,0.45)",
                zIndex: 1,
              }}
            />

            <div
              className="su d2"
              style={{
                position: "relative",
                zIndex: 2,
                width: "260px",
                height: "min(340px, calc(100dvh - 64px - 260px))",
                marginBottom: 0,
              }}
            >
              {!imgError ? (
                <Image
                  src="/about/WhatsApp Image 2026-06-19 at 4.45.51 PM.jpeg"
                  alt="Bishoy Riad"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                    borderRadius: "4px",
                  }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(160deg, #1b4f48 0%, #0d2420 100%)",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    className="df"
                    style={{
                      fontSize: "64px",
                      color: "rgba(255,255,255,0.12)",
                      fontStyle: "italic",
                    }}
                  >
                    BR
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Add your photo
                  </span>
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "#1a7a6e",
                  borderRadius: "0 0 4px 4px",
                }}
              />
            </div>

            <div
              className="fu d6"
              style={{
                position: "absolute",
                bottom: "32px",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <button
                className="hero-btn"
                style={{ background: "#1a7a6e" }}
                onClick={() => {
                  document
                    .getElementById("story-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                My Story{" "}
                <span style={{ fontSize: "16px", lineHeight: 1 }}>↓</span>
              </button>
              <button
                className="hero-btn"
                style={{ background: "transparent" }}
                onClick={() => {
                  document
                    .getElementById("brand-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Dr Trend
              </button>
            </div>
          </div>
        </section>

        {/* ══ STORY ══ */}
        <section
          id="story-section"
          style={{
            background: "#f4faf9",
            padding: "clamp(72px, 10vw, 120px) 0",
          }}
        >
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              padding: "0 clamp(24px,5vw,56px)",
            }}
          >
            <span className="section-label">Welcome to My Brand</span>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  num: "01",
                  title: "Who I Am",
                  body: "Hi, I'm Bishoy — a 4th year medical student at the Faculty of Medicine in Al-Wadi Al-Jadid. Medicine isn't just a career path for me, it's a genuine calling. From day one I believed that knowledge is only valuable when it's shared, and that passion has shaped everything I've built since.",
                },
                {
                  num: "02",
                  title: "Where It Started",
                  body: "It started with a camera and a simple idea: make medicine understandable for everyone. I began creating medical content — breaking down diseases, explaining clinical concepts, and reaching people who wanted to learn but didn't know where to start. That community grew, and with it came a deeper understanding of what medical students and doctors actually need.",
                },
                {
                  num: "03",
                  title: "Why Dr Trend",
                  body: "From that community grew a brand. I noticed that finding quality medical clothing — scrubs and lab coats that are actually comfortable, professional, and fairly priced — was harder than it should be. So I built Dr Trend: a local brand, built by a medical student, for medical students and doctors who deserve to look and feel their best every single day.",
                },
              ].map(({ num, title, body }) => (
                <div key={num} className="chapter">
                  <span
                    className="df"
                    style={{
                      fontSize: "38px",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "#1a7a6e",
                      lineHeight: 1,
                      marginTop: "2px",
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 600,
                        color: "#0d2420",
                        margin: "0 0 10px",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14.5px",
                        lineHeight: 1.75,
                        color: "#607870",
                        fontWeight: 300,
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TWO WORLDS ══ */}
        <section
          style={{ background: "white", padding: "clamp(72px, 10vw, 120px) 0" }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "0 clamp(24px,5vw,56px)",
            }}
          >
            <span
              className="section-label"
              style={{ textAlign: "center", display: "block" }}
            >
              Two Worlds. One Vision.
            </span>
            <div
              className="worlds-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div className="world-card" style={{ background: "#0d2420" }}>
                <span
                  style={{
                    fontSize: "48px",
                    display: "block",
                    marginBottom: "20px",
                    lineHeight: 1,
                  }}
                >
                  🩺
                </span>
                <h3
                  className="df"
                  style={{
                    fontSize: "34px",
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "white",
                    margin: "0 0 12px",
                  }}
                >
                  The Doctor
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.5)",
                    margin: "0 0 28px",
                    fontWeight: 300,
                  }}
                >
                  A future physician who believes medical knowledge belongs to
                  everyone — not just those inside lecture halls. Sharing it is
                  not optional; it's part of the duty.
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Medical Content Creator",
                    "Faculty Peer Mentor",
                    "Health & Patient Educator",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      <span
                        className="bullet"
                        style={{ background: "#1a7a6e" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="world-card" style={{ background: "#1a7a6e" }}>
                <span
                  style={{
                    fontSize: "48px",
                    display: "block",
                    marginBottom: "20px",
                    lineHeight: 1,
                  }}
                >
                  🥼
                </span>
                <h3
                  className="df"
                  style={{
                    fontSize: "34px",
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "white",
                    margin: "0 0 12px",
                  }}
                >
                  The Founder
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.72)",
                    margin: "0 0 28px",
                    fontWeight: 300,
                  }}
                >
                  A local brand born from real experience — built by someone who
                  wears the scrubs, knows the long shifts, and understands that
                  how you present yourself matters from day one.
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Dr Trend Founder & CEO",
                    "Premium Scrubs & Lab Coats",
                    "Quality at Accessible Prices",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      <span
                        className="bullet"
                        style={{ background: "white" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ BRAND ══ */}
        <section
          id="brand-section"
          style={{
            background: "#0d2420",
            padding: "clamp(80px, 11vw, 130px) 0",
          }}
        >
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              padding: "0 clamp(24px,5vw,56px)",
              textAlign: "center",
            }}
          >
            <span className="section-label">The Brand</span>
            <h2
              className="df"
              style={{
                fontSize: "clamp(64px, 13vw, 140px)",
                fontWeight: 600,
                color: "white",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                margin: "0 0 24px",
              }}
            >
              Dr Trend
            </h2>
            <p
              style={{
                fontSize: "15.5px",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.48)",
                maxWidth: "500px",
                margin: "0 auto 60px",
                fontWeight: 300,
              }}
            >
              A local Egyptian brand making premium medical clothing accessible.
              Scrubs and lab coats designed by a medical student who knows
              exactly what the job demands — and what you deserve to wear while
              doing it.
            </p>

            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {[
                { val: "Scrubs & Lab Coats", sub: "Premium Collection" },
                {
                  val: "Navy · Light Blue · Olive · Black",
                  sub: "4 Signature Colors",
                },
              ].map(({ val, sub }) => (
                <div key={val} className="stat-cell">
                  <p
                    className="df"
                    style={{
                      fontSize: "19px",
                      fontWeight: 600,
                      fontStyle: "italic",
                      color: "white",
                      margin: "0 0 6px",
                    }}
                  >
                    {val}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.06em",
                      margin: 0,
                    }}
                  >
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
