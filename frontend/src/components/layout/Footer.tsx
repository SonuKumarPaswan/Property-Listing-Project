"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Properties", href: "#" },
  { label: "Buy", href: "#" },
  { label: "Rent", href: "#" },
  { label: "Sell", href: "#" },
  { label: "About Us", href: "/About" },
  { label: "Contact", href: "#" },
];

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a1628" />
      </svg>
    ),
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Footer() {
  const { ref: footerRef, inView } = useInView(0.05);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

        .mh-footer * { box-sizing: border-box; }

        .mh-footer {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(180deg, #060e1f 0%, #0a1628 40%, #071020 100%);
          color: #c8d8f0;
          position: relative;
          overflow: hidden;
        }

        /* Animated grid background */
        .mh-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(30, 100, 220, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 100, 220, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridPulse 8s ease-in-out infinite;
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Floating orbs */
        .mh-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .mh-orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
          top: -100px; left: -100px;
          animation: orbFloat1 12s ease-in-out infinite;
        }
        .mh-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
          bottom: 60px; right: -80px;
          animation: orbFloat2 15s ease-in-out infinite;
        }
        .mh-orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: orbFloat3 10s ease-in-out infinite;
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 40px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }

        /* Reveal animations */
        .mh-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .mh-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .mh-reveal-d1 { transition-delay: 0.1s; }
        .mh-reveal-d2 { transition-delay: 0.2s; }
        .mh-reveal-d3 { transition-delay: 0.3s; }
        .mh-reveal-d4 { transition-delay: 0.4s; }
        .mh-reveal-d5 { transition-delay: 0.5s; }

        /* Stats bar */
        .mh-stats-bar {
          border-top: 1px solid rgba(37,99,235,0.2);
          border-bottom: 1px solid rgba(37,99,235,0.2);
          background: rgba(37,99,235,0.06);
          backdrop-filter: blur(4px);
        }
        .mh-stat-item {
          text-align: center;
          padding: 1.5rem 1rem;
          position: relative;
        }
        .mh-stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 25%; height: 50%;
          width: 1px;
          background: rgba(37,99,235,0.25);
        }
        .mh-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #3b82f6;
          line-height: 1;
          margin-bottom: 4px;
          display: block;
        }
        .mh-stat-label {
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b8fc7;
          font-weight: 500;
        }

        /* Logo */
        .mh-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .mh-logo-text span { color: #3b82f6; }
        .mh-logo-tagline {
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3b82f6;
          margin-top: 2px;
          font-weight: 500;
        }

        /* Nav links */
        .mh-navlink {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #8ab0d8;
          font-size: 0.92rem;
          font-weight: 400;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s, gap 0.2s;
          cursor: pointer;
        }
        .mh-navlink:hover { color: #60a5fa; gap: 12px; }
        .mh-navlink .mh-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .mh-navlink:hover .mh-dot { transform: scale(1.6); }

        /* City pills */
        .mh-city-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border: 1px solid rgba(37,99,235,0.2);
          border-radius: 100px;
          font-size: 0.78rem;
          color: #7aa5d0;
          background: rgba(37,99,235,0.06);
          cursor: pointer;
          transition: all 0.2s;
          margin: 3px;
          white-space: nowrap;
        }
        .mh-city-pill:hover {
          background: rgba(37,99,235,0.18);
          border-color: #3b82f6;
          color: #93c5fd;
          transform: translateY(-2px);
        }

        /* Newsletter */
        .mh-newsletter-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(37,99,235,0.25);
          border-radius: 10px 0 0 10px;
          padding: 0.7rem 1rem;
          color: #e2ecfa;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .mh-newsletter-input:focus { border-color: #3b82f6; }
        .mh-newsletter-input::placeholder { color: #4a6d94; }
        .mh-newsletter-btn {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none;
          border-radius: 0 10px 10px 0;
          padding: 0.7rem 1.2rem;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .mh-newsletter-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .mh-newsletter-btn:active { transform: scale(0.98); }

        /* Social icons */
        .mh-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(37,99,235,0.25);
          background: rgba(37,99,235,0.07);
          color: #6b8fc7;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .mh-social:hover {
          background: rgba(37,99,235,0.22);
          border-color: #3b82f6;
          color: #93c5fd;
          transform: translateY(-3px);
        }

        /* Divider */
        .mh-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,0.3) 30%, rgba(59,130,246,0.5) 50%, rgba(37,99,235,0.3) 70%, transparent);
          margin: 0;
        }

        /* Bottom bar */
        .mh-bottom {
          font-size: 0.8rem;
          color: #3d5e82;
        }
        .mh-bottom a { color: #4a7ab5; text-decoration: none; }
        .mh-bottom a:hover { color: #60a5fa; }

        /* Pulse dot */
        .mh-pulse-dot {
          display: inline-block;
          width: 7px; height: 7px;
          background: #3b82f6;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          margin-right: 6px;
          vertical-align: middle;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
        }

        /* House icon animation */
        .mh-house-icon {
          display: inline-flex;
          animation: houseFloat 3s ease-in-out infinite;
        }
        @keyframes houseFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* Success message */
        .mh-success {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,99,235,0.1);
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 10px;
          padding: 0.7rem 1rem;
          color: #93c5fd;
          font-size: 0.9rem;
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }

        /* Section heading style */
        .mh-section-heading {
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3b82f6;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mh-section-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(37,99,235,0.2);
        }

        /* Grid */
        .mh-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: 3rem;
        }
        @media (max-width: 1024px) {
          .mh-main-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 640px) {
          .mh-main-grid { grid-template-columns: 1fr; gap: 1.75rem; }
          .mh-stat-num { font-size: 1.5rem; }
          .mh-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <footer className="mh-footer" ref={footerRef}>
        {/* Orbs */}
        <div className="mh-orb mh-orb-1" />
        <div className="mh-orb mh-orb-2" />
        <div className="mh-orb mh-orb-3" />

        {/* Stats bar */}
        <div className={`mh-stats-bar mh-reveal ${inView ? "visible" : ""}`}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="mh-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
              {[
                { value: 12000, suffix: "+", label: "Properties Listed" },
                { value: 8000, suffix: "+", label: "Happy Clients" },
                { value: 50, suffix: "+", label: "Cities Covered" },
                { value: 98, suffix: "%", label: "Satisfaction Rate" },
              ].map((s) => (
                <div className="mh-stat-item" key={s.label}>
                  <span className="mh-stat-num">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mh-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3.5rem 1.5rem 2.5rem", position: "relative", zIndex: 1 }}>
          <div className="mh-main-grid">

            {/* Brand column */}
            <div className={`mh-reveal mh-reveal-d1 ${inView ? "visible" : ""}`}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
               
                <div>
                  <Link href="/">
            <Image
              src="/logo.png"
              alt="Mishti Houses Logo"
              width={320}           // Increased size
              height={140}
              priority
              className="rounded-lg"
              style={{
                width: "280px",     // You can change this value to make it bigger/smaller
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
                  <div className="mh-logo-tagline">Real Estate Platform</div>
                </div>
              </div>

              <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "#6b8fc7", margin: "1.25rem 0" }}>
                Buy, sell, or rent properties with ease. Thousands of verified listings across India, trusted by buyers and agents alike.
              </p>
<h3> Contact us:</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "1.5rem" }}>
                {[
                  {  text: "support@mishtihouses.com" },
                  { text: "+91 9876543210" },
                  {  text: "Noida, Uttar Pradesh, India" },
                ].map((c) => (
                  <div key={c.text} style={{ display: "flex", alignItems: "center", gap: "0px", fontSize: "0.74rem", color: "#6b8fc7" }}>
                    <span style={{ fontSize: "0.85rem" }}></span>
                    <span>{c.text}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} className="mh-social" title={s.label} aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`mh-reveal mh-reveal-d2 ${inView ? "visible" : ""}`}>
              <div className="mh-section-heading">Quick links</div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="mh-navlink"
                    onMouseEnter={() => setHoveredLink(l.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="mh-dot" />
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Property Types */}
            <div className={`mh-reveal mh-reveal-d3 ${inView ? "visible" : ""}`}>
              <div className="mh-section-heading">Property types</div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {["Apartments", "Villas", "Independent Houses", "Commercial Spaces", "Plots & Land", "PG / Hostels", "Builder Floors"].map((t) => (
                  <a key={t} href="#" className="mh-navlink">
                    <span className="mh-dot" />
                    {t}
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter + Cities */}
            <div className={`mh-reveal mh-reveal-d4 ${inView ? "visible" : ""}`}>
              <div className="mh-section-heading">Stay updated</div>
              <p style={{ fontSize: "0.84rem", color: "#6b8fc7", marginBottom: "1rem", lineHeight: 1.6 }}>
                Get the latest property deals and market insights delivered to your inbox.
              </p>

              {subscribed ? (
                <div className="mh-success">
                  <span>✓</span>
                  <span>You're subscribed! Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", marginBottom: "1.5rem" }}>
                  <input
                    className="mh-newsletter-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="mh-newsletter-btn">Subscribe</button>
                </form>
              )}

              <div className="mh-section-heading" style={{ marginTop: "1.5rem" }}>Top cities</div>
              <div style={{ display: "flex", flexWrap: "wrap", margin: "-3px" }}>
                {CITIES.map((city) => (
                  <span key={city} className="mh-city-pill">
                    <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#3b82f6" opacity="0.6" /></svg>
                    {city}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="mh-divider" />

        {/* Bottom bar */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }} className="mh-bottom">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="mh-pulse-dot" />
                © {new Date().getFullYear()} Mishti Houses. All rights reserved.
              </div>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
                  <a key={item} href="#">{item}</a>
                ))}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#2d4a6b" }}>
                Made with ♥ in India
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
